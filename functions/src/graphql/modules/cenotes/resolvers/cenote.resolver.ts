import { StorageProvider } from "../../gcp/gcp.provider";
import { ReferenceProvider } from "../../references/providers/reference.provider";
import { SpeciesProvider } from "../../species/providers/species.provider";
import { CenotesModule } from "../generated-types/module-types";

export const CenoteResolver: CenotesModule.Resolvers["Cenote"] = {
  name: (parent) => (parent.name != null ? parent.name : "no-name"),
  touristic: (parent) => (parent.touristic != null ? parent.touristic : false),
  photos: (parent) => StorageProvider.getPhotos(parent.firestore_id),
  maps: (parent) => StorageProvider.getMaps(parent.firestore_id),
  references: (parent) => {
    if (!parent.referencesIds) return [];
    const referenceProvider = new ReferenceProvider();
    return referenceProvider.getCenoteReferences(parent.referencesIds);
  },
  species: (parent) => {
    if (!parent.speciesIds) return [];
    const speciesProvider = new SpeciesProvider();
    return speciesProvider.getCenoteSpecies(parent.speciesIds);
  },
};
