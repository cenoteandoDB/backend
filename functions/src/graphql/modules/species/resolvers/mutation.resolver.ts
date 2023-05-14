import { SpeciesModule } from "../generated-types/module-types";

// TODO: Implement this
export const MutationResolver: SpeciesModule.Resolvers["Mutation"] = {
    createSpecies: (parent, args, contextValue, info) => {
        return {
            id: "id"
        };
    },
    updateSpecies: (parent, args, contextValue, info) => {
        return {
            id: "id",
        };
    },
};
