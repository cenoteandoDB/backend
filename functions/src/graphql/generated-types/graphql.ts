/* eslint-disable */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  EmailAddress: any;
  JSON: any;
  Latitude: any;
  Longitude: any;
  URL: any;
};

export type AccessLevel =
  | 'PRIVATE'
  | 'PUBLIC'
  | 'SENSITIVE';

export type AuditLog = {
  __typename?: 'AuditLog';
  arguments: Scalars['JSON'];
  objectId: Scalars['ID'];
  timestamp: Scalars['DateTime'];
  type: AuditLogType;
};

export type AuditLogType =
  | 'NEW_CENOTE'
  | 'NEW_REFERENCE'
  | 'NEW_VARIABLE'
  | 'UPDATED_CENOTE'
  | 'UPDATED_REFERENCE'
  | 'UPDATED_VARIABLE';

export type Cenote = {
  __typename?: 'Cenote';
  _id: Scalars['ID'];
  alternativeNames?: Maybe<Array<Scalars['String']>>;
  createdAt?: Maybe<Scalars['DateTime']>;
  creator?: Maybe<User>;
  distances?: Maybe<Array<Maybe<CityDistances>>>;
  issues?: Maybe<Array<Maybe<CenoteIssue>>>;
  location: CenoteLocation;
  maps?: Maybe<Array<Scalars['URL']>>;
  name: Scalars['String'];
  photos?: Maybe<Array<Scalars['URL']>>;
  social?: Maybe<CenoteSocialData>;
  touristic: Scalars['Boolean'];
  type: CenoteType;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

/**
 * This type is used to set the boundaries of interactive maps for visualizing cenotes.
 * It returns the bounding coordinates of the region of interest (where there is cenote data).
 */
export type CenoteBounds = {
  __typename?: 'CenoteBounds';
  bottom_right?: Maybe<Coordinates>;
  top_left?: Maybe<Coordinates>;
};

export type CenoteIssue =
  | 'GEOTAG_NOT_VERIFIED';

export type CenoteLocation = {
  __typename?: 'CenoteLocation';
  coordinates: Coordinates;
  country: Scalars['String'];
  municipality: Scalars['String'];
  state: Scalars['String'];
};

export type CenoteSocialData = {
  __typename?: 'CenoteSocialData';
  comments?: Maybe<Array<Maybe<Comment>>>;
};

export type CenoteType =
  | 'CENOTE'
  | 'DRY_CAVE'
  | 'NO_TYPE'
  | 'WATERY'
  | 'WATER_WELL';

export type CityDistances = {
  __typename?: 'CityDistances';
  distance?: Maybe<Scalars['Float']>;
  location: Scalars['String'];
  time?: Maybe<Scalars['Int']>;
};

export type Comment = {
  __typename?: 'Comment';
  comment?: Maybe<Scalars['String']>;
  commenter?: Maybe<Scalars['String']>;
  review?: Maybe<Scalars['Float']>;
};

export type Coordinates = {
  __typename?: 'Coordinates';
  latitude: Scalars['Latitude'];
  longitude: Scalars['Longitude'];
};

export type CoordinatesInput = {
  latitude: Scalars['Latitude'];
  longitude: Scalars['Longitude'];
};

export type MapLayer = {
  __typename?: 'MapLayer';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  json?: Maybe<Scalars['String']>;
  layer?: Maybe<Scalars['String']>;
  metadados?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  thumbnail?: Maybe<Scalars['String']>;
};

export type MapLayerInput = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  name: Scalars['String'];
};

export type MeasurementOrFact = {
  __typename?: 'MeasurementOrFact';
  timestamp: Scalars['DateTime'];
  value: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  create?: Maybe<MapLayer>;
  createCenote?: Maybe<Cenote>;
  createMof?: Maybe<VariableWithData>;
  createSpecies?: Maybe<Species>;
  createVariable?: Maybe<Variable>;
  register?: Maybe<User>;
  updateCenote?: Maybe<Cenote>;
  updateEmail?: Maybe<User>;
  updateSpecies?: Maybe<Species>;
  updateVariable?: Maybe<Variable>;
};


export type MutationCreateArgs = {
  input: MapLayerInput;
};


export type MutationCreateCenoteArgs = {
  new_cenote: NewCenoteInput;
};


export type MutationCreateMofArgs = {
  new_mof: NewMeasurementOrFactInput;
};


export type MutationCreateSpeciesArgs = {
  new_species: NewSpeciesInput;
};


export type MutationCreateVariableArgs = {
  new_variable: NewVariableInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationUpdateCenoteArgs = {
  updated_cenote: UpdatedCenoteInput;
};


export type MutationUpdateEmailArgs = {
  email: Scalars['EmailAddress'];
  id: Scalars['ID'];
};


export type MutationUpdateSpeciesArgs = {
  updated_species: UpdateSpeciesInput;
};


export type MutationUpdateVariableArgs = {
  updated_variable: UpdateVariableInput;
};

export type NewCenoteInput = {
  coordinates: CoordinatesInput;
};

export type NewMeasurementOrFactInput = {
  cenote: Scalars['ID'];
  timestamp: Scalars['DateTime'];
  value: Scalars['Int'];
  variable: Scalars['ID'];
};

export type NewSpeciesInput = {
  aphiaId?: InputMaybe<Scalars['String']>;
  iNaturalistId?: InputMaybe<Scalars['String']>;
};

export type NewVariableInput = {
  accessLevel?: InputMaybe<AccessLevel>;
  description?: InputMaybe<Scalars['String']>;
  enumValues?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  methodology?: InputMaybe<Scalars['String']>;
  multiple?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  origin?: InputMaybe<VariableOrigin>;
  theme?: InputMaybe<VariableTheme>;
  timeseries?: InputMaybe<Scalars['Boolean']>;
  type?: InputMaybe<VariableType>;
  units?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  auditLogs?: Maybe<Array<Maybe<AuditLog>>>;
  cenoteById?: Maybe<Cenote>;
  cenoteDataByTheme?: Maybe<Array<VariableWithData>>;
  cenoteDataByVariable?: Maybe<VariableWithData>;
  cenotes?: Maybe<Array<Maybe<Cenote>>>;
  cenotesBounds?: Maybe<CenoteBounds>;
  cenotesCsv?: Maybe<Scalars['String']>;
  layer?: Maybe<MapLayer>;
  layers?: Maybe<Array<Maybe<MapLayer>>>;
  species?: Maybe<Array<Maybe<Species>>>;
  speciesByAphiaId?: Maybe<Species>;
  speciesByINaturalistId?: Maybe<Species>;
  speciesById?: Maybe<Species>;
  speciesCsv?: Maybe<Scalars['String']>;
  userById?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
  variableById?: Maybe<Variable>;
  variables?: Maybe<Array<Maybe<Variable>>>;
  variablesByTheme?: Maybe<Array<Maybe<Variable>>>;
};


export type QueryAuditLogsArgs = {
  id: Scalars['ID'];
  type: AuditLogType;
};


export type QueryCenoteByIdArgs = {
  id: Scalars['ID'];
};


export type QueryCenoteDataByThemeArgs = {
  cenote: Scalars['ID'];
  theme: VariableTheme;
};


export type QueryCenoteDataByVariableArgs = {
  cenote: Scalars['ID'];
  variable: Scalars['ID'];
};


export type QueryLayerArgs = {
  id: Scalars['ID'];
};


export type QuerySpeciesByAphiaIdArgs = {
  aphiaId: Scalars['String'];
};


export type QuerySpeciesByINaturalistIdArgs = {
  iNaturalist: Scalars['String'];
};


export type QuerySpeciesByIdArgs = {
  id: Scalars['ID'];
};


export type QueryUserByIdArgs = {
  id: Scalars['ID'];
};


export type QueryVariableByIdArgs = {
  id: Scalars['ID'];
};


export type QueryVariablesByThemeArgs = {
  theme: VariableTheme;
};

export type RegisterInput = {
  email: Scalars['EmailAddress'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type Species = {
  __typename?: 'Species';
  _id: Scalars['ID'];
  aphiaId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  iNaturalistId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UpdateSpeciesInput = {
  aphiaId?: InputMaybe<Scalars['String']>;
  iNaturalistId?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type UpdateVariableInput = {
  accessLevel?: InputMaybe<AccessLevel>;
  description?: InputMaybe<Scalars['String']>;
  enumValues?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id: Scalars['ID'];
  methodology?: InputMaybe<Scalars['String']>;
  multiple?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  origin?: InputMaybe<VariableOrigin>;
  theme?: InputMaybe<VariableTheme>;
  timeseries?: InputMaybe<Scalars['Boolean']>;
  type?: InputMaybe<VariableType>;
  units?: InputMaybe<Scalars['String']>;
};

export type UpdatedCenoteInput = {
  alternativeNames?: InputMaybe<Array<Scalars['String']>>;
  id: Scalars['ID'];
  issues?: InputMaybe<Array<InputMaybe<CenoteIssue>>>;
  name?: InputMaybe<Scalars['String']>;
  touristic?: InputMaybe<Scalars['Boolean']>;
  type?: InputMaybe<CenoteType>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['EmailAddress'];
  id: Scalars['ID'];
  name: Scalars['String'];
  role: UserRole;
};

export type UserRole =
  | 'ADMIN'
  | 'BASIC'
  | 'CENOTERO_ADVANCED';

export type Variable = {
  __typename?: 'Variable';
  _id: Scalars['ID'];
  accessLevel?: Maybe<AccessLevel>;
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  enumValues?: Maybe<Array<Maybe<Scalars['String']>>>;
  methodology?: Maybe<Scalars['String']>;
  multiple?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  origin?: Maybe<VariableOrigin>;
  theme?: Maybe<VariableTheme>;
  timeseries?: Maybe<Scalars['Boolean']>;
  type?: Maybe<VariableType>;
  units?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type VariableOrigin =
  | 'BOTH'
  | 'FIELD'
  | 'OFFICE';

export type VariableTheme =
  | 'BIODIVERSITY'
  | 'CULTURAL'
  | 'DISTURBANCE'
  | 'DIVING'
  | 'GEOMORPHOLOGY'
  | 'GEOREFERENCE'
  | 'LOCATION'
  | 'ORGANIZATION'
  | 'REGULATION'
  | 'TOURISM'
  | 'WATER';

export type VariableType =
  | 'BOOLEAN'
  | 'DATE'
  | 'DATETIME'
  | 'ENUM'
  | 'JSON'
  | 'NUMBER_WITH_UNITS'
  | 'TEXT'
  | 'TIME'
  | 'UNITLESS_NUMBER';

export type VariableWithData = {
  __typename?: 'VariableWithData';
  cenote: Scalars['ID'];
  data: Array<MeasurementOrFact>;
  firstTimestamp: Scalars['DateTime'];
  id: Scalars['ID'];
  lastTimestamp: Scalars['DateTime'];
  variable: Scalars['ID'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AccessLevel: AccessLevel;
  AuditLog: ResolverTypeWrapper<AuditLog>;
  AuditLogType: AuditLogType;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Cenote: ResolverTypeWrapper<Cenote>;
  CenoteBounds: ResolverTypeWrapper<CenoteBounds>;
  CenoteIssue: CenoteIssue;
  CenoteLocation: ResolverTypeWrapper<CenoteLocation>;
  CenoteSocialData: ResolverTypeWrapper<CenoteSocialData>;
  CenoteType: CenoteType;
  CityDistances: ResolverTypeWrapper<CityDistances>;
  Comment: ResolverTypeWrapper<Comment>;
  Coordinates: ResolverTypeWrapper<Coordinates>;
  CoordinatesInput: CoordinatesInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  Latitude: ResolverTypeWrapper<Scalars['Latitude']>;
  Longitude: ResolverTypeWrapper<Scalars['Longitude']>;
  MapLayer: ResolverTypeWrapper<MapLayer>;
  MapLayerInput: MapLayerInput;
  MeasurementOrFact: ResolverTypeWrapper<MeasurementOrFact>;
  Mutation: ResolverTypeWrapper<{}>;
  NewCenoteInput: NewCenoteInput;
  NewMeasurementOrFactInput: NewMeasurementOrFactInput;
  NewSpeciesInput: NewSpeciesInput;
  NewVariableInput: NewVariableInput;
  Query: ResolverTypeWrapper<{}>;
  RegisterInput: RegisterInput;
  Species: ResolverTypeWrapper<Species>;
  String: ResolverTypeWrapper<Scalars['String']>;
  URL: ResolverTypeWrapper<Scalars['URL']>;
  UpdateSpeciesInput: UpdateSpeciesInput;
  UpdateVariableInput: UpdateVariableInput;
  UpdatedCenoteInput: UpdatedCenoteInput;
  User: ResolverTypeWrapper<User>;
  UserRole: UserRole;
  Variable: ResolverTypeWrapper<Variable>;
  VariableOrigin: VariableOrigin;
  VariableTheme: VariableTheme;
  VariableType: VariableType;
  VariableWithData: ResolverTypeWrapper<VariableWithData>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuditLog: AuditLog;
  Boolean: Scalars['Boolean'];
  Cenote: Cenote;
  CenoteBounds: CenoteBounds;
  CenoteLocation: CenoteLocation;
  CenoteSocialData: CenoteSocialData;
  CityDistances: CityDistances;
  Comment: Comment;
  Coordinates: Coordinates;
  CoordinatesInput: CoordinatesInput;
  DateTime: Scalars['DateTime'];
  EmailAddress: Scalars['EmailAddress'];
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  JSON: Scalars['JSON'];
  Latitude: Scalars['Latitude'];
  Longitude: Scalars['Longitude'];
  MapLayer: MapLayer;
  MapLayerInput: MapLayerInput;
  MeasurementOrFact: MeasurementOrFact;
  Mutation: {};
  NewCenoteInput: NewCenoteInput;
  NewMeasurementOrFactInput: NewMeasurementOrFactInput;
  NewSpeciesInput: NewSpeciesInput;
  NewVariableInput: NewVariableInput;
  Query: {};
  RegisterInput: RegisterInput;
  Species: Species;
  String: Scalars['String'];
  URL: Scalars['URL'];
  UpdateSpeciesInput: UpdateSpeciesInput;
  UpdateVariableInput: UpdateVariableInput;
  UpdatedCenoteInput: UpdatedCenoteInput;
  User: User;
  Variable: Variable;
  VariableWithData: VariableWithData;
};

export type AuditLogResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuditLog'] = ResolversParentTypes['AuditLog']> = {
  arguments?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  objectId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['AuditLogType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CenoteResolvers<ContextType = any, ParentType extends ResolversParentTypes['Cenote'] = ResolversParentTypes['Cenote']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  alternativeNames?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  creator?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  distances?: Resolver<Maybe<Array<Maybe<ResolversTypes['CityDistances']>>>, ParentType, ContextType>;
  issues?: Resolver<Maybe<Array<Maybe<ResolversTypes['CenoteIssue']>>>, ParentType, ContextType>;
  location?: Resolver<ResolversTypes['CenoteLocation'], ParentType, ContextType>;
  maps?: Resolver<Maybe<Array<ResolversTypes['URL']>>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  photos?: Resolver<Maybe<Array<ResolversTypes['URL']>>, ParentType, ContextType>;
  social?: Resolver<Maybe<ResolversTypes['CenoteSocialData']>, ParentType, ContextType>;
  touristic?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['CenoteType'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CenoteBoundsResolvers<ContextType = any, ParentType extends ResolversParentTypes['CenoteBounds'] = ResolversParentTypes['CenoteBounds']> = {
  bottom_right?: Resolver<Maybe<ResolversTypes['Coordinates']>, ParentType, ContextType>;
  top_left?: Resolver<Maybe<ResolversTypes['Coordinates']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CenoteLocationResolvers<ContextType = any, ParentType extends ResolversParentTypes['CenoteLocation'] = ResolversParentTypes['CenoteLocation']> = {
  coordinates?: Resolver<ResolversTypes['Coordinates'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  municipality?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  state?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CenoteSocialDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['CenoteSocialData'] = ResolversParentTypes['CenoteSocialData']> = {
  comments?: Resolver<Maybe<Array<Maybe<ResolversTypes['Comment']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CityDistancesResolvers<ContextType = any, ParentType extends ResolversParentTypes['CityDistances'] = ResolversParentTypes['CityDistances']> = {
  distance?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  location?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  time?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  commenter?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  review?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CoordinatesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Coordinates'] = ResolversParentTypes['Coordinates']> = {
  latitude?: Resolver<ResolversTypes['Latitude'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Longitude'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface EmailAddressScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['EmailAddress'], any> {
  name: 'EmailAddress';
}

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export interface LatitudeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Latitude'], any> {
  name: 'Latitude';
}

export interface LongitudeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Longitude'], any> {
  name: 'Longitude';
}

export type MapLayerResolvers<ContextType = any, ParentType extends ResolversParentTypes['MapLayer'] = ResolversParentTypes['MapLayer']> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  json?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  layer?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  metadados?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  thumbnail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MeasurementOrFactResolvers<ContextType = any, ParentType extends ResolversParentTypes['MeasurementOrFact'] = ResolversParentTypes['MeasurementOrFact']> = {
  timestamp?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  create?: Resolver<Maybe<ResolversTypes['MapLayer']>, ParentType, ContextType, RequireFields<MutationCreateArgs, 'input'>>;
  createCenote?: Resolver<Maybe<ResolversTypes['Cenote']>, ParentType, ContextType, RequireFields<MutationCreateCenoteArgs, 'new_cenote'>>;
  createMof?: Resolver<Maybe<ResolversTypes['VariableWithData']>, ParentType, ContextType, RequireFields<MutationCreateMofArgs, 'new_mof'>>;
  createSpecies?: Resolver<Maybe<ResolversTypes['Species']>, ParentType, ContextType, RequireFields<MutationCreateSpeciesArgs, 'new_species'>>;
  createVariable?: Resolver<Maybe<ResolversTypes['Variable']>, ParentType, ContextType, RequireFields<MutationCreateVariableArgs, 'new_variable'>>;
  register?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationRegisterArgs, 'input'>>;
  updateCenote?: Resolver<Maybe<ResolversTypes['Cenote']>, ParentType, ContextType, RequireFields<MutationUpdateCenoteArgs, 'updated_cenote'>>;
  updateEmail?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateEmailArgs, 'email' | 'id'>>;
  updateSpecies?: Resolver<Maybe<ResolversTypes['Species']>, ParentType, ContextType, RequireFields<MutationUpdateSpeciesArgs, 'updated_species'>>;
  updateVariable?: Resolver<Maybe<ResolversTypes['Variable']>, ParentType, ContextType, RequireFields<MutationUpdateVariableArgs, 'updated_variable'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  auditLogs?: Resolver<Maybe<Array<Maybe<ResolversTypes['AuditLog']>>>, ParentType, ContextType, RequireFields<QueryAuditLogsArgs, 'id' | 'type'>>;
  cenoteById?: Resolver<Maybe<ResolversTypes['Cenote']>, ParentType, ContextType, RequireFields<QueryCenoteByIdArgs, 'id'>>;
  cenoteDataByTheme?: Resolver<Maybe<Array<ResolversTypes['VariableWithData']>>, ParentType, ContextType, RequireFields<QueryCenoteDataByThemeArgs, 'cenote' | 'theme'>>;
  cenoteDataByVariable?: Resolver<Maybe<ResolversTypes['VariableWithData']>, ParentType, ContextType, RequireFields<QueryCenoteDataByVariableArgs, 'cenote' | 'variable'>>;
  cenotes?: Resolver<Maybe<Array<Maybe<ResolversTypes['Cenote']>>>, ParentType, ContextType>;
  cenotesBounds?: Resolver<Maybe<ResolversTypes['CenoteBounds']>, ParentType, ContextType>;
  cenotesCsv?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  layer?: Resolver<Maybe<ResolversTypes['MapLayer']>, ParentType, ContextType, RequireFields<QueryLayerArgs, 'id'>>;
  layers?: Resolver<Maybe<Array<Maybe<ResolversTypes['MapLayer']>>>, ParentType, ContextType>;
  species?: Resolver<Maybe<Array<Maybe<ResolversTypes['Species']>>>, ParentType, ContextType>;
  speciesByAphiaId?: Resolver<Maybe<ResolversTypes['Species']>, ParentType, ContextType, RequireFields<QuerySpeciesByAphiaIdArgs, 'aphiaId'>>;
  speciesByINaturalistId?: Resolver<Maybe<ResolversTypes['Species']>, ParentType, ContextType, RequireFields<QuerySpeciesByINaturalistIdArgs, 'iNaturalist'>>;
  speciesById?: Resolver<Maybe<ResolversTypes['Species']>, ParentType, ContextType, RequireFields<QuerySpeciesByIdArgs, 'id'>>;
  speciesCsv?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userById?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserByIdArgs, 'id'>>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  variableById?: Resolver<Maybe<ResolversTypes['Variable']>, ParentType, ContextType, RequireFields<QueryVariableByIdArgs, 'id'>>;
  variables?: Resolver<Maybe<Array<Maybe<ResolversTypes['Variable']>>>, ParentType, ContextType>;
  variablesByTheme?: Resolver<Maybe<Array<Maybe<ResolversTypes['Variable']>>>, ParentType, ContextType, RequireFields<QueryVariablesByThemeArgs, 'theme'>>;
};

export type SpeciesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Species'] = ResolversParentTypes['Species']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  aphiaId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  iNaturalistId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UrlScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['URL'], any> {
  name: 'URL';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<ResolversTypes['EmailAddress'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['UserRole'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VariableResolvers<ContextType = any, ParentType extends ResolversParentTypes['Variable'] = ResolversParentTypes['Variable']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  accessLevel?: Resolver<Maybe<ResolversTypes['AccessLevel']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  enumValues?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  methodology?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  multiple?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  origin?: Resolver<Maybe<ResolversTypes['VariableOrigin']>, ParentType, ContextType>;
  theme?: Resolver<Maybe<ResolversTypes['VariableTheme']>, ParentType, ContextType>;
  timeseries?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['VariableType']>, ParentType, ContextType>;
  units?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VariableWithDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['VariableWithData'] = ResolversParentTypes['VariableWithData']> = {
  cenote?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  data?: Resolver<Array<ResolversTypes['MeasurementOrFact']>, ParentType, ContextType>;
  firstTimestamp?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastTimestamp?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  variable?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AuditLog?: AuditLogResolvers<ContextType>;
  Cenote?: CenoteResolvers<ContextType>;
  CenoteBounds?: CenoteBoundsResolvers<ContextType>;
  CenoteLocation?: CenoteLocationResolvers<ContextType>;
  CenoteSocialData?: CenoteSocialDataResolvers<ContextType>;
  CityDistances?: CityDistancesResolvers<ContextType>;
  Comment?: CommentResolvers<ContextType>;
  Coordinates?: CoordinatesResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  Latitude?: GraphQLScalarType;
  Longitude?: GraphQLScalarType;
  MapLayer?: MapLayerResolvers<ContextType>;
  MeasurementOrFact?: MeasurementOrFactResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Species?: SpeciesResolvers<ContextType>;
  URL?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  Variable?: VariableResolvers<ContextType>;
  VariableWithData?: VariableWithDataResolvers<ContextType>;
};


export type DateTime = Scalars["DateTime"];
export type EmailAddress = Scalars["EmailAddress"];
export type Json = Scalars["JSON"];
export type Latitude = Scalars["Latitude"];
export type Longitude = Scalars["Longitude"];
export type Url = Scalars["URL"];