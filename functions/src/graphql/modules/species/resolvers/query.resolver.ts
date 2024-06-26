import {SpeciesModule} from "../generated-types/module-types";
import {SpeciesProvider} from "../providers/species.provider";

export const QueryResolver: SpeciesModule.Resolvers["Query"] = {
    species: () => {
        return SpeciesProvider.getSpecies();
    },
    speciesById: (parent, args, contextValue, info) => {
        return SpeciesProvider.getSpeciesById(args.id);
    },
    speciesByGBIFId: (parent, args, contextValue, info) => {
        return SpeciesProvider.getSpeciesByGBIFId(args.gbifId);
    },
    speciesByINaturalistId: (parent, args, contextValue, info) => {
        return SpeciesProvider.getSpeciesByINaturalistId(args.iNaturalistId);
    },
    speciesCsv: () => "",
    gbifSpeciesSuggestion: (parent, args, contextValue, info) => {
        return SpeciesProvider.getGBIFSpeciesSuggestions(args.q, args.rank);
    },
    iNaturalistSearch: (parent, args, contextValue, info) => {
        return SpeciesProvider.getINaturalistSearch(args.q, args.perPage);
    },
};
