import { LayersProvider } from "../../gcp/gcp.dataSource";
import { StorageProvider } from "../../gcp/gcp.provider";
import { MapLayersModule } from "../generated-types/module-types";


export const MapLayerResolver: MapLayersModule.Resolvers["MapLayer"] = {
    name: (parent) => parent.name != null ? parent.name : "no-name",
    description: (parent) => parent.description != null ? parent.description : "no-description",
    thumbnail: (parent) => StorageProvider.getThumbnail(parent.id),
    json: (parent, args, contextValue, info) => {
        const mapLayerProvider = contextValue.injector.get(LayersProvider)
        return mapLayerProvider.getJson(parent.id)
    },
    metadata: (parent) => StorageProvider.getMetadata(parent.id),
    layer: (parent, args, contextValue, info) => {
        const mapLayerProvider = contextValue.injector.get(LayersProvider)
        return mapLayerProvider.getLayer(parent.id)
    },
};
