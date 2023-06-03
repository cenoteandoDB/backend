import {SpeciesModule} from "../generated-types/module-types";
import { SpeciesProvider } from "../providers/species.provider";

export const QueryResolver: SpeciesModule.Resolvers["Query"] = {
    species: () => {
        return SpeciesProvider.getSpecies()
    },
    speciesById: (parent, args, contextValue, info) => {
        return SpeciesProvider.getSpeciesById(args.id);
    },
    speciesByAphiaId: (parent, args, contextValue, info) => {
        return SpeciesProvider.getSpeciesById(args.aphiaId);
    },
    speciesByINaturalistId: (parent, args, contextValue, info) => {
        return SpeciesProvider.getSpeciesById(args.iNaturalist);
    },
    speciesCsv: () => "",
};
