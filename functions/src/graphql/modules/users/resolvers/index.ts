import { UsersModule } from "../generated-types/module-types";
import { MutationResolver } from "./mutation.resolver";
import { QueryResolver } from "./query.resolver";
import { EmailAddressResolver } from "graphql-scalars";
import { UserResolver } from "./user.resolver";

export const UsersResolvers: UsersModule.Resolvers = {
  Mutation: MutationResolver,
  Query: QueryResolver,
  EmailAddress: EmailAddressResolver,
  User: UserResolver,
};
