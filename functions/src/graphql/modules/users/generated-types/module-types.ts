/* eslint-disable */
import * as Types from "../../../generated-types/graphql";
import * as gm from "graphql-modules";
export namespace UsersModule {
  interface DefinedFields {
    Mutation: 'register' | 'updateEmail';
    Query: 'users' | 'userById';
    User: 'id' | 'name' | 'email' | 'role';
  };
  
  interface DefinedEnumValues {
    UserRole: 'BASIC' | 'CENOTERO_ADVANCED' | 'ADMIN';
  };
  
  interface DefinedInputFields {
    RegisterInput: 'name' | 'email' | 'password';
  };
  
  export type RegisterInput = Pick<Types.RegisterInput, DefinedInputFields['RegisterInput']>;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  export type User = Pick<Types.User, DefinedFields['User']>;
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type UserRole = DefinedEnumValues['UserRole'];
  
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
      register?: gm.Middleware[];
      updateEmail?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      users?: gm.Middleware[];
      userById?: gm.Middleware[];
    };
    User?: {
      '*'?: gm.Middleware[];
      id?: gm.Middleware[];
      name?: gm.Middleware[];
      email?: gm.Middleware[];
      role?: gm.Middleware[];
    };
  };
}