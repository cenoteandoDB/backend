/* eslint-disable */
import * as Types from "../../../generated-types/graphql";
import * as gm from "graphql-modules";
export namespace AuthorizationModule {
  interface DefinedFields {
    Mutation: 'updatePermissionsCenote' | 'updatePermissionsVariable';
    CenotePermission: 'permissionType' | 'cenoteId' | 'canView' | 'canEdit' | 'canDelete';
    VariablePermission: 'permissionType' | 'variableId' | 'canView' | 'canEdit' | 'canDelete';
    Query: 'getVariablePermissions' | 'getAllVariablesPermissions' | 'getCenotePermissions' | 'getAllCenotesPermissions';
  };
  
  interface DefinedEnumValues {
    PermissionType: 'CENOTE' | 'VARIABLE';
  };
  
  interface DefinedInputFields {
    CenotePermissionInfo: 'cenoteId' | 'canView' | 'canEdit' | 'canDelete';
    CenotesPermissionInput: 'userId' | 'cenotes';
    VariablePermissionInfo: 'variableId' | 'canView' | 'canEdit' | 'canDelete';
    VariablePermissionInput: 'userId' | 'cenoteId' | 'variables';
  };
  
  export type CenotePermissionInfo = Pick<Types.CenotePermissionInfo, DefinedInputFields['CenotePermissionInfo']>;
  export type CenotesPermissionInput = Pick<Types.CenotesPermissionInput, DefinedInputFields['CenotesPermissionInput']>;
  export type VariablePermissionInfo = Pick<Types.VariablePermissionInfo, DefinedInputFields['VariablePermissionInfo']>;
  export type VariablePermissionInput = Pick<Types.VariablePermissionInput, DefinedInputFields['VariablePermissionInput']>;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  export type PermissionType = DefinedEnumValues['PermissionType'];
  export type UserPermission = Types.UserPermission;
  export type CenotePermission = Pick<Types.CenotePermission, DefinedFields['CenotePermission']>;
  export type VariablePermission = Pick<Types.VariablePermission, DefinedFields['VariablePermission']>;
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  export type CenotePermissionResolvers = Pick<Types.CenotePermissionResolvers, DefinedFields['CenotePermission'] | '__isTypeOf'>;
  export type VariablePermissionResolvers = Pick<Types.VariablePermissionResolvers, DefinedFields['VariablePermission'] | '__isTypeOf'>;
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  
  export interface Resolvers {
    Mutation?: MutationResolvers;
    CenotePermission?: CenotePermissionResolvers;
    VariablePermission?: VariablePermissionResolvers;
    Query?: QueryResolvers;
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
    CenotePermission?: {
      '*'?: gm.Middleware[];
      permissionType?: gm.Middleware[];
      cenoteId?: gm.Middleware[];
      canView?: gm.Middleware[];
      canEdit?: gm.Middleware[];
      canDelete?: gm.Middleware[];
    };
    VariablePermission?: {
      '*'?: gm.Middleware[];
      permissionType?: gm.Middleware[];
      variableId?: gm.Middleware[];
      canView?: gm.Middleware[];
      canEdit?: gm.Middleware[];
      canDelete?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      getVariablePermissions?: gm.Middleware[];
      getAllVariablesPermissions?: gm.Middleware[];
      getCenotePermissions?: gm.Middleware[];
      getAllCenotesPermissions?: gm.Middleware[];
    };
  };
}