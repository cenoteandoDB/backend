import {SpeciesModule} from "../generated-types/module-types";

export const QueryResolver: SpeciesModule.Resolvers["Query"] = {
    species: () => [],
    speciesById: (parent, args, contextValue, info) => {
        return {
            id: args.id,
            aphiaId: "exampleAphiaId",
            iNaturalistId: "exampleINaturalistId",
        };
    },
    speciesByAphiaId: (parent, args, contextValue, info) => {
        return {
            id: "1",
            aphiaId: "exampleAphiaId",
            iNaturalistId: "exampleINaturalistId",
        };
    },
    speciesByINaturalistId: (parent, args, contextValue, info) => {
        return {
            id: "1",
            aphiaId: "exampleAphiaId",
            iNaturalistId: "exampleINaturalistId",
        };
    },
    speciesCsv: () => "",
};
