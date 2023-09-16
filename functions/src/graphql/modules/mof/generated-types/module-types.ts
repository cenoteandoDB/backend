/* eslint-disable */
import * as Types from "../../../generated-types/graphql";
import * as gm from "graphql-modules";
export namespace MofModule {
  interface DefinedFields {
    MeasurementOrFact: 'timestamp' | 'value';
    VariableWithData: '_id' | '_to' | '_from' | 'measurements' | 'firstTimestamp' | 'lastTimestamp';
    Mutation: 'createMof';
    Query: 'cenoteDataByTheme' | 'cenoteDataByVariable';
  };
  
  interface DefinedInputFields {
    NewMeasurementOrFactInput: 'variable' | 'cenote' | 'timestamp' | 'value';
  };
  
  export type MeasurementOrFact = Pick<Types.MeasurementOrFact, DefinedFields['MeasurementOrFact']>;
  export type VariableWithData = Pick<Types.VariableWithData, DefinedFields['VariableWithData']>;
  export type NewMeasurementOrFactInput = Pick<Types.NewMeasurementOrFactInput, DefinedInputFields['NewMeasurementOrFactInput']>;
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
      _id?: gm.Middleware[];
      _to?: gm.Middleware[];
      _from?: gm.Middleware[];
      measurements?: gm.Middleware[];
      firstTimestamp?: gm.Middleware[];
      lastTimestamp?: gm.Middleware[];
    };
    Mutation?: {
      '*'?: gm.Middleware[];
      createMof?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      cenoteDataByTheme?: gm.Middleware[];
      cenoteDataByVariable?: gm.Middleware[];
    };
  };
}