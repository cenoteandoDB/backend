import { SpeciesModule } from "../generated-types/module-types";
import { SpeciesProvider } from "../providers/species.provider";

export const MutationResolver: SpeciesModule.Resolvers["Mutation"] = {
  createSpecies: (parent, args, contextValue, info) => {
    return SpeciesProvider.createSpecies(args.new_species);
  },
  updateSpecies: (parent, args, contextValue, info) => {
    return SpeciesProvider.updateSpecies(args.updated_species);
  },
};
