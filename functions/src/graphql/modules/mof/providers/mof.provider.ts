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
} from "../../../generated-types/graphql";

const mofDB = db.mofs;
const variableDB = db.variables;

export class MofProvider {
  /**
   * Get cenote measurements or facts by theme.
   *
   * @param {ID} id of the cenote to get MoF
   * @param {VariableTheme} theme of the cenote to get MoF
   *
   * @return {Promise<VariableWithData[]>} list of MoF
   */
  async cenoteDataByTheme(
    id: ID,
    theme: VariableTheme,
  ): Promise<VariableWithData[]> {
    const data: VariableWithData[] = [];
    const snapshot = await mofDB.where("_to", "==", this.getCenoteId(id)).get();
    const mofs = snapshot.docs.map((doc) => doc.data() as VariableWithData);

    for (const mof of mofs) {
      const variableSnapshot = await variableDB
        .where("_id", "==", mof._from)
        .get();
      const variable = variableSnapshot.docs[0].data() as Variable;
      if (variable.theme == theme) {
        data.push(mof);
      }
    }
    return data;
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
  ): Promise<VariableWithData> {
    const mof = await mofDB
      .where("_to", "==", this.getCenoteId(cenoteId))
      .where("_from", "==", this.getVariableId(variableId))
      .get();
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
  async createMoF(
    newMof: NewMeasurementOrFactInput,
  ): Promise<VariableWithData> {
    const doc = await mofDB
      .where("_to", "==", this.getCenoteId(newMof.cenote))
      .where("_from", "==", this.getVariableId(newMof.variable))
      .get();

    const mof: MeasurementOrFact = {
      value: newMof.value,
      timestamp: new Date(newMof.timestamp).toISOString(),
    };

    if (doc.empty) {
      return await this.createMofBucket(mof, newMof);
    } else {
      const bucket = doc.docs[0].data() as VariableWithData;
      return await this.addMof(bucket, mof);
    }
  }

  private async createMofBucket(
    mof: MeasurementOrFact,
    input: NewMeasurementOrFactInput,
  ): Promise<VariableWithData> {
    const docRef = mofDB.doc();
    await docRef.set({
      _id: docRef.id,
      _to: this.getCenoteId(input.cenote),
      _from: this.getVariableId(input.variable),
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
    console.log(bucket.measurements);
    const firstTimestamp =
      bucket.firstTimestamp < mof.timestamp
        ? bucket.firstTimestamp
        : mof.timestamp;
    const lastTimestamp =
      bucket.lastTimestamp > mof.timestamp
        ? bucket.lastTimestamp
        : mof.timestamp;

    await mofDB.doc(bucket._id).update({
      measurements: bucket.measurements,
      firstTimestamp,
      lastTimestamp,
    });

    const snapshot = await mofDB.doc(bucket._id).get();
    return snapshot.data() as VariableWithData;
  }

  /**
   * Deletes a Measurement or Fact given cenote,
   * variable and timestamp of measure.
   *
   * @param {DeleteMofInput} deletMofInput MoF to delete
   *
   * @return {Promise<VariableWithData>} the new MoF
   */
  async deleteMoF(deletMofInput: DeleteMofInput): Promise<boolean> {
    const doc = await mofDB
      .where("_to", "==", this.getCenoteId(deletMofInput.cenote))
      .where("_from", "==", this.getVariableId(deletMofInput.variable))
      .get();

    if (!doc.empty) {
      const bucket = doc.docs[0].data() as VariableWithData;
      const docId = doc.docs[0].id;

      const mofs = bucket.measurements.filter(
        (mof: any) => mof.timestamp !== deletMofInput.timestamp.toISOString(),
      );

      if (mofs.length == 0) {
        mofDB.doc(doc.docs[0].id).delete();
      } else {
        this.updateMofAfterDelete(docId, bucket, mofs);
      }
    }

    return true;
  }

  private async updateMofAfterDelete(
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

  private getCenoteId(cenoteId: string): string {
    return `Cenotes/${cenoteId}`;
  }

  private getVariableId(variableId: string): string {
    return `Variables/${variableId}`;
  }
}
