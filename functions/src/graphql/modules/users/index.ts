import { loadFilesSync } from "@graphql-tools/load-files";
import { createModule } from "graphql-modules";
import { UsersResolvers } from "./resolvers";

export const UsersModule = createModule({
  id: "users",
  dirname: __dirname,
  typeDefs: loadFilesSync(__dirname + "/schema/**/*.graphql"),
  resolvers: UsersResolvers,
  middlewares: {},
  providers: [],
});
