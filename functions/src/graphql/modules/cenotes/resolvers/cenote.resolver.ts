import { StorageProvider } from "../../gcp/gcp.provider";
import { CenotesModule } from "../generated-types/module-types";

export const CenoteResolver: CenotesModule.Resolvers["Cenote"] = {
  name: (parent) => (parent.name != null ? parent.name : "no-name"),
  touristic: (parent) => (parent.touristic != null ? parent.touristic : false),
  photos: (parent) => StorageProvider.getPhotos(parent.firestore_id),
  maps: (parent) => StorageProvider.getMaps(parent.firestore_id),
};
