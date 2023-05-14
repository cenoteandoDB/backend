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

export type Cenote = {
  __typename?: 'Cenote';
  alternativeNames?: Maybe<Array<Scalars['String']>>;
  contributors?: Maybe<Array<Maybe<User>>>;
  createdAt?: Maybe<Scalars['DateTime']>;
  creator?: Maybe<User>;
  id: Scalars['ID'];
  issues?: Maybe<Array<Maybe<CenoteIssue>>>;
  location: CenoteLocation;
  maps?: Maybe<Array<Scalars['URL']>>;
  name?: Maybe<Scalars['String']>;
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
  geojson: Scalars['JSON'];
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

export type Mutation = {
  __typename?: 'Mutation';
  createCenote?: Maybe<Cenote>;
  createSpecies?: Maybe<Species>;
  updateEmail?: Maybe<User>;
  updateSpecies?: Maybe<Species>;
};


export type MutationCreateCenoteArgs = {
  new_cenote: NewCenoteInput;
};


export type MutationCreateSpeciesArgs = {
  new_species: NewSpeciesInput;
};


export type MutationUpdateEmailArgs = {
  email: Scalars['EmailAddress'];
  id: Scalars['ID'];
};


export type MutationUpdateSpeciesArgs = {
  new_species: UpdateSpeciesInput;
};

export type NewCenoteInput = {
  coordinates: CoordinatesInput;
};

export type NewSpeciesInput = {
  aphiaId?: InputMaybe<Scalars['String']>;
  iNaturalistId?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  cenoteById?: Maybe<Cenote>;
  cenotes?: Maybe<Array<Maybe<Cenote>>>;
  cenotesBounds?: Maybe<CenoteBounds>;
  cenotesCsv?: Maybe<Scalars['String']>;
  species?: Maybe<Array<Maybe<Species>>>;
  speciesByAphiaId?: Maybe<Species>;
  speciesByINaturalistId?: Maybe<Species>;
  speciesById?: Maybe<Species>;
  speciesCsv?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryCenoteByIdArgs = {
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


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type Species = {
  __typename?: 'Species';
  aphiaId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  iNaturalistId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UpdateSpeciesInput = {
  aphiaId?: InputMaybe<Scalars['String']>;
  iNaturalistId?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['EmailAddress'];
  id: Scalars['ID'];
  name: Scalars['String'];
  password: Scalars['String'];
  role: UserRole;
};

export type UserRole =
  | 'ADMIN'
  | 'BASIC'
  | 'CENOTERO_ADVANCED';



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
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Cenote: ResolverTypeWrapper<Cenote>;
  CenoteBounds: ResolverTypeWrapper<CenoteBounds>;
  CenoteIssue: CenoteIssue;
  CenoteLocation: ResolverTypeWrapper<CenoteLocation>;
  CenoteSocialData: ResolverTypeWrapper<CenoteSocialData>;
  CenoteType: CenoteType;
  Comment: ResolverTypeWrapper<Comment>;
  Coordinates: ResolverTypeWrapper<Coordinates>;
  CoordinatesInput: CoordinatesInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  Latitude: ResolverTypeWrapper<Scalars['Latitude']>;
  Longitude: ResolverTypeWrapper<Scalars['Longitude']>;
  Mutation: ResolverTypeWrapper<{}>;
  NewCenoteInput: NewCenoteInput;
  NewSpeciesInput: NewSpeciesInput;
  Query: ResolverTypeWrapper<{}>;
  Species: ResolverTypeWrapper<Species>;
  String: ResolverTypeWrapper<Scalars['String']>;
  URL: ResolverTypeWrapper<Scalars['URL']>;
  UpdateSpeciesInput: UpdateSpeciesInput;
  User: ResolverTypeWrapper<User>;
  UserRole: UserRole;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Cenote: Cenote;
  CenoteBounds: CenoteBounds;
  CenoteLocation: CenoteLocation;
  CenoteSocialData: CenoteSocialData;
  Comment: Comment;
  Coordinates: Coordinates;
  CoordinatesInput: CoordinatesInput;
  DateTime: Scalars['DateTime'];
  EmailAddress: Scalars['EmailAddress'];
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  JSON: Scalars['JSON'];
  Latitude: Scalars['Latitude'];
  Longitude: Scalars['Longitude'];
  Mutation: {};
  NewCenoteInput: NewCenoteInput;
  NewSpeciesInput: NewSpeciesInput;
  Query: {};
  Species: Species;
  String: Scalars['String'];
  URL: Scalars['URL'];
  UpdateSpeciesInput: UpdateSpeciesInput;
  User: User;
};

export type CenoteResolvers<ContextType = any, ParentType extends ResolversParentTypes['Cenote'] = ResolversParentTypes['Cenote']> = {
  alternativeNames?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  contributors?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  creator?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  issues?: Resolver<Maybe<Array<Maybe<ResolversTypes['CenoteIssue']>>>, ParentType, ContextType>;
  location?: Resolver<ResolversTypes['CenoteLocation'], ParentType, ContextType>;
  maps?: Resolver<Maybe<Array<ResolversTypes['URL']>>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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
  geojson?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  municipality?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  state?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CenoteSocialDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['CenoteSocialData'] = ResolversParentTypes['CenoteSocialData']> = {
  comments?: Resolver<Maybe<Array<Maybe<ResolversTypes['Comment']>>>, ParentType, ContextType>;
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

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createCenote?: Resolver<Maybe<ResolversTypes['Cenote']>, ParentType, ContextType, RequireFields<MutationCreateCenoteArgs, 'new_cenote'>>;
  createSpecies?: Resolver<Maybe<ResolversTypes['Species']>, ParentType, ContextType, RequireFields<MutationCreateSpeciesArgs, 'new_species'>>;
  updateEmail?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateEmailArgs, 'email' | 'id'>>;
  updateSpecies?: Resolver<Maybe<ResolversTypes['Species']>, ParentType, ContextType, RequireFields<MutationUpdateSpeciesArgs, 'new_species'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  cenoteById?: Resolver<Maybe<ResolversTypes['Cenote']>, ParentType, ContextType, RequireFields<QueryCenoteByIdArgs, 'id'>>;
  cenotes?: Resolver<Maybe<Array<Maybe<ResolversTypes['Cenote']>>>, ParentType, ContextType>;
  cenotesBounds?: Resolver<Maybe<ResolversTypes['CenoteBounds']>, ParentType, ContextType>;
  cenotesCsv?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  species?: Resolver<Maybe<Array<Maybe<ResolversTypes['Species']>>>, ParentType, ContextType>;
  speciesByAphiaId?: Resolver<Maybe<ResolversTypes['Species']>, ParentType, ContextType, RequireFields<QuerySpeciesByAphiaIdArgs, 'aphiaId'>>;
  speciesByINaturalistId?: Resolver<Maybe<ResolversTypes['Species']>, ParentType, ContextType, RequireFields<QuerySpeciesByINaturalistIdArgs, 'iNaturalist'>>;
  speciesById?: Resolver<Maybe<ResolversTypes['Species']>, ParentType, ContextType, RequireFields<QuerySpeciesByIdArgs, 'id'>>;
  speciesCsv?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
};

export type SpeciesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Species'] = ResolversParentTypes['Species']> = {
  aphiaId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  iNaturalistId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
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
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['UserRole'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Cenote?: CenoteResolvers<ContextType>;
  CenoteBounds?: CenoteBoundsResolvers<ContextType>;
  CenoteLocation?: CenoteLocationResolvers<ContextType>;
  CenoteSocialData?: CenoteSocialDataResolvers<ContextType>;
  Comment?: CommentResolvers<ContextType>;
  Coordinates?: CoordinatesResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  Latitude?: GraphQLScalarType;
  Longitude?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Species?: SpeciesResolvers<ContextType>;
  URL?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
};


export type DateTime = Scalars["DateTime"];
export type EmailAddress = Scalars["EmailAddress"];
export type Json = Scalars["JSON"];
export type Latitude = Scalars["Latitude"];
export type Longitude = Scalars["Longitude"];
export type Url = Scalars["URL"];