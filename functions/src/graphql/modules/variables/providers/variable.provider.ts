/* eslint-disable require-jsdoc */
import {ID} from "graphql-modules/shared/types";
import {
    NewVariableInput,
    UpdateVariableInput,
    Variable,
    VariableTheme,
} from "../../../generated-types/graphql";
import {db} from "../../database/db";

const variableDB = db.variables;

export class VariableProvider {
    /**
     * Get all variables.
     *
     * @return {Promise<Variable[]>} list with all variables
     */
    async getVariables(): Promise<Variable[]> {
        const variables = await variableDB.get();
        return variables.docs.map((doc) => doc.data() as Variable);
    }

    /**
     * Get a variable by id.
     *
     * @param {ID} id the id of the variable to get
     *
     * @return {Promise<Variable>} the variable
     */
    async getVariableById(id: ID): Promise<Variable> {
        const snapshot = await variableDB.where("_id", "==", id).get();
        return snapshot.docs[0].data() as Variable;
    }

    /**
     * Get all variables of a given theme.
     *
     * @param {VariableTheme} theme the variable theme to get
     *
     * @return {Promise<Variable[]>} list of variables of a given theme
     */
    async getVariablesByTheme(theme: VariableTheme): Promise<Variable[]> {
        const variables = await variableDB.where("theme", "==", theme).get();
        return variables.docs.map((doc) => doc.data() as Variable);
    }

    /**
     * Creates a varaible.
     *
     * @param {NewVariableInput} newVariable the variable input to be created
     *
     * @return {Promise<Variable>} the created variable
     */
    async createVariable(newVariable: NewVariableInput): Promise<Variable> {
        const docRef = variableDB.doc();
        await docRef.set({
            id: docRef.id,
            createdAt: new Date().toISOString(),
            ...newVariable,
        });

        const snapshot = await variableDB.doc(docRef.id).get();
        return snapshot.data() as Variable;
    }

    /**
     * Updates a variable.
     *
     * @param {UpdateVariableInput} updatedVariable the information to update
     * the variable
     *
     * @return {Promise<Variable>} the updated variable
     */
    async updateVariable(
        updatedVariable: UpdateVariableInput
    ): Promise<Variable> {
        await variableDB.doc(updatedVariable.id).update({
            updatedAt: new Date().toISOString(),
            ...updatedVariable,
        });

        const snapshot = await variableDB.doc(updatedVariable.id).get();
        return snapshot.data() as Variable;
    }
}
