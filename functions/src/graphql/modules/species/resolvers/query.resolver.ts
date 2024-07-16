import { SpeciesModule } from "../generated-types/module-types";
import { SpeciesProvider } from "../providers/species.provider";

const speciesProvider = new SpeciesProvider();

export const QueryResolver: SpeciesModule.Resolvers["Query"] = {
  getSpecies: (parent, args, contextValue, info) => {
    return speciesProvider.getSpecies(args.sort, args.pagination, args.name);
  },
  getSpeciesById: (parent, args, contextValue, info) => {
    return speciesProvider.getSpeciesById(args.id);
  },
  getSpeciesByGbifId: (parent, args, contextValue, info) => {
    return speciesProvider.getSpeciesByGbifId(args.gbifId);
  },
  getSpeciesByINaturalistId: (parent, args, contextValue, info) => {
    return speciesProvider.getSpeciesByINaturalistId(args.inaturalistId);
  },
};
