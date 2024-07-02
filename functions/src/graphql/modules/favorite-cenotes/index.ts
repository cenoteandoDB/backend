import { loadFilesSync } from "@graphql-tools/load-files";
import { createModule } from "graphql-modules";
import { FavoriteCenotesResolver } from "./resolvers";

export const FavoriteCenotesModule = createModule({
  id: "favorite-cenotes",
  dirname: __dirname,
  typeDefs: loadFilesSync(__dirname + "/schema/**/*.graphql"),
  resolvers: FavoriteCenotesResolver,
  middlewares: {},
  providers: [],
});
