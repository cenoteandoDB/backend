import { LayersProvider } from "../../gcp/gcp.dataSource";
import { StorageProvider } from "../../gcp/gcp.provider";
import { MapLayersModule } from "../generated-types/module-types";

export const MapLayerResolver: MapLayersModule.Resolvers["MapLayer"] = {
  name: (parent: any) => (parent.name != null ? parent.name : "no-name"),
  description: (parent: any) =>
    parent.description != null ? parent.description : "no-description",
  thumbnail: (parent: any) => StorageProvider.getThumbnail(parent.id),
  geojson: (parent: any, args: any, contextValue: any, info: any) => {
    const mapLayerProvider = contextValue.injector.get(LayersProvider);
    return mapLayerProvider.getGeojson(parent.id);
  },
  metadata: (parent: any) => StorageProvider.getMetadata(parent.id),
  zip: (parent: any, args: any, contextValue: any, info: any) => {
    const mapLayerProvider = contextValue.injector.get(LayersProvider);
    return mapLayerProvider.getZip(parent.id);
  },
};
