import { AuthorizationModule } from "../generated-types/module-types";
import { MutationResolver } from "./mutation.resolver";
import { QueryResolver } from "./query.resolver";

export const AuthorizationResolvers: AuthorizationModule.Resolvers = {
  Mutation: MutationResolver,
  Query: QueryResolver,
};
