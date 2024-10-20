/* eslint-disable require-jsdoc */
import { ID } from "graphql-modules/shared/types";
import { db } from "../../database/db";
import { CenotesPermissionInput, Permission, PermissionType, VariablePermissionInput } from "../../../generated-types/graphql";

const permissionsDB = db.permissions;

export class AuthorizationProvider {
  /**
   * Get all permissions.
   *
   * @param {ID} userId the user ID
   * @param {PermissionType} type the permission type
   *
   * @return {Promise<Permission[]>} a list with all cenotes
   */
  async getPermissions(userId: ID, type: PermissionType | undefined | null): Promise<Permission[]> {
    const permissionsSnapshot = await permissionsDB.where("userId", "==", userId).get();
    
    return permissionsSnapshot.docs.map((doc: any) => doc.data() as Permission);
  }


  /**
   * Update cenote permissions for a user.
   *
   * @param {CenotesPermissionInput} cenotePermissionInput the user's cenote permissions
   *
   * @return {Promise<boolean>} if the cenote exists
   */
  async updatePermissionsCenote(cenotePermissionInput: CenotesPermissionInput): Promise<boolean> {
    const docRef = permissionsDB.doc();
    await docRef.set({
      id: docRef.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...cenotePermissionInput
    });

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
    const docRef = permissionsDB.doc();
    await docRef.set({
      id: docRef.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...variablesPermissionInput
    });

    return true;
  }
}
