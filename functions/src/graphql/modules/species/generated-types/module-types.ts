/* eslint-disable */
import * as Types from "../../../generated-types/graphql";
import * as gm from "graphql-modules";
export namespace SpeciesModule {
  interface DefinedFields {
    Mutation: 'createSpecies' | 'updateSpecies';
    Query: 'species' | 'speciesById' | 'speciesByAphiaId' | 'speciesByINaturalistId' | 'speciesCsv';
    Species: 'id' | 'aphiaId' | 'iNaturalistId' | 'createdAt' | 'updatedAt';
  };
  
  interface DefinedInputFields {
    NewSpeciesInput: 'aphiaId' | 'iNaturalistId';
    UpdateSpeciesInput: 'id' | 'aphiaId' | 'iNaturalistId';
  };
  
  export type NewSpeciesInput = Pick<Types.NewSpeciesInput, DefinedInputFields['NewSpeciesInput']>;
  export type UpdateSpeciesInput = Pick<Types.UpdateSpeciesInput, DefinedInputFields['UpdateSpeciesInput']>;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  export type Species = Pick<Types.Species, DefinedFields['Species']>;
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  
  export type Scalars = Pick<Types.Scalars, 'DateTime'>;
  export type DateTimeScalarConfig = Types.DateTimeScalarConfig;
  
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  export type SpeciesResolvers = Pick<Types.SpeciesResolvers, DefinedFields['Species'] | '__isTypeOf'>;
  
  export interface Resolvers {
    Mutation?: MutationResolvers;
    Query?: QueryResolvers;
    Species?: SpeciesResolvers;
    DateTime?: Types.Resolvers['DateTime'];
  };
  
  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    Mutation?: {
      '*'?: gm.Middleware[];
      createSpecies?: gm.Middleware[];
      updateSpecies?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      species?: gm.Middleware[];
      speciesById?: gm.Middleware[];
      speciesByAphiaId?: gm.Middleware[];
      speciesByINaturalistId?: gm.Middleware[];
      speciesCsv?: gm.Middleware[];
    };
    Species?: {
      '*'?: gm.Middleware[];
      id?: gm.Middleware[];
      aphiaId?: gm.Middleware[];
      iNaturalistId?: gm.Middleware[];
      createdAt?: gm.Middleware[];
      updatedAt?: gm.Middleware[];
    };
  };
}