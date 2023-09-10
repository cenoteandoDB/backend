import { MapLayersModule } from "../generated-types/module-types";
import { MapLayerProvider } from "../providers/map-layer.provider";

const mapLayerProvider = new MapLayerProvider()

export const MutationResolver: MapLayersModule.Resolvers["Mutation"] = {

    create: (parent, args, contextValue, info) => {
        return mapLayerProvider.create(args.input)
    }
};
