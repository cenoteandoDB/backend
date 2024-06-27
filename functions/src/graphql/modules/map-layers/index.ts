import { loadFilesSync } from "@graphql-tools/load-files";
import { createModule } from "graphql-modules";
import { MapLayerResolvers } from "./resolvers";

// TODO: Check if loaders work
//  otherwise check https://the-guild.dev/graphql/tools/docs/schema-loading#loaders

export const MapLayersModule = createModule({
  id: "map-layers",
  dirname: __dirname,
  typeDefs: loadFilesSync(__dirname + "/schema/**/*.graphql"),
  resolvers: MapLayerResolvers,
  middlewares: {},
  providers: [],
});
