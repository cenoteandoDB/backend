import { AuthorizationModule } from "../generated-types/module-types";
import { AuthorizationProvider } from "../providers/authorization.provider";

const authorizationProvider = new AuthorizationProvider();

export const QueryResolver: AuthorizationModule.Resolvers["Query"] = {
  getVariablePermissions: (parent, args, contextValue, info) => {
    return authorizationProvider.getVariablePermissions(args.userId, args.cenoteId, args.variableId);
  },
  getAllVariablesPermissions: (parent, args, contextValue, info) => {
    return authorizationProvider.getAllVariablesPermissions(args.userId, args.cenoteId);
  },
  getCenotePermissions: (parent, args, contextValue, info) => {
    return authorizationProvider.getCenotePermissions(args.userId, args.cenoteId);
  },
  getAllCenotesPermissions: (parent, args, contextValue, info) => {
    return authorizationProvider.getAllCenotesPermissions(args.userId);
  },
};
