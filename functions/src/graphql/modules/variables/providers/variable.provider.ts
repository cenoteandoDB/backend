/* eslint-disable require-jsdoc */
import { firestore } from "firebase-admin";
import {
    NewVariableInput,
    PaginationInput,
    SortField,
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
     * @param {SortField} sort optional sort field. Default by name
     * @param {PaginationInput} pagination optional pagination parameter
     * @param {string} name  The name of user to retrieve
     * @return {Promise<Variable[]>} list with all variables
     */
    async getVariables(
        sort: SortField|null|undefined = { field: "name", sortOrder: "ASC" },
        pagination: PaginationInput|null = { offset: 0, limit: 25 },
        name: string|null|undefined
    ): Promise<Variable[]> {
        let query: any;
        if(name) {
            const endSearch = name.replace(/.$/, c => String.fromCharCode(c.charCodeAt(0) + 1));
            query = variableDB.where('name', '>=', name).where('name', '<', endSearch).orderBy(sort?.field ?? "name", sort?.sortOrder.toLowerCase() as firestore.OrderByDirection);
        } else {
            query = variableDB.orderBy(sort?.field ?? "name", sort?.sortOrder.toLowerCase() as firestore.OrderByDirection);
        }
      
        if (pagination) {
            query = query.offset(pagination.offset).limit(pagination.limit);
        }
      
        const users = await query.get();
        return users.docs.map((doc: any) => doc.data() as Variable);
    }

    /**
     * Get a variable by id.
     *
     * @param {ID} id the id of the variable to get
     *
     * @return {Promise<Variable>} the variable
     */
    async getVariableById(id: string): Promise<Variable> {
        const snapshot = await variableDB.doc(id).get();

        if (!snapshot.exists) {
            throw new Error(`Variable ${id} not found.`);
        }
        
        return snapshot.data() as Variable;
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
        await variableDB.doc(updatedVariable.firestore_id).update({
            updatedAt: new Date().toISOString(),
            ...updatedVariable,
        });

        const snapshot = await variableDB.doc(updatedVariable.firestore_id).get();
        return snapshot.data() as Variable;
    }
}
