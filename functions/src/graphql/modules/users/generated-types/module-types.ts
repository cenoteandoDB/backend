/* eslint-disable */
import * as Types from "../../../generated-types/graphql";
import * as gm from "graphql-modules";
export namespace UsersModule {
  interface DefinedFields {
    Mutation: 'login' | 'inviteUser' | 'saveUser' | 'updateUserInfo' | 'deleteUser';
    Query: 'getUsers' | 'getUserById' | 'getUserByEmail' | 'getUserByName' | 'verifyCode';
    User: 'id' | 'name' | 'surname' | 'email' | 'role' | 'tags' | 'password' | 'createdAt' | 'updatedAt';
  };
  
  interface DefinedEnumValues {
    SortOrder: 'ASC' | 'DESC';
    UserRole: 'BASIC' | 'CENOTERO_ADVANCED' | 'ADMIN';
  };
  
  interface DefinedInputFields {
    Permission: 'id' | 'edit' | 'delete';
    PermissionsInput: 'name' | 'surname' | 'email' | 'password' | 'phoneNumber' | 'tags' | 'companyName' | 'companyWeb';
    UpdateUserInfoInput: 'name' | 'surname' | 'email' | 'password' | 'role' | 'phone';
    SortField: 'field' | 'sortOrder';
    PaginationInput: 'offset' | 'limit';
  };
  
  export type Permission = Pick<Types.Permission, DefinedInputFields['Permission']>;
  export type PermissionsInput = Pick<Types.PermissionsInput, DefinedInputFields['PermissionsInput']>;
  export type UpdateUserInfoInput = Pick<Types.UpdateUserInfoInput, DefinedInputFields['UpdateUserInfoInput']>;
  export type UserRole = DefinedEnumValues['UserRole'];
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  export type User = Pick<Types.User, DefinedFields['User']>;
  export type SortOrder = DefinedEnumValues['SortOrder'];
  export type SortField = Pick<Types.SortField, DefinedInputFields['SortField']>;
  export type PaginationInput = Pick<Types.PaginationInput, DefinedInputFields['PaginationInput']>;
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  
  export type Scalars = Pick<Types.Scalars, 'EmailAddress' | 'DateTime'>;
  export type EmailAddressScalarConfig = Types.EmailAddressScalarConfig;
  export type DateTimeScalarConfig = Types.DateTimeScalarConfig;
  
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  export type UserResolvers = Pick<Types.UserResolvers, DefinedFields['User'] | '__isTypeOf'>;
  
  export interface Resolvers {
    Mutation?: MutationResolvers;
    Query?: QueryResolvers;
    User?: UserResolvers;
    EmailAddress?: Types.Resolvers['EmailAddress'];
    DateTime?: Types.Resolvers['DateTime'];
  };
  
  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    Mutation?: {
      '*'?: gm.Middleware[];
      login?: gm.Middleware[];
      inviteUser?: gm.Middleware[];
      saveUser?: gm.Middleware[];
      updateUserInfo?: gm.Middleware[];
      deleteUser?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      getUsers?: gm.Middleware[];
      getUserById?: gm.Middleware[];
      getUserByEmail?: gm.Middleware[];
      getUserByName?: gm.Middleware[];
      verifyCode?: gm.Middleware[];
    };
    User?: {
      '*'?: gm.Middleware[];
      id?: gm.Middleware[];
      name?: gm.Middleware[];
      surname?: gm.Middleware[];
      email?: gm.Middleware[];
      role?: gm.Middleware[];
      tags?: gm.Middleware[];
      password?: gm.Middleware[];
      createdAt?: gm.Middleware[];
      updatedAt?: gm.Middleware[];
    };
  };
}