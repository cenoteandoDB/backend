import { ID } from "graphql-modules/shared/types";
import { NewVariableInput, UpdateVariableInput, Variable, VariableTheme } from "../../../generated-types/graphql";
import { db } from "../../database/db";

const variableDB = db.variables

export class VariableProvider {

    /**
     * Get all variables.
     *
     * @returns {Promise<Variable[]>} list with all variables
     */
    async getVariables(): Promise<Variable[]> {
        const variables = await variableDB.get()
        return variables.docs.map(doc => doc.data() as Variable)
    }

    /**
     * Get a variable by id.
     *
     * @param id the id of the variable to get 
     *
     * @returns {Promise<Variable>} the variable
     */
    async getVariableById(id: ID): Promise<Variable> {
        const snapshot = await variableDB.doc(id).get()
        return snapshot.data() as Variable
    }

    /**
     * Get all variables of a given theme.
     *
     * @param theme the variable theme to get
     *
     * @returns {Promise<Variable[]>} list of variables of a given theme
     */
    async getVariablesByTheme(theme: VariableTheme): Promise<Variable[]> {
        const variables = await variableDB.where("theme", "==", theme).get()
        return variables.docs.map(doc => doc.data() as Variable)
    }

    /**
     * Creates a varaible.
     *
     * @param new_variable the variable input to be created
     *
     * @returns {Promise<Variable>} the created variable
     */
    async createVariable(new_variable: NewVariableInput): Promise<Variable> {
        const docRef = variableDB.doc();
        await docRef.set({
            id: docRef.id,
            createdAt: new Date().toISOString(),
            ...new_variable
        })
        
        const snapshot = await variableDB.doc(docRef.id).get()
        return snapshot.data() as Variable
    }

    /**
     * Updates a variable.
     *
     * @param updated_variable the information to update the variable
     *
     * @returns {Promise<Variable>} the updated variable
     */
    async updateVariable(updated_variable: UpdateVariableInput): Promise<Variable> {
        await variableDB.doc(updated_variable.id).update({
            updatedAt: new Date().toISOString(),
            ...updated_variable
        })

        const snapshot = await variableDB.doc(updated_variable.id).get()
        return snapshot.data() as Variable
    }
};
