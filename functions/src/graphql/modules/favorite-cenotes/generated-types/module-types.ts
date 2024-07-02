/* eslint-disable */
import * as Types from "../../../generated-types/graphql";
import * as gm from "graphql-modules";
export namespace FavoriteCenotesModule {
  interface DefinedFields {
    FavoriteCenotes: 'firestore_id' | 'userId' | 'cenoteId' | 'createdAt';
    FavoriteCenotesList: 'favoriteCenotes' | 'totalCount';
    Mutation: 'addFavoriteCenote' | 'removeFavorite';
    Query: 'getfavoriteCenotes' | 'getfavoriteCenote';
  };
  
  interface DefinedInputFields {
    NewFavoriteCenote: 'firestore_id' | 'userId' | 'cenoteId' | 'createdAt';
  };
  
  export type FavoriteCenotes = Pick<Types.FavoriteCenotes, DefinedFields['FavoriteCenotes']>;
  export type FavoriteCenotesList = Pick<Types.FavoriteCenotesList, DefinedFields['FavoriteCenotesList']>;
  export type NewFavoriteCenote = Pick<Types.NewFavoriteCenote, DefinedInputFields['NewFavoriteCenote']>;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type PaginationInput = Types.PaginationInput;
  
  export type Scalars = Pick<Types.Scalars, 'DateTime'>;
  export type DateTimeScalarConfig = Types.DateTimeScalarConfig;
  
  export type FavoriteCenotesResolvers = Pick<Types.FavoriteCenotesResolvers, DefinedFields['FavoriteCenotes'] | '__isTypeOf'>;
  export type FavoriteCenotesListResolvers = Pick<Types.FavoriteCenotesListResolvers, DefinedFields['FavoriteCenotesList'] | '__isTypeOf'>;
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  
  export interface Resolvers {
    FavoriteCenotes?: FavoriteCenotesResolvers;
    FavoriteCenotesList?: FavoriteCenotesListResolvers;
    Mutation?: MutationResolvers;
    Query?: QueryResolvers;
    DateTime?: Types.Resolvers['DateTime'];
  };
  
  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    FavoriteCenotes?: {
      '*'?: gm.Middleware[];
      firestore_id?: gm.Middleware[];
      userId?: gm.Middleware[];
      cenoteId?: gm.Middleware[];
      createdAt?: gm.Middleware[];
    };
    FavoriteCenotesList?: {
      '*'?: gm.Middleware[];
      favoriteCenotes?: gm.Middleware[];
      totalCount?: gm.Middleware[];
    };
    Mutation?: {
      '*'?: gm.Middleware[];
      addFavoriteCenote?: gm.Middleware[];
      removeFavorite?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      getfavoriteCenotes?: gm.Middleware[];
      getfavoriteCenote?: gm.Middleware[];
    };
  };
}