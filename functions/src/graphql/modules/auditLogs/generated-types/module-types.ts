/* eslint-disable */
import * as Types from "../../../generated-types/graphql";
import * as gm from "graphql-modules";
export namespace AuditLogsModule {
  interface DefinedFields {
    AuditLog: 'objectId' | 'type' | 'arguments' | 'timestamp';
    Query: 'auditLogs';
  };
  
  interface DefinedEnumValues {
    AuditLogType: 'NEW_CENOTE' | 'UPDATED_CENOTE' | 'DELETE_CENOTE' | 'NEW_REFERENCE' | 'UPDATED_REFERENCE' | 'DELETE_REFERENCE' | 'NEW_VARIABLE' | 'UPDATED_VARIABLE' | 'DELETE_VARIABLE';
  };
  
  export type AuditLogType = DefinedEnumValues['AuditLogType'];
  export type AuditLog = Pick<Types.AuditLog, DefinedFields['AuditLog']>;
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  
  export type Scalars = Pick<Types.Scalars, 'DateTime' | 'JSON'>;
  export type DateTimeScalarConfig = Types.DateTimeScalarConfig;
  export type JsonScalarConfig = Types.JsonScalarConfig;
  
  export type AuditLogResolvers = Pick<Types.AuditLogResolvers, DefinedFields['AuditLog'] | '__isTypeOf'>;
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  
  export interface Resolvers {
    AuditLog?: AuditLogResolvers;
    Query?: QueryResolvers;
    DateTime?: Types.Resolvers['DateTime'];
    JSON?: Types.Resolvers['JSON'];
  };
  
  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    AuditLog?: {
      '*'?: gm.Middleware[];
      objectId?: gm.Middleware[];
      type?: gm.Middleware[];
      arguments?: gm.Middleware[];
      timestamp?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      auditLogs?: gm.Middleware[];
    };
  };
}