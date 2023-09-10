import { MapLayersModule } from "../generated-types/module-types";
import { MapLayerResolver } from "./map-layer.resolver";
import { MutationResolver } from "./mutation.resolver";
import { QueryResolver } from "./query.resolver";

export const MapLayerResolvers: MapLayersModule.Resolvers = {
    Mutation: MutationResolver,
    Query: QueryResolver,
    MapLayer: MapLayerResolver,
};
