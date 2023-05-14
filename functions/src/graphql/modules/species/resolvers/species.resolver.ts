import {SpeciesModule} from "../generated-types/module-types";

export const SpeciesResolvers: SpeciesModule.Resolvers["Species"] = {
    id: (parent, args, contextValue, info) => parent.id,
    aphiaId: (parent, args, contextValue, info) => parent.id,
    iNaturalistId: (parent, args, contextValue, info) => parent.id,
    createdAt: (parent, args, contextValue, info) => parent.id,
    updatedAt: (parent, args, contextValue, info) => parent.id,
};
