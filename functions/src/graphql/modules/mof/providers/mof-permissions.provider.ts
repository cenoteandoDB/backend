/* eslint-disable require-jsdoc */
import { ID } from "graphql-modules/shared/types";
import { db } from "../../database/db";
import { UserPermission } from "../../../generated-types/graphql";
import { UsersProvider } from "../../users/providers/users.provider";
import { VariablePermissionProvider } from "../../variables/providers/variable-permission";
import { CenotePermissionProvider } from "../../cenotes/providers/cenote-permission";

const cenotePermissionProvider = new CenotePermissionProvider();
const variablePermissionProvider = new VariablePermissionProvider();
const permissionsDB = db.permissions;
const usersProvider = new UsersProvider();

export class MofPermissionProvider {

  /**
   * Check user permissions to perform action in MoF.
   *
   * @param {ID} cenoteId   the user id to check if has permission
   * @param {ID} cenoteId   the cenote id to check MoF permission
   * @param {ID} variableId the variable id to check MoF permission
   * @param {string} action the action to perform in the MoF
   *
   * @return {Promise<boolean>} if the user has permission
   */
  async hasMofPermission(userId: ID, cenoteId: ID, variableId: ID, action: string)
  : Promise<boolean> {
    if (await this.getUserRole(userId) == "ADMIN") return true;

    const userPermissions = await this.getUserPermissions(userId);

    if (!cenotePermissionProvider.hasCenotePermission(cenoteId, action, userPermissions)) 
      return false;
    
    return variablePermissionProvider
      .hasVariablePermission(cenoteId, variableId, action, userPermissions);
  }

  private async getUserRole(userId: ID) {
    const user = await usersProvider.getUserById(userId);
    return user.role;
  }

  private async getUserPermissions(userId: ID) {
    const permissionsSnapshot = await permissionsDB.where("userId", "==", userId).get();
    
    return permissionsSnapshot.docs.map((doc: any) => doc.data() as UserPermission);
  }
}
