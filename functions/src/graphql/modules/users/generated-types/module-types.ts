/* eslint-disable */
import * as Types from "../../../generated-types/graphql";
import * as gm from "graphql-modules";
export namespace UsersModule {
  interface DefinedFields {
    Mutation: 'updateEmail';
    Query: 'user';
    User: 'id' | 'email';
  };
  
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  export type User = Pick<Types.User, DefinedFields['User']>;
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  
  export type Scalars = Pick<Types.Scalars, 'EmailAddress'>;
  export type EmailAddressScalarConfig = Types.EmailAddressScalarConfig;
  
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  export type UserResolvers = Pick<Types.UserResolvers, DefinedFields['User'] | '__isTypeOf'>;
  
  export interface Resolvers {
    Mutation?: MutationResolvers;
    Query?: QueryResolvers;
    User?: UserResolvers;
    EmailAddress?: Types.Resolvers['EmailAddress'];
  };
  
  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    Mutation?: {
      '*'?: gm.Middleware[];
      updateEmail?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      user?: gm.Middleware[];
    };
    User?: {
      '*'?: gm.Middleware[];
      id?: gm.Middleware[];
      email?: gm.Middleware[];
    };
  };
}