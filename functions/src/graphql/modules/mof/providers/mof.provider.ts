/* eslint-disable require-jsdoc */
import { ID } from "graphql-modules/shared/types";
import { db } from "../../database/db";
import {
  VariableTheme,
  VariableWithData,
  NewMeasurementOrFactInput,
  MeasurementOrFact,
  Variable,
  DeleteMofInput,
  UpdateMofInput,
  VariableRepresentation,
} from "../../../generated-types/graphql";
import { VariableProvider } from "../../variables/providers/variable.provider";
import { CenotesProvider } from "../../cenotes/providers/cenotes.provider";

const mofDB = db.mofs;
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
   * @return {Promise<VariableWithData[]>} list of MoF
   */
  async cenoteDataByTheme(
    cenoteId: ID,
    theme: VariableTheme,
  ): Promise<VariableWithData[]> {
    const data: VariableWithData[] = [];
    const snapshot = await mofDB.where("cenoteId", "==", cenoteId).get();
    const mofs = snapshot.docs.map((doc) => doc.data() as VariableWithData);

    for (const mof of mofs) {
      const variableSnapshot = await variableDB.doc(mof.variableId).get();
      const variable = variableSnapshot.data() as Variable;
      if (variable.theme == theme) {
        data.push(mof);
      }
    }
    return data;
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

  /**
   * Creates a Measurement or Fact.
   * If MoF bucket doesn't yet exist, creates new one.
   * Otherwise, adds to existing one.
   *
   * @param {NewMeasurementOrFactInput} newMof new MoF with
   * value and timestamp
   *
   * @return {Promise<VariableWithData>} the new MoF
   */
  async createMoF(newMof: NewMeasurementOrFactInput,): Promise<VariableWithData> {
    if (!cenoteProvider.cenoteExistsByCenoteandoId(newMof.cenoteId)) {
      throw new Error(`Cenote with cenoteando id ${newMof.cenoteId} doesn't exist.`);
    }

    const doc = await mofDB
      .where("cenoteId", "==", newMof.cenoteId)
      .where("variableId", "==", newMof.variableId)
      .get();

    const mof: MeasurementOrFact = {
      value: newMof.value,
      timestamp: new Date(newMof.timestamp).toISOString(),
    };

    if (doc.empty) {
      return await this.createMofBucket(newMof.variableId, mof, newMof);
    } else {
      const bucket = doc.docs[0].data() as VariableWithData;
      return await this.addMof(bucket, mof);
    }
  }

  private async createMofBucket(
    variableId: string,
    mof: MeasurementOrFact,
    input: NewMeasurementOrFactInput,
  ): Promise<VariableWithData> {
    const variable = await variableProvider.getVariableById(variableId);
    const variableIcon = variable.icon ? variable.icon : "";
    const variableRepresentation = variable.variableRepresentation ?
      variable.variableRepresentation : "TEXT";
    const variableUnits = variable.units ? variable.units : "";

    const docRef = mofDB.doc();
    await docRef.set({
      id: docRef.id,
      cenoteId: input.cenoteId,
      variableId: input.variableId,
      variableName: variable.name,
      variableIcon: variableIcon,
      variableRepresentation: variableRepresentation,
      variableUnits: variableUnits,
      measurements: [mof],
      firstTimestamp: new Date(input.timestamp).toISOString(),
      lastTimestamp: new Date(input.timestamp).toISOString(),
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
   * @param {DeleteMofInput} deletMofInput MoF to delete
   *
   * @return {Promise<VariableWithData>} the new MoF
   */
  async deleteMoF(deletMofInput: DeleteMofInput): Promise<boolean> {
    const doc = await mofDB
      .where("cenoteId", "==", deletMofInput.cenoteId)
      .where("variableId", "==", deletMofInput.variableId)
      .get();

    if (!doc.empty) {
      const bucket = doc.docs[0].data() as VariableWithData;
      const docId = doc.docs[0].id;

      const mofs = bucket.measurements.filter(
        (mof: any) =>
          mof.timestamp !== deletMofInput.timestamp.toISOString() &&
          mof.value !== deletMofInput.value,
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

  /**
   * Update a Measurement or Fact of a cenote.
   * Uses the old value and old timestamp to identify the MoF to be updated. After updating a value,
   * updates the first and last timestamp if needed
   *
   * @param {UpdateMofInput} deletMofInput MoF to delete
   *
   * @return {Promise<boolean>} if the update succeded
   */
  async updateMoF(updateMofInput: UpdateMofInput): Promise<boolean> {
    const doc = await mofDB
      .where("cenoteId", "==", updateMofInput.cenoteId)
      .where("variableId", "==", updateMofInput.variableId)
      .get();

    if (doc.empty) {
      return false;
    }

    const bucket = doc.docs[0].data() as VariableWithData;
    const docId = doc.docs[0].id;

    let modified = false;
    const measurements = bucket.measurements.map(
      (mof: MeasurementOrFact) => {
        if (mof.timestamp == updateMofInput.oldTimestamp.toISOString() &&
          mof.value == updateMofInput.oldValue) {
          modified = true;
          return {timestamp: updateMofInput.timestamp.toISOString(), value: updateMofInput.value};
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
        variableRepresentation: variableRepresentation
      });
    })

    return true;
  }
}
