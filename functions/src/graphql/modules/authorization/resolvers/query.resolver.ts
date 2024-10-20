import { AuthorizationModule } from "../generated-types/module-types";
import { AuthorizationProvider } from "../providers/authorization.provider";

const authorizationProvider = new AuthorizationProvider();

export const QueryResolver: AuthorizationModule.Resolvers["Query"] = {
  getPermissions: (parent, args, contextValue, info) => {
    return authorizationProvider.getPermissions(args.userId, args.type);
  },
};
