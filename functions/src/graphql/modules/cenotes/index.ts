import { loadFilesSync } from "@graphql-tools/load-files";
import { createModule } from "graphql-modules";
import { CenotesResolvers } from "./resolvers";

export const CenotesModule = createModule({
  id: "cenotes",
  dirname: __dirname,
  typeDefs: loadFilesSync(__dirname + "/schema/**/*.graphql"),
  resolvers: CenotesResolvers,
  middlewares: {},
  providers: [],
});
