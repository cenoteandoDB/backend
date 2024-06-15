import {VariablesModule} from "../generated-types/module-types";
import {MutationResolver} from "./mutation.resolver";
import {QueryResolver} from "./query.resolver";
import {DateTimeResolver} from "graphql-scalars";

export const VariableResolvers: VariablesModule.Resolvers = {
    Mutation: MutationResolver,
    Query: QueryResolver,
    DateTime: DateTimeResolver,
};
