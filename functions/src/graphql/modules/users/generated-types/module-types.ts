/* eslint-disable */
import * as Types from "../../../generated-types/graphql";
import * as gm from "graphql-modules";
export namespace UsersModule {
  interface DefinedFields {
    Mutation: 'login' | 'inviteUser' | 'register' | 'registerTourist' | 'registerStudent' | 'registerTeacher' | 'registerInvestigator' | 'registerGovern' | 'updateUserInfo' | 'updateCenotePermissions' | 'updateVariablePermissions' | 'deleteUser';
    Query: 'getUsers' | 'getUserById' | 'getUserByEmail' | 'getUserByName' | 'verifyCode';
    ProfileData: 'companyName' | 'companyUrl' | 'school' | 'degree' | 'subject' | 'googleScholar' | 'orchid' | 'researchGate' | 'linkedin' | 'govern_type' | 'govern_institution';
    User: 'id' | 'name' | 'surname' | 'email' | 'password' | 'role' | 'profile' | 'profileData' | 'cenoteViewWhiteList' | 'cenoteViewBlackList' | 'cenoteEditWhiteList' | 'cenoteEditBlackList' | 'variableViewWhiteList' | 'variableViewBlackList' | 'variableEditWhiteList' | 'variableEditBlackList' | 'createdAt' | 'updatedAt';
  };
  
  interface DefinedEnumValues {
    SortOrder: 'ASC' | 'DESC';
    UserRole: 'BASIC' | 'CURATOR' | 'ADMIN';
    UserProfile: 'TOURIST' | 'TEACHER' | 'STUDENT' | 'GOVERN' | 'INVESTIGATOR';
    GovernType: 'FEDERAL' | 'STATE' | 'MUNICIPAL';
  };
  
  interface DefinedInputFields {
    RegisterUserInput: 'name' | 'surname' | 'email' | 'password' | 'phone';
    UpdateUserInfoInput: 'name' | 'surname' | 'email' | 'password' | 'phone' | 'role';
    UpdateCenotePermissions: 'cenoteViewWhiteList' | 'cenoteViewBlackList' | 'cenoteEditWhiteList' | 'cenoteEditBlackList';
    UpdateVariablePermissions: 'variableViewWhiteList' | 'variableViewBlackList' | 'variableEditWhiteList' | 'variableEditBlackList';
    RegisterTouristInput: 'companyName' | 'companyUrl';
    RegisterStudentInput: 'school' | 'degree';
    RegisterInvestigatorInput: 'googleScholar' | 'orchid' | 'researchGate' | 'linkedin';
    RegisterGovernInput: 'govern' | 'institution';
    SortField: 'field' | 'sortOrder';
    PaginationInput: 'offset' | 'limit';
  };
  
  export type RegisterUserInput = Pick<Types.RegisterUserInput, DefinedInputFields['RegisterUserInput']>;
  export type UpdateUserInfoInput = Pick<Types.UpdateUserInfoInput, DefinedInputFields['UpdateUserInfoInput']>;
  export type UserRole = DefinedEnumValues['UserRole'];
  export type UpdateCenotePermissions = Pick<Types.UpdateCenotePermissions, DefinedInputFields['UpdateCenotePermissions']>;
  export type UpdateVariablePermissions = Pick<Types.UpdateVariablePermissions, DefinedInputFields['UpdateVariablePermissions']>;
  export type RegisterTouristInput = Pick<Types.RegisterTouristInput, DefinedInputFields['RegisterTouristInput']>;
  export type RegisterStudentInput = Pick<Types.RegisterStudentInput, DefinedInputFields['RegisterStudentInput']>;
  export type RegisterInvestigatorInput = Pick<Types.RegisterInvestigatorInput, DefinedInputFields['RegisterInvestigatorInput']>;
  export type RegisterGovernInput = Pick<Types.RegisterGovernInput, DefinedInputFields['RegisterGovernInput']>;
  export type GovernType = DefinedEnumValues['GovernType'];
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  export type User = Pick<Types.User, DefinedFields['User']>;
  export type SortOrder = DefinedEnumValues['SortOrder'];
  export type SortField = Pick<Types.SortField, DefinedInputFields['SortField']>;
  export type PaginationInput = Pick<Types.PaginationInput, DefinedInputFields['PaginationInput']>;
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type UserProfile = DefinedEnumValues['UserProfile'];
  export type ProfileData = Pick<Types.ProfileData, DefinedFields['ProfileData']>;
  
  export type Scalars = Pick<Types.Scalars, 'EmailAddress' | 'DateTime'>;
  export type EmailAddressScalarConfig = Types.EmailAddressScalarConfig;
  export type DateTimeScalarConfig = Types.DateTimeScalarConfig;
  
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  export type ProfileDataResolvers = Pick<Types.ProfileDataResolvers, DefinedFields['ProfileData'] | '__isTypeOf'>;
  export type UserResolvers = Pick<Types.UserResolvers, DefinedFields['User'] | '__isTypeOf'>;
  
  export interface Resolvers {
    Mutation?: MutationResolvers;
    Query?: QueryResolvers;
    ProfileData?: ProfileDataResolvers;
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
      registerTourist?: gm.Middleware[];
      registerStudent?: gm.Middleware[];
      registerTeacher?: gm.Middleware[];
      registerInvestigator?: gm.Middleware[];
      registerGovern?: gm.Middleware[];
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
    ProfileData?: {
      '*'?: gm.Middleware[];
      companyName?: gm.Middleware[];
      companyUrl?: gm.Middleware[];
      school?: gm.Middleware[];
      degree?: gm.Middleware[];
      subject?: gm.Middleware[];
      googleScholar?: gm.Middleware[];
      orchid?: gm.Middleware[];
      researchGate?: gm.Middleware[];
      linkedin?: gm.Middleware[];
      govern_type?: gm.Middleware[];
      govern_institution?: gm.Middleware[];
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