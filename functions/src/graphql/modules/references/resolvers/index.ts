import { ReferencesModule } from "../generated-types/module-types";
import {MutationResolver} from "./mutation.resolver";
import {QueryResolver} from "./query.resolver";
import {DateTimeResolver} from "graphql-scalars";
import { ReferenceResolver } from "./reference.resolver";

export const ReferencesResolvers: ReferencesModule.Resolvers = {
    Mutation: MutationResolver,
    Query: QueryResolver,
    DateTime: DateTimeResolver,
    Reference: ReferenceResolver,
};
