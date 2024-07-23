import { MofModule } from "../generated-types/module-types";
import { VariableWithDataResolver } from "./mof.resolver";
import { MutationResolver } from "./mutation.resolver";
import { QueryResolver } from "./query.resolver";
import { DateTimeResolver } from "graphql-scalars";

export const MofResolvers: MofModule.Resolvers = {
  Mutation: MutationResolver,
  Query: QueryResolver,
  DateTime: DateTimeResolver,
  VariableWithData: VariableWithDataResolver
};
