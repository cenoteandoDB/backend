/* eslint-disable */
import * as Types from "../../../generated-types/graphql";
import * as gm from "graphql-modules";
export namespace VariablesModule {
  interface DefinedFields {
    Mutation: 'createVariable' | 'updateVariable';
    Query: 'variables' | 'variableById' | 'variablesByTheme';
    Variable: 'firestore_id' | 'short_name' | 'name' | 'description' | 'type' | 'units' | 'enumValues' | 'timeseries' | 'multiple' | 'accessLevel' | 'theme' | 'origin' | 'methodology' | 'cenote_count' | 'createdAt' | 'updatedAt';
  };
  
  interface DefinedEnumValues {
    AccessLevel: 'PUBLIC' | 'PRIVATE' | 'SENSITIVE';
    VariableTheme: 'LOCATION' | 'GEOREFERENCE' | 'CULTURAL' | 'GEOMORPHOLOGY' | 'BIODIVERSITY' | 'DISTURBANCE' | 'TOURISM' | 'DIVING' | 'ORGANIZATION' | 'REGULATION' | 'WATER';
    VariableType: 'TEXT' | 'BOOLEAN' | 'ENUM' | 'JSON' | 'UNITLESS_NUMBER' | 'NUMBER_WITH_UNITS' | 'DATETIME' | 'DATE' | 'TIME';
    VariableOrigin: 'FIELD' | 'OFFICE' | 'BOTH';
  };
  
  interface DefinedInputFields {
    NewVariableInput: 'name' | 'description' | 'type' | 'units' | 'enumValues' | 'timeseries' | 'multiple' | 'accessLevel' | 'theme' | 'origin' | 'methodology';
    UpdateVariableInput: 'firestore_id' | 'name' | 'description' | 'type' | 'units' | 'enumValues' | 'timeseries' | 'multiple' | 'accessLevel' | 'theme' | 'origin' | 'methodology';
  };
  
  export type NewVariableInput = Pick<Types.NewVariableInput, DefinedInputFields['NewVariableInput']>;
  export type VariableType = DefinedEnumValues['VariableType'];
  export type AccessLevel = DefinedEnumValues['AccessLevel'];
  export type VariableTheme = DefinedEnumValues['VariableTheme'];
  export type VariableOrigin = DefinedEnumValues['VariableOrigin'];
  export type UpdateVariableInput = Pick<Types.UpdateVariableInput, DefinedInputFields['UpdateVariableInput']>;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  export type Variable = Pick<Types.Variable, DefinedFields['Variable']>;
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  
  export type Scalars = Pick<Types.Scalars, 'DateTime'>;
  export type DateTimeScalarConfig = Types.DateTimeScalarConfig;
  
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  export type VariableResolvers = Pick<Types.VariableResolvers, DefinedFields['Variable'] | '__isTypeOf'>;
  
  export interface Resolvers {
    Mutation?: MutationResolvers;
    Query?: QueryResolvers;
    Variable?: VariableResolvers;
    DateTime?: Types.Resolvers['DateTime'];
  };
  
  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    Mutation?: {
      '*'?: gm.Middleware[];
      createVariable?: gm.Middleware[];
      updateVariable?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      variables?: gm.Middleware[];
      variableById?: gm.Middleware[];
      variablesByTheme?: gm.Middleware[];
    };
    Variable?: {
      '*'?: gm.Middleware[];
      firestore_id?: gm.Middleware[];
      short_name?: gm.Middleware[];
      name?: gm.Middleware[];
      description?: gm.Middleware[];
      type?: gm.Middleware[];
      units?: gm.Middleware[];
      enumValues?: gm.Middleware[];
      timeseries?: gm.Middleware[];
      multiple?: gm.Middleware[];
      accessLevel?: gm.Middleware[];
      theme?: gm.Middleware[];
      origin?: gm.Middleware[];
      methodology?: gm.Middleware[];
      cenote_count?: gm.Middleware[];
      createdAt?: gm.Middleware[];
      updatedAt?: gm.Middleware[];
    };
  };
}