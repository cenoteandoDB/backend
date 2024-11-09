/* eslint-disable require-jsdoc */
import { UserPermission } from "../../../generated-types/graphql";
import { ID } from "graphql-modules/shared/types";

// const cenoteDB = db.cenotes;

export class CenotePermissionProvider {
  /**
   * Check user permissions to perform action in cenote.
   *
   * @param {ID}            cenoteId of the cenote to get MoF
   * @param {Permission[]}  userPermissions the user's permissions
   *
   * @return {Promise<boolean>} if the user has permission to modify the cenote
   */
  async hasCenotePermission(cenoteId: ID, 
    userPermissions: UserPermission[],
  ): Promise<boolean> {
    // logic
    return true;
  }
}
