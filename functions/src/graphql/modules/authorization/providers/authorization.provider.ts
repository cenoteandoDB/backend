/* eslint-disable require-jsdoc */
import { ID } from "graphql-modules/shared/types";
import { db } from "../../database/db";
import { CenotePermission, 
  CenotesPermissionInput,
  VariablePermission,
  VariablePermissionInput,
} from "../../../generated-types/graphql";

const permissionsDB = db.permissions;

export class AuthorizationProvider {
  /**
   * Get all variable permissions of a user.
   *
   * @param {ID} userId     the user ID
   * @param {ID} cenoteId   the cenote ID
   * @param {ID} variableId the variable ID
   *
   * @return {Promise<VariablePermission>} the user permission for a given variable in a cenote
   */
  async getVariablePermissions(userId: ID, cenoteId: ID, variableId: ID)
    : Promise<VariablePermission> {
    const permissionsSnapshot = await permissionsDB
      .where("type", "==", "VARIABLE")
      .where("userId", "==", userId)
      .where("cenoteId", "==", cenoteId)
      .where("variableId", "in", ["*", variableId])
      .get();

    if (permissionsSnapshot.size == 0) {
      const permissions: VariablePermission = {
        permissionType: "VARIABLE",
        canView: false,
        canDelete: false,
        canEdit: false,
        variableId: variableId,
      };

      return permissions;
    }

    return permissionsSnapshot.docs[0].data() as VariablePermission;
  }

  /**
   * Get all variable permissions of a user.
   *
   * @param {ID} userId   the user ID
   * @param {ID} cenoteId the cenote ID
   *
   * @return {Promise<Permission[]>} a list user permissions
   */
  async getAllVariablesPermissions(userId: ID, cenoteId: ID)
    : Promise<VariablePermission[]> {
    const permissionsSnapshot = await permissionsDB
      .where("permissionType", "==", "VARIABLE")
      .where("userId", "==", userId)
      .where("cenoteId", "==", cenoteId)
      .get();

    if (permissionsSnapshot.size == 0) return [];

    return permissionsSnapshot.docs.map((doc: any) => doc.data() as VariablePermission);
  }

  /**
   * Get cenote permissions of a user.
   *
   * @param {ID} userId     the user ID
   * @param {ID} cenoteId   the cenote ID
   *
   * @return {Promise<CenotePermission>} the user permission for a given variable in a cenote
   */
  async getCenotePermissions(userId: ID, cenoteId: ID): Promise<CenotePermission> {
    const permissionsSnapshot = await permissionsDB
      .where("userId", "==", userId)
      .where("cenoteId", "in", ["*", cenoteId])
      .where("type", "==", "CENOTE")
      .get();

    if (permissionsSnapshot.size == 0) {
      const permissions: CenotePermission = {
        permissionType: "CENOTE",
        canView: false,
        canDelete: false,
        canEdit: false,
        cenoteId: cenoteId,
      };

      return permissions;
    }

    return permissionsSnapshot.docs[0].data() as CenotePermission;
  }

  /**
   * Get all variable permissions of a user.
   *
   * @param {ID} userId   the user ID
   * @param {ID} cenoteId the cenote ID
   *
   * @return {Promise<Permission[]>} a list user permissions
   */
  async getAllCenotesPermissions(userId: ID): Promise<CenotePermission[]> {
    const permissionsSnapshot = await permissionsDB
      .where("userId", "==", userId)
      .where("type", "==", "CENOTE")
      .get();

    // TODO check if is * and return null
    return permissionsSnapshot.docs.map((doc: any) => doc.data() as CenotePermission);
  }


  /**
   * Update cenote permissions for a user.
   *
   * @param {CenotesPermissionInput} cenotePermissionInput the user's cenote permissions
   *
   * @return {Promise<boolean>} if the cenote exists
   */
  async updatePermissionsCenote(cenotePermissionInput: CenotesPermissionInput): Promise<boolean> {
    const querySnapshot = await permissionsDB
      .where("permissionType", "==", "CENOTE")
      .where("userId", "==", cenotePermissionInput.userId)
      .get();

    querySnapshot.forEach((doc) => {
      permissionsDB.doc(doc.id).delete();
    });

    if (cenotePermissionInput.cenotes == null) {
      // allow all cenotes
      const docRef = permissionsDB.doc();
      await docRef.set({
        id: docRef.id,
        permissionType: "CENOTE",
        userId: cenotePermissionInput.userId,
        cenoteId: "*",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    } else {
      // allow only variables specified
      cenotePermissionInput.cenotes.forEach((cenotePermission) => {
        const docRef = permissionsDB.doc();
        docRef.set({
          id: docRef.id,
          permissionType: "CENOTE",
          userId: cenotePermissionInput.userId,
          cenoteId: cenotePermission.cenoteId,
          canView: cenotePermission.canView,
          canEdit: cenotePermission.canEdit,
          canDelete: cenotePermission.canDelete,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      });
    }

    return true;
  }

  /**
   * Update variable permissions for a user.
   *
   * @param {VariablePermissionInput} variablesPermissionInput user's variables permissions
   *
   * @return {Promise<boolean>} if updated
   */
  async updatePermissionsVariable(variablesPermissionInput: VariablePermissionInput)
  : Promise<boolean> {
    const querySnapshot = await permissionsDB
      .where("userId", "==", variablesPermissionInput.userId)
      .where("cenoteId", "==", variablesPermissionInput.cenoteId)
      .get();

    querySnapshot.forEach((doc) => {
      permissionsDB.doc(doc.id).delete();
    });

    if (variablesPermissionInput.variables == null) {
      // allow all variables
      const docRef = permissionsDB.doc();
      await docRef.set({
        id: docRef.id,
        permissionType: "VARIABLE",
        userId: variablesPermissionInput.userId,
        cenoteId: variablesPermissionInput.cenoteId,
        variableId: "*",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    } else {
      // allow only variables specified
      variablesPermissionInput.variables.forEach((variablePermission) => {
        const docRef = permissionsDB.doc();
        docRef.set({
          id: docRef.id,
          permissionType: "VARIABLE",
          userId: variablesPermissionInput.userId,
          cenoteId: variablesPermissionInput.cenoteId,
          variableId: variablePermission.variableId,
          canView: variablePermission.canView,
          canEdit: variablePermission.canEdit,
          canDelete: variablePermission.canDelete,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      });
    }

    return true;
  }
}
