/* eslint-disable */
import * as Types from "../../../generated-types/graphql";
import * as gm from "graphql-modules";
export namespace MapLayersModule {
  interface DefinedFields {
    MapLayer: 'id' | 'name' | 'category' | 'description' | 'thumbnail' | 'metadata' | 'geojson' | 'zip';
    Mutation: 'create';
    Query: 'layers' | 'layer';
  };
  
  interface DefinedEnumValues {
    LayerCategory: 'ANTROPOGENICA' | 'INTRINSECA' | 'HIDROLOGIA' | 'CLIMA' | 'GEO_ESTATISTICA';
  };
  
  interface DefinedInputFields {
    MapLayerInput: 'id' | 'name' | 'description';
  };
  
  export type LayerCategory = DefinedEnumValues['LayerCategory'];
  export type MapLayer = Pick<Types.MapLayer, DefinedFields['MapLayer']>;
  export type MapLayerInput = Pick<Types.MapLayerInput, DefinedInputFields['MapLayerInput']>;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  
  export type MapLayerResolvers = Pick<Types.MapLayerResolvers, DefinedFields['MapLayer'] | '__isTypeOf'>;
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  
  export interface Resolvers {
    MapLayer?: MapLayerResolvers;
    Mutation?: MutationResolvers;
    Query?: QueryResolvers;
  };
  
  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    MapLayer?: {
      '*'?: gm.Middleware[];
      id?: gm.Middleware[];
      name?: gm.Middleware[];
      category?: gm.Middleware[];
      description?: gm.Middleware[];
      thumbnail?: gm.Middleware[];
      metadata?: gm.Middleware[];
      geojson?: gm.Middleware[];
      zip?: gm.Middleware[];
    };
    Mutation?: {
      '*'?: gm.Middleware[];
      create?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      layers?: gm.Middleware[];
      layer?: gm.Middleware[];
    };
  };
}