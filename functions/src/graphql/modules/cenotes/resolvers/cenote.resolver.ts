import {StorageProvider} from "../../gcp/gcp.provider";
import {CenotesModule} from "../generated-types/module-types";

export const CenoteResolver: CenotesModule.Resolvers["Cenote"] = {
    id: (parent) => parent._key,
    name: (parent) => (parent.name != null ? parent.name : "no-name"),
    touristic: (parent) =>
        parent.touristic != null ? parent.touristic : false,
    type: (parent) => (parent.type != null ? parent.type : "NO_TYPE"),
    photos: (parent) => StorageProvider.getPhotos(parent._key),
    maps: (parent) => StorageProvider.getMaps(parent._key),
    location: (parent) => {
        return {
            coordinates: {
                latitude:
                    parent.geojson == null ?
                        20.533333 :
                        parent.geojson.geometry.coordinates[1],
                longitude:
                    parent.geojson == null ?
                        -87.972222 :
                        parent.geojson.geometry.coordinates[0],
            },
            country: "Mexico",
            state: "Yucatán",
            municipality: "Hunucmá",
        };
    },
};
