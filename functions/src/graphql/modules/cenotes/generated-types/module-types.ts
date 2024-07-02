/* eslint-disable */
import * as Types from "../../../generated-types/graphql";
import * as gm from "graphql-modules";
export namespace CenotesModule {
  interface DefinedFields {
    CityDistances: 'location' | 'distance' | 'time';
    Cenote: 'firestore_id' | 'cenoteando_id' | 'name' | 'altnames' | 'state' | 'municipality' | 'type' | 'touristic' | 'latitude' | 'longitude' | 'variable_count' | 'reference_count' | 'species_count' | 'photos' | 'maps' | 'createdAt' | 'updatedAt' | 'isFavorite';
    CenoteList: 'cenotes' | 'totalCount';
    CenoteLocation: 'coordinates' | 'geojson' | 'country' | 'state' | 'county';
    Coordinates: 'latitude' | 'longitude';
    CenoteBounds: 'top_left' | 'bottom_right';
    CenoteSocialData: 'comments';
    Comment: 'commenter' | 'comment' | 'review';
    Mutation: 'createCenote' | 'updateCenote' | 'deleteCenote' | 'uploadPhoto' | 'uploadMap';
    Query: 'getCenotes' | 'cenoteById' | 'cenotesCsv' | 'cenotesBounds';
  };
  
  interface DefinedEnumValues {
    CenoteType: 'NO_TYPE' | 'CENOTE' | 'DRY_CAVE' | 'WATER_WELL' | 'WATERY';
    CenoteIssue: 'GEOTAG_NOT_VERIFIED';
  };
  
  interface DefinedInputFields {
    CoordinatesInput: 'latitude' | 'longitude';
    NewCenoteInput: 'name' | 'state' | 'municipality' | 'type' | 'touristic' | 'latitude' | 'longitude';
    UpdatedCenoteInput: 'name' | 'state' | 'municipality' | 'type' | 'touristic' | 'latitude' | 'longitude';
    PhotoOrMapUploadInput: 'cenoteId' | 'filename' | 'content' | 'extension';
  };
  
  export type CenoteType = DefinedEnumValues['CenoteType'];
  export type CenoteIssue = DefinedEnumValues['CenoteIssue'];
  export type CityDistances = Pick<Types.CityDistances, DefinedFields['CityDistances']>;
  export type Cenote = Pick<Types.Cenote, DefinedFields['Cenote']>;
  export type CenoteList = Pick<Types.CenoteList, DefinedFields['CenoteList']>;
  export type CenoteLocation = Pick<Types.CenoteLocation, DefinedFields['CenoteLocation']>;
  export type Coordinates = Pick<Types.Coordinates, DefinedFields['Coordinates']>;
  export type CenoteBounds = Pick<Types.CenoteBounds, DefinedFields['CenoteBounds']>;
  export type CenoteSocialData = Pick<Types.CenoteSocialData, DefinedFields['CenoteSocialData']>;
  export type Comment = Pick<Types.Comment, DefinedFields['Comment']>;
  export type CoordinatesInput = Pick<Types.CoordinatesInput, DefinedInputFields['CoordinatesInput']>;
  export type NewCenoteInput = Pick<Types.NewCenoteInput, DefinedInputFields['NewCenoteInput']>;
  export type UpdatedCenoteInput = Pick<Types.UpdatedCenoteInput, DefinedInputFields['UpdatedCenoteInput']>;
  export type PhotoOrMapUploadInput = Pick<Types.PhotoOrMapUploadInput, DefinedInputFields['PhotoOrMapUploadInput']>;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type SortField = Types.SortField;
  export type PaginationInput = Types.PaginationInput;
  
  export type Scalars = Pick<Types.Scalars, 'DateTime' | 'URL' | 'Latitude' | 'Longitude' | 'JSON' | 'Coordinate'>;
  export type DateTimeScalarConfig = Types.DateTimeScalarConfig;
  export type UrlScalarConfig = Types.UrlScalarConfig;
  export type LatitudeScalarConfig = Types.LatitudeScalarConfig;
  export type LongitudeScalarConfig = Types.LongitudeScalarConfig;
  export type JsonScalarConfig = Types.JsonScalarConfig;
  export type CoordinateScalarConfig = Types.CoordinateScalarConfig;
  
  export type CityDistancesResolvers = Pick<Types.CityDistancesResolvers, DefinedFields['CityDistances'] | '__isTypeOf'>;
  export type CenoteResolvers = Pick<Types.CenoteResolvers, DefinedFields['Cenote'] | '__isTypeOf'>;
  export type CenoteListResolvers = Pick<Types.CenoteListResolvers, DefinedFields['CenoteList'] | '__isTypeOf'>;
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
    CenoteList?: CenoteListResolvers;
    CenoteLocation?: CenoteLocationResolvers;
    Coordinates?: CoordinatesResolvers;
    CenoteBounds?: CenoteBoundsResolvers;
    CenoteSocialData?: CenoteSocialDataResolvers;
    Comment?: CommentResolvers;
    Mutation?: MutationResolvers;
    Query?: QueryResolvers;
    DateTime?: Types.Resolvers['DateTime'];
    URL?: Types.Resolvers['URL'];
    Latitude?: Types.Resolvers['Latitude'];
    Longitude?: Types.Resolvers['Longitude'];
    JSON?: Types.Resolvers['JSON'];
    Coordinate?: Types.Resolvers['Coordinate'];
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
      firestore_id?: gm.Middleware[];
      cenoteando_id?: gm.Middleware[];
      name?: gm.Middleware[];
      altnames?: gm.Middleware[];
      state?: gm.Middleware[];
      municipality?: gm.Middleware[];
      type?: gm.Middleware[];
      touristic?: gm.Middleware[];
      latitude?: gm.Middleware[];
      longitude?: gm.Middleware[];
      variable_count?: gm.Middleware[];
      reference_count?: gm.Middleware[];
      species_count?: gm.Middleware[];
      photos?: gm.Middleware[];
      maps?: gm.Middleware[];
      createdAt?: gm.Middleware[];
      updatedAt?: gm.Middleware[];
      isFavorite?: gm.Middleware[];
    };
    CenoteList?: {
      '*'?: gm.Middleware[];
      cenotes?: gm.Middleware[];
      totalCount?: gm.Middleware[];
    };
    CenoteLocation?: {
      '*'?: gm.Middleware[];
      coordinates?: gm.Middleware[];
      geojson?: gm.Middleware[];
      country?: gm.Middleware[];
      state?: gm.Middleware[];
      county?: gm.Middleware[];
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
      getCenotes?: gm.Middleware[];
      cenoteById?: gm.Middleware[];
      cenotesCsv?: gm.Middleware[];
      cenotesBounds?: gm.Middleware[];
    };
  };
}