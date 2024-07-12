import { SpeciesModule } from "../generated-types/module-types";
import { SpeciesProvider } from "../providers/species.provider";

const speciesProvider = new SpeciesProvider();

export const QueryResolver: SpeciesModule.Resolvers["Query"] = {
  species: () => {
    return speciesProvider.getSpecies();
  },
  speciesById: (parent, args, contextValue, info) => {
    return speciesProvider.getSpeciesById(args.id);
  },
  speciesByGbifId: (parent, args, contextValue, info) => {
    return speciesProvider.getSpeciesByGbifId(args.gbifId);
  },
  speciesByINaturalistId: (parent, args, contextValue, info) => {
    return speciesProvider.getSpeciesByINaturalistId(args.inaturalistId);
  },
};
