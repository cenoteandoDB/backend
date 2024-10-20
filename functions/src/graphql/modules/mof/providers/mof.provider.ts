/* eslint-disable require-jsdoc */
import { ID } from "graphql-modules/shared/types";
import { db } from "../../database/db";
import {
  VariableTheme,
  VariableWithData,
  MeasurementOrFact,
  Variable,
  VariableRepresentation,
  MofByCategory,
  MofModificationRequest,
  User,
  PaginationInput,
  SortField,
  MofModificationRequestList,
} from "../../../generated-types/graphql";
import { VariableProvider } from "../../variables/providers/variable.provider";
import { CenotesProvider } from "../../cenotes/providers/cenotes.provider";
import { firestore } from "firebase-admin";

const mofDB = db.mofs;
const requestMofModificationDB = db.requestMofsModification;
const variableDB = db.variables;
const cenoteProvider = new CenotesProvider();
const variableProvider = new VariableProvider();

export class MofProvider {
  /**
   * Get cenote measurements or facts by theme.
   *
   * @param {ID} cenoteId of the cenote to get MoF
   * @param {VariableTheme} theme of the cenote to get MoF
   *
   * @return {Promise<MofByCategory[]>} list of MoF of a theme grouped by category
   */
  async cenoteDataByTheme(
    cenoteId: ID,
    theme: VariableTheme,
  ): Promise<MofByCategory[]> {
    const data: { [category: string]: VariableWithData[]} = {};

    const snapshot = await mofDB.where("cenoteId", "==", cenoteId).get();
    const mofs = snapshot.docs.map((doc) => doc.data() as VariableWithData);

    for (const mof of mofs) {
      const variableSnapshot = await variableDB.doc(mof.variableId).get();
      const variable = variableSnapshot.data() as Variable;
      if (variable.theme == theme) {
        if (!data[variable.category]) {
          data[variable.category] = [];
        }
        data[variable.category].push(mof);
      }
    }

    // map results to MofByCategory list
    return Object.keys(data).map((category) => ({category, mofs: data[category]}));
  }

  /**
   * Get cenote measurements or facts.
   *
   * @param {ID} cenoteId of the cenote to get MoF
   *
   * @return {Promise<VariableWithData[]>} list of MoF
   */
  async getCenoteData(cenoteId: ID): Promise<VariableWithData[]> {
    const snapshot = await mofDB.where("cenoteId", "==", cenoteId).get();
    return snapshot.docs.map((doc) => doc.data() as VariableWithData);
  }

  /**
   * Get list of mof missing from a cenote.
   *
   * @param {ID} cenoteId of the cenote to get missing MoF
   *
   * @return {Promise<VariableWithData[]>} list of missing MoF
   */
  async getCenoteVariablesWithoutData(cenoteId: ID): Promise<Variable[]> {
    const variablesSnapshot = await variableDB.get();
    const variables = variablesSnapshot.docs.map((doc) => doc.data() as Variable);

    const snapshot = await mofDB.where("cenoteId", "==", cenoteId).get();
    const cenoteMofs = snapshot.docs.map((doc) => doc.data() as VariableWithData);

    const variableIdSet = new Set<string>();

    cenoteMofs.forEach((cenoteMof) => variableIdSet.add(cenoteMof.variableId));

    return variables.filter((variable) => !variableIdSet.has(variable.firestore_id));
  }

  /**
   * Get cenote measurements or facts by variable.
   *
   * @param {ID} cenoteId of the cenote to get MoF
   * @param {ID} variableId of the variable to get MoF
   *
   * @return {Promise<VariableWithData>} MoFs of given cenote and variable
   */
  async cenoteDataByVariable(
    cenoteId: ID,
    variableId: ID,
  ): Promise<VariableWithData|null> {
    const mof = await mofDB
      .where("cenoteId", "==", cenoteId)
      .where("variableId", "==", variableId)
      .get();

    if (mof.empty) {
      return null;
    }
    return mof.docs[0].data() as VariableWithData;
  }

  async requestMofModification(request: MofModificationRequest, user: User): Promise<boolean> {
    const cenote = await cenoteProvider.getCenoteById(request.cenoteId);
    const variable = await variableProvider.getVariableById(request.variableId);

    const docRef = requestMofModificationDB.doc();
    await docRef.set({
      firestore_id: docRef.id,
      createdAt: new Date().toISOString(),
      cenoteName: cenote.name,
      variableSphere: variable.sphere,
      variableTheme: variable.theme,
      variableCategory: variable.category,
      creator: user.name,
      creatorId: user.id,
      ...request,
    });

    return true;
  }

  async acceptMofRequest(requestMofCreateId: string): Promise<boolean> {
    const requestDoc = await requestMofModificationDB.doc(requestMofCreateId).get();
    const requestCreateMof = requestDoc.data() as MofModificationRequest;

    switch (requestCreateMof.type) {
    case "CREATE": {
      this.createMoF(requestCreateMof);
      break;
    }
    case "UPDATE": {
      this.updateMoF(requestCreateMof);
      break;
    }
    case "DELETE": {
      this.deleteMoF(requestCreateMof);
      break;
    }
    }

    await requestMofModificationDB.doc(requestMofCreateId).delete();
    return true;
  }

  async rejectMofRequest(requestMofCreateId: string): Promise<boolean> {
    await requestMofModificationDB.doc(requestMofCreateId).delete();
    return true;
  }

  /**
   * Creates a Measurement or Fact.
   * If MoF bucket doesn't yet exist, creates new one.
   * Otherwise, adds to existing one.
   *
   * @param {MofModificationRequest} requestCreateMof new MoF with
   * value and timestamp
   *
   * @return {Promise<boolean>} the new MoF
   */
  async createMoF(requestCreateMof: MofModificationRequest): Promise<boolean> {
    const doc = await mofDB
      .where("cenoteId", "==", requestCreateMof.cenoteId)
      .where("variableId", "==", requestCreateMof.variableId)
      .get();

    if (doc.empty) {
      await this.createMofBucket(requestCreateMof);
    } else {
      const bucket = doc.docs[0].data() as VariableWithData;
      await this.addMof(bucket, requestCreateMof.mof);
    }

    return true;
  }

  private async createMofBucket(
    mofCreationRequest: MofModificationRequest,
  ): Promise<VariableWithData> {
    const variable = await variableProvider.getVariableById(mofCreationRequest.variableId);
    const variableIcon = variable.icon ? variable.icon : "";
    const variableRepresentation = variable.variableRepresentation ?
      variable.variableRepresentation : "TEXT";
    const variableUnits = variable.units ? variable.units : "";

    const docRef = mofDB.doc();
    await docRef.set({
      id: docRef.id,
      cenoteId: mofCreationRequest.cenoteId,
      variableId: mofCreationRequest.variableId,
      variableName: variable.name,
      variableIcon: variableIcon,
      variableRepresentation: variableRepresentation,
      variableUnits: variableUnits,
      measurements: [mofCreationRequest.mof],
      firstTimestamp: mofCreationRequest.mof.timestamp,
      lastTimestamp: mofCreationRequest.mof.timestamp,
    });

    const snapshot = await mofDB.doc(docRef.id).get();
    return snapshot.data() as VariableWithData;
  }

  private async addMof(
    bucket: VariableWithData,
    mof: MeasurementOrFact,
  ): Promise<VariableWithData> {
    bucket.measurements.push(mof);

    const firstTimestamp =
      bucket.firstTimestamp < mof.timestamp ? bucket.firstTimestamp : mof.timestamp;
    const lastTimestamp =
      bucket.lastTimestamp > mof.timestamp ? bucket.lastTimestamp : mof.timestamp;

    await mofDB.doc(bucket.id).update({
      measurements: bucket.measurements,
      firstTimestamp,
      lastTimestamp,
    });

    const snapshot = await mofDB.doc(bucket.id).get();
    return snapshot.data() as VariableWithData;
  }

  /**
   * Deletes a Measurement or Fact of a cenote.
   * Uses the value and timestamp to identify the MoF to be deleted and updates first and
   * last timestamps of bucket. If bucket becomes empty, deletes the entry in the database.
   *
   * @param {MofModificationRequest} requestDeleteMof MoF to delete
   *
   * @return {Promise<VariableWithData>} the new MoF
   */
  async deleteMoF(requestDeleteMof: MofModificationRequest): Promise<boolean> {
    const doc = await mofDB
      .where("cenoteId", "==", requestDeleteMof.cenoteId)
      .where("variableId", "==", requestDeleteMof.variableId)
      .get();

    if (!doc.empty) {
      const bucket = doc.docs[0].data() as VariableWithData;
      const docId = doc.docs[0].id;

      const mofs = bucket.measurements.filter(
        (mof: any) =>
          mof.timestamp !== requestDeleteMof.mof.timestamp &&
          mof.value !== requestDeleteMof.mof.value,
      );

      if (mofs.length == 0) {
        mofDB.doc(doc.docs[0].id).delete();
      } else {
        this.updateMofBucket(docId, bucket, mofs);
      }
    }

    return true;
  }

  private async updateMofBucket(
    docId: string,
    mof: VariableWithData,
    measurements: MeasurementOrFact[],
  ): Promise<void> {
    const firstTimestamp = measurements.reduce(
      (min: MeasurementOrFact | null, current: MeasurementOrFact) => {
        return !min || current.timestamp < min.timestamp ? current : min;
      },
      null,
    );

    const lastTimestamp = measurements.reduce(
      (max: MeasurementOrFact | null, current: MeasurementOrFact) => {
        return !max || current.timestamp > max.timestamp ? current : max;
      },
      null,
    );

    await mofDB.doc(docId).update({
      firstTimestamp: firstTimestamp?.timestamp,
      lastTimestamp: lastTimestamp?.timestamp,
      measurements,
    });
  }

  async getThemesByCenote(cenoteId: string): Promise<string[]> {
    const variableProvider = new VariableProvider();
    const cenoteData = await this.getCenoteData(cenoteId);

    const variablesIds = cenoteData.map((item) => item.variableId);

    const themes: string[] = [];
    for (const variableId of variablesIds) {
      const variable = await variableProvider.getVariableById(variableId);
      if (!themes.includes(variable.theme)) {
        themes.push(variable.theme);
      }
    }

    return themes;
  }

  async getMofModificationRequests(
    sort: SortField | null | undefined = {
      field: "firestore_id",
      sortOrder: "ASC",
    },
    pagination: PaginationInput | null = {
      offset: 0,
      limit: 25,
    }): Promise<MofModificationRequestList> {
    let query: any;
    query = requestMofModificationDB.orderBy(
      sort?.field ?? "createdAt",
      sort?.sortOrder.toLowerCase() as firestore.OrderByDirection,
    );

    if (pagination) {
      query = query.offset(pagination.offset).limit(pagination.limit);
    }

    const [mofsModificationRequestsSnapshot, totalCountSnapshot] = await Promise.all([
      query.get(),
      requestMofModificationDB.get(),
    ]);

    const mofModificationRequests = mofsModificationRequestsSnapshot.docs.map(
      (doc: any) => doc.data() as MofModificationRequest,
    );
    const totalCount = totalCountSnapshot.size;

    return { mofModificationRequests, totalCount };
  }

  /**
   * Update a Measurement or Fact of a cenote.
   * Uses the old value and old timestamp to identify the MoF to be updated. After updating a value,
   * updates the first and last timestamp if needed
   *
   * @param {MofModificationRequest} requestUpdateMof MoF to delete
   *
   * @return {Promise<boolean>} if the update succeded
   */
  async updateMoF(requestUpdateMof: MofModificationRequest): Promise<boolean> {
    const doc = await mofDB
      .where("cenoteId", "==", requestUpdateMof.cenoteId)
      .where("variableId", "==", requestUpdateMof.variableId)
      .get();

    if (doc.empty) {
      return false;
    }

    const bucket = doc.docs[0].data() as VariableWithData;
    const docId = doc.docs[0].id;

    let modified = false;
    const measurements = bucket.measurements.map(
      (mof: MeasurementOrFact) => {
        if (mof.timestamp == requestUpdateMof.old_mof?.timestamp &&
          mof.value == requestUpdateMof.old_mof?.value) {
          modified = true;
          return {
            timestamp: requestUpdateMof.mof.timestamp,
            value: requestUpdateMof.mof.value};
        } else {
          return mof;
        }
      }
    );

    if (!modified) {
      return false;
    }

    const firstTimestamp = measurements.reduce(
      (min: MeasurementOrFact | null, current: MeasurementOrFact) => {
        return !min || current.timestamp < min.timestamp ? current : min;
      },
      null,
    );

    const lastTimestamp = measurements.reduce(
      (max: MeasurementOrFact | null, current: MeasurementOrFact) => {
        return !max || current.timestamp > max.timestamp ? current : max;
      },
      null,
    );

    await mofDB.doc(docId).update({
      firstTimestamp: firstTimestamp?.timestamp,
      lastTimestamp: lastTimestamp?.timestamp,
      measurements,
    });

    return true;
  }

  async updateMofVariableInfo(
    variableId: string,
    units: string | null | undefined,
    icon: string | null | undefined,
    variableRepresentation: VariableRepresentation | null | undefined
  ): Promise<boolean> {
    const mofs = await mofDB.where("variableId", "==", variableId).get();
    mofs.forEach(async (mof) => {
      await mofDB.doc(mof.id).update({
        units: units,
        icon: icon,
        variableRepresentation: variableRepresentation,
      });
    });

    return true;
  }
}
