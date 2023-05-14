import  { SpeciesModule } from "../generated-types/module-types";
import { MutationResolver } from "./mutation.resolver";
import { QueryResolver } from "./query.resolver";
// import {CenoteResolver} from "./cenote.resolver";
import { DateTimeResolver } from "graphql-scalars";

export const SpeciesResolvers: SpeciesModule.Resolvers = {
    Mutation: MutationResolver,
    Query: QueryResolver,
    DateTime: DateTimeResolver
};
