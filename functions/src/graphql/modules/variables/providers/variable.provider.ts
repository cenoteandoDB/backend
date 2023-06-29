import { ID } from "graphql-modules/shared/types";
import { NewVariableInput, UpdateVariableInput, Variable, VariableTheme } from "../../../generated-types/graphql";
import { db } from "../../database/db";

const variableDB = db.variables

export const VariableProvider = {
    getVariables: async () => {
        const variables = await variableDB.get()
        return variables.docs.map(doc => doc.data() as Variable)
    },

    getVariableById: async (id: ID) => {
        const snapshot = await variableDB.doc(id).get()
        return snapshot.data() as Variable
    },

    getVariablesByTheme: async (theme: VariableTheme) => {
        const variables = await variableDB.where("theme", "==", theme).get()
        return variables.docs.map(doc => doc.data() as Variable)
    },

    createVariable: async (new_variable: NewVariableInput) => {
        const docRef = variableDB.doc();
        await docRef.set({
            id: docRef.id,
            createdAt: new Date().toISOString(),
            ...new_variable
        })
        
        const snapshot = await variableDB.doc(docRef.id).get()
        return snapshot.data() as Variable
    },
    updateVariable: async (updated_variable: UpdateVariableInput) => {
        await variableDB.doc(updated_variable.id).update({
            updatedAt: new Date().toISOString(),
            ...updated_variable
        })

        const snapshot = await variableDB.doc(updated_variable.id).get()
        return snapshot.data() as Variable
    }
};
