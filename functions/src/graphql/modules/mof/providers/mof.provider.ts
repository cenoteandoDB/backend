import { ID } from "graphql-modules/shared/types";
import { db } from "../../database/db";
import { VariableTheme, VariableWithData, NewMeasurementOrFactInput, MeasurementOrFact, Variable } from "../../../generated-types/graphql";

const mofDB = db.mofs
const variableDB = db.variables

export class MofProvider {
    
    /**
     * Get cenote measurements or facts by theme.
     *
     * @param id of the cenote to get MoF
     * 
     * @returns {Promise<VariableWithData[]>} list of MoF
     */
    async cenoteDataByTheme(cenote: ID, theme: VariableTheme): Promise<VariableWithData[]>  {
        let data: VariableWithData[] = []
        const snapshot = await mofDB.where("_to", "==", cenote).get()
        const mofs = snapshot.docs.map(doc => doc.data() as VariableWithData)
        
        for(const mof of mofs) {
            const variable_snapshot = await variableDB.where("_id", "==", mof._from).get()
            const variable = variable_snapshot.docs[0].data() as Variable
            if (variable.theme == theme) {
                data.push(mof)
            }
        }
        return data;
    }

    /**
     * Get cenote measurements or facts by variable.
     *
     * @param id of the cenote to get MoF
     * 
     * @returns {Promise<VariableWithData>} MoFs of given cenote and variable
     */
    async cenoteDataByVariable(cenote: ID, variable: ID): Promise<VariableWithData>  {
        const mof = await mofDB.where("_to", "==", cenote).where("_from", "==", variable).get()
        return mof.docs[0].data() as VariableWithData
    }

    /**
     * Creates a Measurement or Fact. 
     * If MoF bucket doesn't yet exist, creates new one. Otherwise, adds to existing one.
     *
     * @param new_mof new MoF with value and timestamp
     *
     * @returns {Promise<VariableWithData>} the new MoF
     */
    async createMoF(new_mof: NewMeasurementOrFactInput): Promise<VariableWithData> {
        const doc = await mofDB.where("_to", "==", new_mof.cenote).where("_from", "==", new_mof.variable).get()

        const mof: MeasurementOrFact = {
            value: new_mof.value,
            timestamp: new Date(new_mof.timestamp).toISOString()
        }

        if (doc.empty) {
            return await this.createMofBucket(mof, new_mof)
        } else {
            const bucket = doc.docs[0].data() as VariableWithData
            return await this.addMof(bucket, mof)
        }
    }

    private async createMofBucket(mof: MeasurementOrFact, input: NewMeasurementOrFactInput): Promise<VariableWithData> {
        const docRef = mofDB.doc()
        const data : VariableWithData = {
            _id: docRef.id,
            _to: input.cenote,
            _from: input.variable,
            measurements: [mof],
            firstTimestamp: new Date(input.timestamp).toISOString(),
            lastTimestamp: new Date(input.timestamp).toISOString()
        }

        await docRef.set(data)

        const snapshot = await mofDB.doc(docRef.id).get()
        return snapshot.data() as VariableWithData
    }

    private async addMof(bucket: VariableWithData, mof: MeasurementOrFact): Promise<VariableWithData> {
        bucket.measurements.push(mof)
        const firstTimestamp = bucket.firstTimestamp < mof.timestamp ? bucket.firstTimestamp : mof.timestamp
        const lastTimestamp = bucket.lastTimestamp > mof.timestamp ? bucket.lastTimestamp : mof.timestamp

        await mofDB.doc(bucket._id).update({
            data: bucket.measurements,
            firstTimestamp,
            lastTimestamp
        })
        
        const snapshot = await mofDB.doc(bucket._id).get()
        return snapshot.data() as VariableWithData
    }

};
