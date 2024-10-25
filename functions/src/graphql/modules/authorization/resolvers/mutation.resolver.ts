import { AuthorizationModule } from "../generated-types/module-types";
import { AuthorizationProvider } from "../providers/authorization.provider";

const authorizationProvider = new AuthorizationProvider();

export const MutationResolver: AuthorizationModule.Resolvers["Mutation"] = {
  updatePermissionsCenote: (parent, args, contextValue, info) => {
    return authorizationProvider.updatePermissionsCenote(args.cenotePermissionInput);
  },
  updatePermissionsVariable: (parent, args, contextValue, info) => {
    return authorizationProvider.updatePermissionsVariable(args.variablesPermissionInput);
  },
};
