/* eslint-disable require-jsdoc */
import { firestore } from "firebase-admin";
import {
  NewVariableInput,
  PaginationInput,
  SortField,
  UpdateVariableInput,
  Variable,
  VariableTheme,
  VariableList,
} from "../../../generated-types/graphql";
import { db } from "../../database/db";
import { ID } from "graphql-modules/shared/types";

const variableDB = db.variables;

export class VariableProvider {
  /**
   * Get all variables.
   *
   * @param {SortField} sort optional sort field. Default by name
   * @param {PaginationInput} pagination optional pagination parameter
   * @param {string} name  The name of user to retrieve
   * @return {Promise<VariableList>} list with all variables
   */
  async getVariables(
    sort: SortField | null | undefined = { field: "name", sortOrder: "ASC" },
    pagination: PaginationInput | null = { offset: 0, limit: 25 },
    name: string | null | undefined,
  ): Promise<VariableList> {
    let query: any;
    let countQuery: any;
    if (name) {
      const endSearch = name.replace(/.$/, (c) =>
        String.fromCharCode(c.charCodeAt(0) + 1),
      );
      query = variableDB
        .where("name", ">=", name)
        .where("name", "<", endSearch)
        .orderBy(
          sort?.field ?? "name",
          sort?.sortOrder.toLowerCase() as firestore.OrderByDirection,
        );
      countQuery = variableDB
        .where("name", ">=", name)
        .where("name", "<", endSearch);
    } else {
      query = variableDB.orderBy(
        sort?.field ?? "name",
        sort?.sortOrder.toLowerCase() as firestore.OrderByDirection,
      );
      countQuery = variableDB;
    }

    if (pagination) {
      query = query.offset(pagination.offset).limit(pagination.limit);
    }

    // const users = await query.get();
    // return users.docs.map((doc: any) => doc.data() as Variable);

    const [variablesSnapshot, totalCountSnapshot] = await Promise.all([
      query.get(),
      countQuery.get(),
    ]);

    const variables = variablesSnapshot.docs.map(
      (doc: any) => doc.data() as Variable,
    );
    const totalCount = totalCountSnapshot.size;

    return { variables, totalCount };
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
      firestore_id: docRef.id,
      createdAt: new Date().toISOString(),
      ...newVariable,
    });

    const snapshot = await variableDB.doc(docRef.id).get();
    console.log(snapshot);
    return snapshot.data() as Variable;
  }

  /**
   * Updates a variable.
   *
   * @param {string} variableId the variable id
   * @param {UpdateVariableInput} updatedVariable the information to update
   * the variable
   *
   * @return {Promise<Variable>} the updated variable
   */
  async updateVariable(
    variableId: string,
    updatedVariable: UpdateVariableInput
  ): Promise<Variable> {
    await variableDB.doc(variableId).update({
      updatedAt: new Date().toISOString(),
      ...updatedVariable,
    });

    const snapshot = await variableDB.doc(variableId).get();
    return snapshot.data() as Variable;
  }

  /**
   * Delete a variable by id.
   *
   * @param {ID} id of the user to delete
   *
   * @return {Promise<Boolean>} true if deleted
   */
  async deleteVariable(id: ID): Promise<boolean> {
    await this.variableExists(id);

    await variableDB.doc(id).delete();
    return true;
  }

  /**
   * Verify if a variable exists by id.
   *
   * @param {ID} id of the variable to verify
   *
   * @return {Promise<Boolean>} true if exists. Throws exception otherwise
   */
  async variableExists(id: ID): Promise<boolean> {
    const snapshot = await variableDB.doc(id).get();

    if (!snapshot.exists) {
      throw new Error("Variable does not exist.");
    }

    return true;
  } 
}
