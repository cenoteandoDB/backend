/* eslint-disable */
import * as Types from "../../../generated-types/graphql";
import * as gm from "graphql-modules";
export namespace VariablesModule {
  interface DefinedFields {
    Mutation: 'createVariable' | 'updateVariable' | 'deleteVariable';
    Query: 'getVariables' | 'getVariableById' | 'getVariablesByTheme';
    Variable: 'firestore_id' | 'name' | 'description' | 'type' | 'units' | 'methodology' | 'timeseries' | 'accessLevel' | 'origin' | 'theme' | 'sphere' | 'category' | 'icon' | 'variableRepresentation' | 'cenote_count' | 'createdAt' | 'updatedAt';
    VariableList: 'variables' | 'totalCount';
  };
  
  interface DefinedEnumValues {
    AccessLevel: 'PUBLIC' | 'SENSITIVE';
    VariableSphere: 'KARSTICO_AMBIENT_SYSTEM' | 'HUMAN_SOCIO_ECONOMICAL';
    VariableTheme: 'IDENTIFICATION' | 'GEOMORPHOLOGY' | 'BIODIVERSITY' | 'WATER' | 'REGULATION' | 'TOURISM' | 'ORGANIZATION' | 'CULTURAL';
    VariableType: 'NOMINAL' | 'CONTINUOUS' | 'DISCRETE' | 'ORDINAL';
    VariableOrigin: 'FIELD' | 'OFFICE' | 'WEB' | 'FIELD_WEB' | 'FIELD_OFFICE' | 'CALCULATED' | 'CALCULATED_OFFICE';
    VariableCategory: 'LOCATION' | 'LAND' | 'WATER' | 'GEOLOGY' | 'CLIMATE' | 'SPELEDIVING' | 'HIDROLOGY' | 'NUTRIENT' | 'HEAVY_METAL' | 'BIOMARKERS' | 'ORGANOCHLORINE_PESTICIDES' | 'ORGANOPHOSPHATE_PESTICIDES' | 'VOLATILE_HYDROCARBONS' | 'POLYNUCLEAR_AROMATIC_HYDROCARBONS' | 'FARMACEUTIC' | 'OTHER' | 'GOVERN' | 'CULTURE' | 'THREATS' | 'PROTECTION' | 'PROPERTY' | 'INFRASTRUCTURE' | 'ESSENTIAL' | 'BASIC' | 'ADDITIONAL' | 'SOCIAL';
    VariableRepresentation: 'ICON' | 'CHECK' | 'UNITS' | 'LIST' | 'TEXT';
  };
  
  interface DefinedInputFields {
    NewVariableInput: 'name' | 'description' | 'type' | 'accessLevel' | 'theme' | 'sphere' | 'category' | 'origin' | 'units' | 'methodology' | 'timeseries' | 'cenote_count';
    UpdateVariableInput: 'firestore_id' | 'name' | 'description' | 'type' | 'units' | 'accessLevel' | 'theme' | 'sphere' | 'category' | 'origin' | 'methodology' | 'timeseries' | 'cenote_count';
  };
  
  export type NewVariableInput = Pick<Types.NewVariableInput, DefinedInputFields['NewVariableInput']>;
  export type VariableType = DefinedEnumValues['VariableType'];
  export type AccessLevel = DefinedEnumValues['AccessLevel'];
  export type VariableTheme = DefinedEnumValues['VariableTheme'];
  export type VariableSphere = DefinedEnumValues['VariableSphere'];
  export type VariableCategory = DefinedEnumValues['VariableCategory'];
  export type VariableOrigin = DefinedEnumValues['VariableOrigin'];
  export type UpdateVariableInput = Pick<Types.UpdateVariableInput, DefinedInputFields['UpdateVariableInput']>;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  export type Variable = Pick<Types.Variable, DefinedFields['Variable']>;
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type VariableList = Pick<Types.VariableList, DefinedFields['VariableList']>;
  export type SortField = Types.SortField;
  export type PaginationInput = Types.PaginationInput;
  export type VariableRepresentation = DefinedEnumValues['VariableRepresentation'];
  
  export type Scalars = Pick<Types.Scalars, 'DateTime'>;
  export type DateTimeScalarConfig = Types.DateTimeScalarConfig;
  
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  export type VariableResolvers = Pick<Types.VariableResolvers, DefinedFields['Variable'] | '__isTypeOf'>;
  export type VariableListResolvers = Pick<Types.VariableListResolvers, DefinedFields['VariableList'] | '__isTypeOf'>;
  
  export interface Resolvers {
    Mutation?: MutationResolvers;
    Query?: QueryResolvers;
    Variable?: VariableResolvers;
    VariableList?: VariableListResolvers;
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
      deleteVariable?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      getVariables?: gm.Middleware[];
      getVariableById?: gm.Middleware[];
      getVariablesByTheme?: gm.Middleware[];
    };
    Variable?: {
      '*'?: gm.Middleware[];
      firestore_id?: gm.Middleware[];
      name?: gm.Middleware[];
      description?: gm.Middleware[];
      type?: gm.Middleware[];
      units?: gm.Middleware[];
      methodology?: gm.Middleware[];
      timeseries?: gm.Middleware[];
      accessLevel?: gm.Middleware[];
      origin?: gm.Middleware[];
      theme?: gm.Middleware[];
      sphere?: gm.Middleware[];
      category?: gm.Middleware[];
      icon?: gm.Middleware[];
      variableRepresentation?: gm.Middleware[];
      cenote_count?: gm.Middleware[];
      createdAt?: gm.Middleware[];
      updatedAt?: gm.Middleware[];
    };
    VariableList?: {
      '*'?: gm.Middleware[];
      variables?: gm.Middleware[];
      totalCount?: gm.Middleware[];
    };
  };
}