/* eslint-disable */
import * as Types from "../../../generated-types/graphql";
import * as gm from "graphql-modules";
export namespace AuthorizationModule {
  interface DefinedFields {
    Mutation: 'updatePermissionsCenote' | 'updatePermissionsVariable';
    Permission: 'firestoreId' | 'type' | 'canView' | 'canEdit' | 'canDelete' | 'createdAt' | 'updatedAt';
    Query: 'getPermissions';
  };
  
  interface DefinedEnumValues {
    PermissionType: 'STATE' | 'MUNICIPALITY' | 'CENOTE' | 'SPHERE' | 'THEME' | 'CATEGORY' | 'VARIABLE';
  };
  
  interface DefinedInputFields {
    StatePermissionInput: 'name' | 'canView' | 'canEdit' | 'canDelete';
    MunicipalityPermissionInput: 'name' | 'canView' | 'canEdit' | 'canDelete';
    CenotePermissionInput: 'cenoteId' | 'canView' | 'canEdit' | 'canDelete';
    CenotesPermissionInput: 'userId' | 'states' | 'municipalities' | 'cenotes';
    SpherePermissionInput: 'name' | 'canView' | 'canEdit' | 'canDelete';
    ThemePermissionInput: 'name' | 'canView' | 'canEdit' | 'canDelete';
    CategoryPermissionInput: 'name' | 'canView' | 'canEdit' | 'canDelete';
    VariablePermissionInput: 'variableId' | 'canView' | 'canEdit' | 'canDelete' | 'userId' | 'cenoteId' | 'spheres' | 'themes' | 'categories' | 'variables';
  };
  
  export type StatePermissionInput = Pick<Types.StatePermissionInput, DefinedInputFields['StatePermissionInput']>;
  export type MunicipalityPermissionInput = Pick<Types.MunicipalityPermissionInput, DefinedInputFields['MunicipalityPermissionInput']>;
  export type CenotePermissionInput = Pick<Types.CenotePermissionInput, DefinedInputFields['CenotePermissionInput']>;
  export type CenotesPermissionInput = Pick<Types.CenotesPermissionInput, DefinedInputFields['CenotesPermissionInput']>;
  export type SpherePermissionInput = Pick<Types.SpherePermissionInput, DefinedInputFields['SpherePermissionInput']>;
  export type ThemePermissionInput = Pick<Types.ThemePermissionInput, DefinedInputFields['ThemePermissionInput']>;
  export type CategoryPermissionInput = Pick<Types.CategoryPermissionInput, DefinedInputFields['CategoryPermissionInput']>;
  export type VariablePermissionInput = Pick<Types.VariablePermissionInput, DefinedInputFields['VariablePermissionInput']>;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  export type PermissionType = DefinedEnumValues['PermissionType'];
  export type Permission = Pick<Types.Permission, DefinedFields['Permission']>;
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  
  export type Scalars = Pick<Types.Scalars, 'EmailAddress' | 'DateTime'>;
  export type EmailAddressScalarConfig = Types.EmailAddressScalarConfig;
  export type DateTimeScalarConfig = Types.DateTimeScalarConfig;
  
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  export type PermissionResolvers = Pick<Types.PermissionResolvers, DefinedFields['Permission'] | '__isTypeOf'>;
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  
  export interface Resolvers {
    Mutation?: MutationResolvers;
    Permission?: PermissionResolvers;
    Query?: QueryResolvers;
    EmailAddress?: Types.Resolvers['EmailAddress'];
    DateTime?: Types.Resolvers['DateTime'];
  };
  
  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    Mutation?: {
      '*'?: gm.Middleware[];
      updatePermissionsCenote?: gm.Middleware[];
      updatePermissionsVariable?: gm.Middleware[];
    };
    Permission?: {
      '*'?: gm.Middleware[];
      firestoreId?: gm.Middleware[];
      type?: gm.Middleware[];
      canView?: gm.Middleware[];
      canEdit?: gm.Middleware[];
      canDelete?: gm.Middleware[];
      createdAt?: gm.Middleware[];
      updatedAt?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      getPermissions?: gm.Middleware[];
    };
  };
}