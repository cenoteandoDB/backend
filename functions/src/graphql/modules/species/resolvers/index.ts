import { SpeciesModule } from "../generated-types/module-types";
import { QueryResolver } from "./query.resolver";
import { DateTimeResolver } from "graphql-scalars";

export const SpeciesResolvers: SpeciesModule.Resolvers = {
  Query: QueryResolver,
  DateTime: DateTimeResolver,
};
