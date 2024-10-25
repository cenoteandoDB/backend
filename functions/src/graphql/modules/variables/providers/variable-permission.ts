/* eslint-disable require-jsdoc */
import { UserPermission } from "../../../generated-types/graphql";
import { ID } from "graphql-modules/shared/types";

export class VariablePermissionProvider {
  /**
   * Check user permissions to perform action in variable.
   *
   * @param {ID} cenoteId of the cenote to get MoF
   * @param {VariableTheme} theme of the cenote to get MoF
   *
   * @return {Promise<MofByCategory[]>} list of MoF of a theme grouped by category
   */
  async hasVariablePermission(cenoteId: ID, 
    variableId: ID, 
    action: string, 
    userPermissions: UserPermission[]
  ): Promise<boolean> {
    

    // logic
    return true;
  }
}
