/* eslint-disable */
import * as Types from "../../../generated-types/graphql";
import * as gm from "graphql-modules";
export namespace MofModule {
  interface DefinedFields {
    MeasurementOrFact: 'timestamp' | 'value';
    VariableWithData: 'id' | 'cenoteId' | 'variableId' | 'measurements' | 'firstTimestamp' | 'lastTimestamp';
    Mutation: 'createMof' | 'deleteMof';
    Query: 'getCenoteDataByTheme' | 'getCenoteDataByVariable' | 'getCenoteData' | 'getThemesByCenote';
  };
  
  interface DefinedInputFields {
    NewMeasurementOrFactInput: 'variableId' | 'cenoteId' | 'timestamp' | 'value';
    DeleteMofInput: 'variableId' | 'cenoteId' | 'value' | 'timestamp';
  };
  
  export type MeasurementOrFact = Pick<Types.MeasurementOrFact, DefinedFields['MeasurementOrFact']>;
  export type VariableWithData = Pick<Types.VariableWithData, DefinedFields['VariableWithData']>;
  export type NewMeasurementOrFactInput = Pick<Types.NewMeasurementOrFactInput, DefinedInputFields['NewMeasurementOrFactInput']>;
  export type DeleteMofInput = Pick<Types.DeleteMofInput, DefinedInputFields['DeleteMofInput']>;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type VariableTheme = Types.VariableTheme;
  
  export type Scalars = Pick<Types.Scalars, 'DateTime'>;
  export type DateTimeScalarConfig = Types.DateTimeScalarConfig;
  
  export type MeasurementOrFactResolvers = Pick<Types.MeasurementOrFactResolvers, DefinedFields['MeasurementOrFact'] | '__isTypeOf'>;
  export type VariableWithDataResolvers = Pick<Types.VariableWithDataResolvers, DefinedFields['VariableWithData'] | '__isTypeOf'>;
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  
  export interface Resolvers {
    MeasurementOrFact?: MeasurementOrFactResolvers;
    VariableWithData?: VariableWithDataResolvers;
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
      measurements?: gm.Middleware[];
      firstTimestamp?: gm.Middleware[];
      lastTimestamp?: gm.Middleware[];
    };
    Mutation?: {
      '*'?: gm.Middleware[];
      createMof?: gm.Middleware[];
      deleteMof?: gm.Middleware[];
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