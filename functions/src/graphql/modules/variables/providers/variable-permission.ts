/* eslint-disable require-jsdoc */
import { MofPermission,
  UserPermission,
  VariablePermission,
} from "../../../generated-types/graphql";
import { ID } from "graphql-modules/shared/types";
import { MofPermissionUtils } from "../../mof/providers/mof-permission-util";

export class VariablePermissionProvider {
  /**
   * Check user permissions to perform action in variable.
   *
   * @param {ID} variableId                    the variable ID
   * @param {UserPermission[]} userPermissions the user permissions
   *
   * @return {Promise<MofByCategory[]>} list of MoF of a theme grouped by category
   */
  async getVariablePermission(variableId: ID, userPermissions: UserPermission[])
    :Promise<MofPermission> {
    const filteredPermissions = userPermissions
      .filter((p): p is VariablePermission => p.permissionType === "VARIABLE")
      .filter((p) => p.variableId === variableId || p.variableId === "*");
    

    if (filteredPermissions.length == 0) {
      return MofPermissionUtils.noAccess();
    } else {
      return this.mofPermissions(filteredPermissions[0]);
    }
  }

  private mofPermissions(variablePermissions: VariablePermission): MofPermission {
    const permission: MofPermission = {
      canView: variablePermissions.canView,
      canEdit: variablePermissions.canEdit,
      canDelete: variablePermissions.canDelete,    
    };
    return permission;
  }
}
