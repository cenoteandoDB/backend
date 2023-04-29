import {UsersModule} from "../generated-types/module-types";
import {MutationResolver} from "./mutation.resolver";
import {QueryResolver} from "./query.resolver";
import {UserResolver} from "./user.resolver";
import {EmailAddressResolver} from "graphql-scalars";

export const UsersResolvers: UsersModule.Resolvers = {
    Mutation: MutationResolver,
    Query: QueryResolver,
    User: UserResolver,
    EmailAddress: EmailAddressResolver,
};
