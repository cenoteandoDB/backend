/* eslint-disable require-jsdoc */
import { ID } from "graphql-modules/shared/types";
import { db } from "../../database/db";
import { MofPermission, UserPermission } from "../../../generated-types/graphql";
import { UsersProvider } from "../../users/providers/users.provider";
import { VariablePermissionProvider } from "../../variables/providers/variable-permission";
import { CenotePermissionProvider } from "../../cenotes/providers/cenote-permission";
import { MofPermissionUtils } from "./mof-permission-util";

const cenotePermissionProvider = new CenotePermissionProvider();
const variablePermissionProvider = new VariablePermissionProvider();
const permissionsDB = db.permissions;
const usersProvider = new UsersProvider();

export class MofPermissionProvider {
  /**
   * Check user permissions to perform action in MoF.
   *
   * @param {ID} userId     the user id to check if has permission
   * @param {ID} cenoteId   the cenote id to check MoF permission
   * @param {ID} variableId the variable id to check MoF permission
   *
   * @return {Promise<MofPermission>} if the user has permission
   */
  async getMofPermission(userId: ID, cenoteId: ID, variableId: ID): Promise<MofPermission> {
    if (await this.getUserRole(userId) == "ADMIN") {
      return MofPermissionUtils.fullAccess();
    }

    const userPermissions = await this.getUserPermissions(userId, cenoteId);

    if (!cenotePermissionProvider.hasCenotePermission(cenoteId, userPermissions)) {
      return MofPermissionUtils.noAccess();
    }
    
    return variablePermissionProvider
      .getVariablePermission(variableId, userPermissions);
  }

  private async getUserRole(userId: ID) {
    const user = await usersProvider.getUserById(userId);
    return user.role;
  }

  private async getUserPermissions(userId: ID, cenoteId: ID) {
    const permissionsSnapshot = await permissionsDB
      .where("userId", "==", userId)
      .where("cenoteId", "==", cenoteId)
      .get();
    
    return permissionsSnapshot.docs.map((doc: any) => doc.data() as UserPermission);
  }
}
