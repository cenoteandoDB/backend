/* eslint-disable */
import * as Types from "../../../generated-types/graphql";
import * as gm from "graphql-modules";
export namespace MofModule {
  interface DefinedFields {
    MeasurementOrFact: 'timestamp' | 'value';
    VariableWithData: 'id' | 'cenoteId' | 'variableId' | 'variableName' | 'variableRepresentation' | 'variableIcon' | 'variableUnits' | 'measurements' | 'firstTimestamp' | 'lastTimestamp';
    MofByCategory: 'category' | 'mofs';
    MofModificationRequest: 'type' | 'cenoteId' | 'variableId' | 'mof' | 'old_mof';
    Mutation: 'requestCreateMof' | 'requestDeleteMof' | 'requestUpdateMof' | 'acceptMofRequest' | 'rejectMofRequest';
    Query: 'getCenoteDataByTheme' | 'getCenoteDataByVariable' | 'getCenoteData' | 'getThemesByCenote';
  };
  
  interface DefinedEnumValues {
    RequestType: 'CREATE' | 'UPDATE' | 'DELETE';
  };
  
  interface DefinedInputFields {
    NewMeasurementOrFactInput: 'variableId' | 'cenoteId' | 'timestamp' | 'value';
    DeleteMofInput: 'variableId' | 'cenoteId' | 'value' | 'timestamp';
    UpdateMofInput: 'variableId' | 'cenoteId' | 'oldValue' | 'oldTimestamp' | 'value' | 'timestamp';
  };
  
  export type MeasurementOrFact = Pick<Types.MeasurementOrFact, DefinedFields['MeasurementOrFact']>;
  export type VariableWithData = Pick<Types.VariableWithData, DefinedFields['VariableWithData']>;
  export type VariableRepresentation = Types.VariableRepresentation;
  export type MofByCategory = Pick<Types.MofByCategory, DefinedFields['MofByCategory']>;
  export type RequestType = DefinedEnumValues['RequestType'];
  export type MofModificationRequest = Pick<Types.MofModificationRequest, DefinedFields['MofModificationRequest']>;
  export type NewMeasurementOrFactInput = Pick<Types.NewMeasurementOrFactInput, DefinedInputFields['NewMeasurementOrFactInput']>;
  export type DeleteMofInput = Pick<Types.DeleteMofInput, DefinedInputFields['DeleteMofInput']>;
  export type UpdateMofInput = Pick<Types.UpdateMofInput, DefinedInputFields['UpdateMofInput']>;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type VariableTheme = Types.VariableTheme;
  
  export type Scalars = Pick<Types.Scalars, 'DateTime'>;
  export type DateTimeScalarConfig = Types.DateTimeScalarConfig;
  
  export type MeasurementOrFactResolvers = Pick<Types.MeasurementOrFactResolvers, DefinedFields['MeasurementOrFact'] | '__isTypeOf'>;
  export type VariableWithDataResolvers = Pick<Types.VariableWithDataResolvers, DefinedFields['VariableWithData'] | '__isTypeOf'>;
  export type MofByCategoryResolvers = Pick<Types.MofByCategoryResolvers, DefinedFields['MofByCategory'] | '__isTypeOf'>;
  export type MofModificationRequestResolvers = Pick<Types.MofModificationRequestResolvers, DefinedFields['MofModificationRequest'] | '__isTypeOf'>;
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  
  export interface Resolvers {
    MeasurementOrFact?: MeasurementOrFactResolvers;
    VariableWithData?: VariableWithDataResolvers;
    MofByCategory?: MofByCategoryResolvers;
    MofModificationRequest?: MofModificationRequestResolvers;
    Mutation?: MutationResolvers;
    Query?: QueryResolvers;
    DateTime?: Types.Resolvers['DateTime'];
  };
  
  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    MeasurementOrFact?: {
      '*'?: gm.Middleware[];
      timestamp?: gm.Middleware[];
      value?: gm.Middleware[];
    };
    VariableWithData?: {
      '*'?: gm.Middleware[];
      id?: gm.Middleware[];
      cenoteId?: gm.Middleware[];
      variableId?: gm.Middleware[];
      variableName?: gm.Middleware[];
      variableRepresentation?: gm.Middleware[];
      variableIcon?: gm.Middleware[];
      variableUnits?: gm.Middleware[];
      measurements?: gm.Middleware[];
      firstTimestamp?: gm.Middleware[];
      lastTimestamp?: gm.Middleware[];
    };
    MofByCategory?: {
      '*'?: gm.Middleware[];
      category?: gm.Middleware[];
      mofs?: gm.Middleware[];
    };
    MofModificationRequest?: {
      '*'?: gm.Middleware[];
      type?: gm.Middleware[];
      cenoteId?: gm.Middleware[];
      variableId?: gm.Middleware[];
      mof?: gm.Middleware[];
      old_mof?: gm.Middleware[];
    };
    Mutation?: {
      '*'?: gm.Middleware[];
      requestCreateMof?: gm.Middleware[];
      requestDeleteMof?: gm.Middleware[];
      requestUpdateMof?: gm.Middleware[];
      acceptMofRequest?: gm.Middleware[];
      rejectMofRequest?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      getCenoteDataByTheme?: gm.Middleware[];
      getCenoteDataByVariable?: gm.Middleware[];
      getCenoteData?: gm.Middleware[];
      getThemesByCenote?: gm.Middleware[];
    };
  };
}