import { loadFilesSync } from "@graphql-tools/load-files";
import { createModule } from "graphql-modules";
import { AuthorizationResolvers } from "./resolvers";

export const PermissionsModule = createModule({
  id: "permissions",
  dirname: __dirname,
  typeDefs: loadFilesSync(__dirname + "/schema/**/*.graphql"),
  resolvers: AuthorizationResolvers,
  middlewares: {},
  providers: [],
});
