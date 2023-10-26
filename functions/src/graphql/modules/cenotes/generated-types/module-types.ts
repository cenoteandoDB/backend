/* eslint-disable */
import * as Types from "../../../generated-types/graphql";
import * as gm from "graphql-modules";
export namespace CenotesModule {
  interface DefinedFields {
    CityDistances: 'location' | 'distance' | 'time';
    Cenote: 'id' | '_key' | 'geojson' | 'touristic' | 'location' | 'type' | 'name' | 'alternativeNames' | 'issues' | 'social' | 'photos' | 'maps' | 'creator' | 'distances' | 'createdAt' | 'updatedAt';
    CenoteLocation: 'coordinates' | 'country' | 'state' | 'municipality';
    Coordinates: 'latitude' | 'longitude';
    CenoteBounds: 'top_left' | 'bottom_right';
    CenoteSocialData: 'comments';
    Comment: 'commenter' | 'comment' | 'review';
    Mutation: 'createCenote' | 'updateCenote' | 'deleteCenote' | 'uploadPhoto' | 'uploadMap';
    Query: 'cenotes' | 'cenoteById' | 'cenotesCsv' | 'cenotesBounds';
  };
  
  interface DefinedEnumValues {
    CenoteType: 'NO_TYPE' | 'CENOTE' | 'DRY_CAVE' | 'WATER_WELL' | 'WATERY';
    CenoteIssue: 'GEOTAG_NOT_VERIFIED';
  };
  
  interface DefinedInputFields {
    CoordinatesInput: 'latitude' | 'longitude';
    NewCenoteInput: 'coordinates';
    UpdatedCenoteInput: 'id' | 'touristic' | 'type' | 'name' | 'alternativeNames' | 'issues';
    PhotoOrMapUploadInput: 'cenoteId' | 'filename' | 'content' | 'extension';
  };
  
  export type CenoteType = DefinedEnumValues['CenoteType'];
  export type CenoteIssue = DefinedEnumValues['CenoteIssue'];
  export type CityDistances = Pick<Types.CityDistances, DefinedFields['CityDistances']>;
  export type Cenote = Pick<Types.Cenote, DefinedFields['Cenote']>;
  export type CenoteLocation = Pick<Types.CenoteLocation, DefinedFields['CenoteLocation']>;
  export type CenoteSocialData = Pick<Types.CenoteSocialData, DefinedFields['CenoteSocialData']>;
  export type User = Types.User;
  export type Coordinates = Pick<Types.Coordinates, DefinedFields['Coordinates']>;
  export type CenoteBounds = Pick<Types.CenoteBounds, DefinedFields['CenoteBounds']>;
  export type Comment = Pick<Types.Comment, DefinedFields['Comment']>;
  export type CoordinatesInput = Pick<Types.CoordinatesInput, DefinedInputFields['CoordinatesInput']>;
  export type NewCenoteInput = Pick<Types.NewCenoteInput, DefinedInputFields['NewCenoteInput']>;
  export type UpdatedCenoteInput = Pick<Types.UpdatedCenoteInput, DefinedInputFields['UpdatedCenoteInput']>;
  export type PhotoOrMapUploadInput = Pick<Types.PhotoOrMapUploadInput, DefinedInputFields['PhotoOrMapUploadInput']>;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  
  export type Scalars = Pick<Types.Scalars, 'DateTime' | 'URL' | 'JSON' | 'Latitude' | 'Longitude'>;
  export type DateTimeScalarConfig = Types.DateTimeScalarConfig;
  export type UrlScalarConfig = Types.UrlScalarConfig;
  export type JsonScalarConfig = Types.JsonScalarConfig;
  export type LatitudeScalarConfig = Types.LatitudeScalarConfig;
  export type LongitudeScalarConfig = Types.LongitudeScalarConfig;
  
  export type CityDistancesResolvers = Pick<Types.CityDistancesResolvers, DefinedFields['CityDistances'] | '__isTypeOf'>;
  export type CenoteResolvers = Pick<Types.CenoteResolvers, DefinedFields['Cenote'] | '__isTypeOf'>;
  export type CenoteLocationResolvers = Pick<Types.CenoteLocationResolvers, DefinedFields['CenoteLocation'] | '__isTypeOf'>;
  export type CoordinatesResolvers = Pick<Types.CoordinatesResolvers, DefinedFields['Coordinates'] | '__isTypeOf'>;
  export type CenoteBoundsResolvers = Pick<Types.CenoteBoundsResolvers, DefinedFields['CenoteBounds'] | '__isTypeOf'>;
  export type CenoteSocialDataResolvers = Pick<Types.CenoteSocialDataResolvers, DefinedFields['CenoteSocialData'] | '__isTypeOf'>;
  export type CommentResolvers = Pick<Types.CommentResolvers, DefinedFields['Comment'] | '__isTypeOf'>;
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  
  export interface Resolvers {
    CityDistances?: CityDistancesResolvers;
    Cenote?: CenoteResolvers;
    CenoteLocation?: CenoteLocationResolvers;
    Coordinates?: CoordinatesResolvers;
    CenoteBounds?: CenoteBoundsResolvers;
    CenoteSocialData?: CenoteSocialDataResolvers;
    Comment?: CommentResolvers;
    Mutation?: MutationResolvers;
    Query?: QueryResolvers;
    DateTime?: Types.Resolvers['DateTime'];
    URL?: Types.Resolvers['URL'];
    JSON?: Types.Resolvers['JSON'];
    Latitude?: Types.Resolvers['Latitude'];
    Longitude?: Types.Resolvers['Longitude'];
  };
  
  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    CityDistances?: {
      '*'?: gm.Middleware[];
      location?: gm.Middleware[];
      distance?: gm.Middleware[];
      time?: gm.Middleware[];
    };
    Cenote?: {
      '*'?: gm.Middleware[];
      id?: gm.Middleware[];
      _key?: gm.Middleware[];
      geojson?: gm.Middleware[];
      touristic?: gm.Middleware[];
      location?: gm.Middleware[];
      type?: gm.Middleware[];
      name?: gm.Middleware[];
      alternativeNames?: gm.Middleware[];
      issues?: gm.Middleware[];
      social?: gm.Middleware[];
      photos?: gm.Middleware[];
      maps?: gm.Middleware[];
      creator?: gm.Middleware[];
      distances?: gm.Middleware[];
      createdAt?: gm.Middleware[];
      updatedAt?: gm.Middleware[];
    };
    CenoteLocation?: {
      '*'?: gm.Middleware[];
      coordinates?: gm.Middleware[];
      country?: gm.Middleware[];
      state?: gm.Middleware[];
      municipality?: gm.Middleware[];
    };
    Coordinates?: {
      '*'?: gm.Middleware[];
      latitude?: gm.Middleware[];
      longitude?: gm.Middleware[];
    };
    CenoteBounds?: {
      '*'?: gm.Middleware[];
      top_left?: gm.Middleware[];
      bottom_right?: gm.Middleware[];
    };
    CenoteSocialData?: {
      '*'?: gm.Middleware[];
      comments?: gm.Middleware[];
    };
    Comment?: {
      '*'?: gm.Middleware[];
      commenter?: gm.Middleware[];
      comment?: gm.Middleware[];
      review?: gm.Middleware[];
    };
    Mutation?: {
      '*'?: gm.Middleware[];
      createCenote?: gm.Middleware[];
      updateCenote?: gm.Middleware[];
      deleteCenote?: gm.Middleware[];
      uploadPhoto?: gm.Middleware[];
      uploadMap?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      cenotes?: gm.Middleware[];
      cenoteById?: gm.Middleware[];
      cenotesCsv?: gm.Middleware[];
      cenotesBounds?: gm.Middleware[];
    };
  };
}