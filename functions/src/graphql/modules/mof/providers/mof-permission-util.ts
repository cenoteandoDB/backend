/* eslint-disable require-jsdoc */
import { MofPermission } from "../../../generated-types/graphql";

export class MofPermissionUtils {
  public static fullAccess() {
    const totalPermissions: MofPermission = {
      canView: true,
      canEdit: true,
      canDelete: true,
    };

    return totalPermissions;
  }

  public static noAccess() {
    const totalPermissions: MofPermission = {
      canView: false,
      canEdit: false,
      canDelete: false,
    };

    return totalPermissions;
  }
}
