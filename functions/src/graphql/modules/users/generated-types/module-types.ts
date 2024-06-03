/* eslint-disable */
import * as Types from "../../../generated-types/graphql";
import * as gm from "graphql-modules";
export namespace UsersModule {
  interface DefinedFields {
    Mutation: 'login' | 'inviteUser' | 'register' | 'updateUserInfo' | 'updateCenotePermissions' | 'updateVariablePermissions' | 'deleteUser';
    Query: 'getUsers' | 'getUserById' | 'getUserByEmail' | 'getUserByName' | 'verifyCode';
    Teacher: 'school' | 'subject';
    Student: 'school' | 'degree';
    Govern: 'type' | 'institution';
    Investigator: 'googleScholar' | 'orchid' | 'researchGate' | 'linkedin';
    User: 'id' | 'name' | 'surname' | 'email' | 'password' | 'role' | 'profile' | 'profileData' | 'cenoteViewWhiteList' | 'cenoteViewBlackList' | 'cenoteEditWhiteList' | 'cenoteEditBlackList' | 'variableViewWhiteList' | 'variableViewBlackList' | 'variableEditWhiteList' | 'variableEditBlackList' | 'createdAt' | 'updatedAt';
  };
  
  interface DefinedEnumValues {
    SortOrder: 'ASC' | 'DESC';
    UserRole: 'BASIC' | 'CURATOR' | 'ADMIN';
    UserProfile: 'TEACHER' | 'STUDENT' | 'GOVERN' | 'INVESTIGATOR';
    GovernType: 'FEDERAL' | 'STATE' | 'MUNICIPAL';
  };
  
  interface DefinedInputFields {
    RegisterUserInput: 'name' | 'surname' | 'email' | 'password' | 'role' | 'phone';
    UpdateUserInfoInput: 'name' | 'surname' | 'email' | 'role';
    UpdateCenotePermissions: 'cenoteViewWhiteList' | 'cenoteViewBlackList' | 'cenoteEditWhiteList' | 'cenoteEditBlackList';
    UpdateVariablePermissions: 'variableViewWhiteList' | 'variableViewBlackList' | 'variableEditWhiteList' | 'variableEditBlackList';
    SortField: 'field' | 'sortOrder';
    PaginationInput: 'offset' | 'limit';
  };
  
  export type RegisterUserInput = Pick<Types.RegisterUserInput, DefinedInputFields['RegisterUserInput']>;
  export type UserRole = DefinedEnumValues['UserRole'];
  export type UpdateUserInfoInput = Pick<Types.UpdateUserInfoInput, DefinedInputFields['UpdateUserInfoInput']>;
  export type UpdateCenotePermissions = Pick<Types.UpdateCenotePermissions, DefinedInputFields['UpdateCenotePermissions']>;
  export type UpdateVariablePermissions = Pick<Types.UpdateVariablePermissions, DefinedInputFields['UpdateVariablePermissions']>;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  export type User = Pick<Types.User, DefinedFields['User']>;
  export type SortOrder = DefinedEnumValues['SortOrder'];
  export type SortField = Pick<Types.SortField, DefinedInputFields['SortField']>;
  export type PaginationInput = Pick<Types.PaginationInput, DefinedInputFields['PaginationInput']>;
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type UserProfile = DefinedEnumValues['UserProfile'];
  export type Teacher = Pick<Types.Teacher, DefinedFields['Teacher']>;
  export type Student = Pick<Types.Student, DefinedFields['Student']>;
  export type GovernType = DefinedEnumValues['GovernType'];
  export type Govern = Pick<Types.Govern, DefinedFields['Govern']>;
  export type Investigator = Pick<Types.Investigator, DefinedFields['Investigator']>;
  export type Profile = Types.Profile;
  
  export type Scalars = Pick<Types.Scalars, 'EmailAddress' | 'DateTime'>;
  export type EmailAddressScalarConfig = Types.EmailAddressScalarConfig;
  export type DateTimeScalarConfig = Types.DateTimeScalarConfig;
  
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  export type TeacherResolvers = Pick<Types.TeacherResolvers, DefinedFields['Teacher'] | '__isTypeOf'>;
  export type StudentResolvers = Pick<Types.StudentResolvers, DefinedFields['Student'] | '__isTypeOf'>;
  export type GovernResolvers = Pick<Types.GovernResolvers, DefinedFields['Govern'] | '__isTypeOf'>;
  export type InvestigatorResolvers = Pick<Types.InvestigatorResolvers, DefinedFields['Investigator'] | '__isTypeOf'>;
  export type UserResolvers = Pick<Types.UserResolvers, DefinedFields['User'] | '__isTypeOf'>;
  
  export interface Resolvers {
    Mutation?: MutationResolvers;
    Query?: QueryResolvers;
    Teacher?: TeacherResolvers;
    Student?: StudentResolvers;
    Govern?: GovernResolvers;
    Investigator?: InvestigatorResolvers;
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
      register?: gm.Middleware[];
      updateUserInfo?: gm.Middleware[];
      updateCenotePermissions?: gm.Middleware[];
      updateVariablePermissions?: gm.Middleware[];
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
    Teacher?: {
      '*'?: gm.Middleware[];
      school?: gm.Middleware[];
      subject?: gm.Middleware[];
    };
    Student?: {
      '*'?: gm.Middleware[];
      school?: gm.Middleware[];
      degree?: gm.Middleware[];
    };
    Govern?: {
      '*'?: gm.Middleware[];
      type?: gm.Middleware[];
      institution?: gm.Middleware[];
    };
    Investigator?: {
      '*'?: gm.Middleware[];
      googleScholar?: gm.Middleware[];
      orchid?: gm.Middleware[];
      researchGate?: gm.Middleware[];
      linkedin?: gm.Middleware[];
    };
    User?: {
      '*'?: gm.Middleware[];
      id?: gm.Middleware[];
      name?: gm.Middleware[];
      surname?: gm.Middleware[];
      email?: gm.Middleware[];
      password?: gm.Middleware[];
      role?: gm.Middleware[];
      profile?: gm.Middleware[];
      profileData?: gm.Middleware[];
      cenoteViewWhiteList?: gm.Middleware[];
      cenoteViewBlackList?: gm.Middleware[];
      cenoteEditWhiteList?: gm.Middleware[];
      cenoteEditBlackList?: gm.Middleware[];
      variableViewWhiteList?: gm.Middleware[];
      variableViewBlackList?: gm.Middleware[];
      variableEditWhiteList?: gm.Middleware[];
      variableEditBlackList?: gm.Middleware[];
      createdAt?: gm.Middleware[];
      updatedAt?: gm.Middleware[];
    };
  };
}