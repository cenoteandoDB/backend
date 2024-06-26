import {MapLayersModule} from "../generated-types/module-types";
import {MapLayerProvider} from "../providers/map-layer.provider";

const mapLayerProvider = new MapLayerProvider();

export const QueryResolver: MapLayersModule.Resolvers["Query"] = {
    layers: () => mapLayerProvider.getMapLayers(),
    layer: (parent, args, contextValue, info) => {
        return mapLayerProvider.getMapLayer(args.id);
    },
};
