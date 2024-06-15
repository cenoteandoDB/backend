import {StorageProvider} from "../../gcp/gcp.provider";
import {CenotesModule} from "../generated-types/module-types";

export const CenoteResolver: CenotesModule.Resolvers["Cenote"] = {
    name: (parent) => (parent.name != null ? parent.name : "no-name"),
    touristic: (parent) =>
        parent.touristic != null ? parent.touristic : false,
    type: (parent) => (parent.type != null ? parent.type : "NO_TYPE"),
    photos: (parent) => StorageProvider.getPhotos(parent.id),
    maps: (parent) => StorageProvider.getMaps(parent.id),
};
