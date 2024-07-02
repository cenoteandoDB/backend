import { FavoriteCenotesModule } from "../generated-types/module-types";
import { MutationResolver } from "./mutation.resolver";
import { QueryResolver } from "./query.resolver";
import {DateTimeResolver} from "graphql-scalars";

export const FavoriteCenotesResolver: FavoriteCenotesModule.Resolvers = {
  Mutation: MutationResolver,
  Query: QueryResolver,
  DateTime: DateTimeResolver
};
