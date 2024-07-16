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
  Coordinate: any;
  DateTime: any;
  EmailAddress: any;
  JSON: any;
  Latitude: any;
  Longitude: any;
  URL: any;
};

export type AccessLevel =
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
  | 'DELETE_CENOTE'
  | 'DELETE_REFERENCE'
  | 'DELETE_VARIABLE'
  | 'NEW_CENOTE'
  | 'NEW_REFERENCE'
  | 'NEW_VARIABLE'
  | 'UPDATED_CENOTE'
  | 'UPDATED_REFERENCE'
  | 'UPDATED_VARIABLE';

export type Cenote = {
  __typename?: 'Cenote';
  altnames: Array<Scalars['String']>;
  cenoteando_id: Scalars['ID'];
  createdAt?: Maybe<Scalars['DateTime']>;
  firestore_id: Scalars['ID'];
  latitude: Scalars['Latitude'];
  longitude: Scalars['Longitude'];
  maps?: Maybe<Array<Scalars['URL']>>;
  municipality: Scalars['String'];
  name: Scalars['String'];
  photos?: Maybe<Array<Scalars['URL']>>;
  reference_count: Scalars['Int'];
  references?: Maybe<Array<Reference>>;
  referencesIds?: Maybe<Array<Scalars['String']>>;
  species?: Maybe<Array<Species>>;
  speciesIds?: Maybe<Array<Scalars['String']>>;
  species_count: Scalars['Int'];
  state: Scalars['String'];
  touristic: Scalars['Boolean'];
  type?: Maybe<CenoteType>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  variable_count: Scalars['Int'];
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

export type CenoteList = {
  __typename?: 'CenoteList';
  cenotes: Array<Cenote>;
  totalCount: Scalars['Int'];
};

export type CenoteLocation = {
  __typename?: 'CenoteLocation';
  coordinates: Scalars['Coordinate'];
  country: Scalars['String'];
  county: Scalars['String'];
  geojson: Scalars['JSON'];
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

export type Degree =
  | 'BACHELOR'
  | 'DIPLOMATE'
  | 'DOCTORATE'
  | 'MASTER'
  | 'PRIMARY'
  | 'SECOUNDARY'
  | 'SPECIALIZATION';

export type DeleteMofInput = {
  cenoteId: Scalars['ID'];
  timestamp: Scalars['DateTime'];
  value: Scalars['String'];
  variableId: Scalars['ID'];
};

export type FavouriteCenote = {
  __typename?: 'FavouriteCenote';
  cenoteando_id: Scalars['ID'];
  firestore_id: Scalars['ID'];
  municipality: Scalars['String'];
  name: Scalars['String'];
  state: Scalars['String'];
  thumbnail: Scalars['String'];
  touristic: Scalars['Boolean'];
  type?: Maybe<CenoteType>;
};

export type GbifNameType =
  | 'BLACKLISTED'
  | 'CANDIDATUS'
  | 'CULTIVAR'
  | 'DOUBTFUL'
  | 'HYBRID'
  | 'INFORMAL'
  | 'NO_NAME'
  | 'OTU'
  | 'PLACEHOLDER'
  | 'SCIENTIFIC'
  | 'VIRUS';

export type GbifNameUsage = {
  __typename?: 'GBIFNameUsage';
  authorship?: Maybe<Scalars['String']>;
  basionym?: Maybe<Scalars['String']>;
  basionymKey?: Maybe<Scalars['Int']>;
  canonicalName?: Maybe<Scalars['String']>;
  class?: Maybe<Scalars['String']>;
  classKey?: Maybe<Scalars['Int']>;
  constituentKey?: Maybe<Scalars['String']>;
  datasetKey?: Maybe<Scalars['String']>;
  family?: Maybe<Scalars['String']>;
  familyKey?: Maybe<Scalars['Int']>;
  genus?: Maybe<Scalars['String']>;
  genusKey?: Maybe<Scalars['Int']>;
  issues?: Maybe<Array<Scalars['String']>>;
  key?: Maybe<Scalars['Int']>;
  kingdom?: Maybe<Scalars['String']>;
  kingdomKey?: Maybe<Scalars['Int']>;
  lastCrawled?: Maybe<Scalars['String']>;
  lastInterpreted?: Maybe<Scalars['String']>;
  nameKey?: Maybe<Scalars['Int']>;
  nameType?: Maybe<GbifNameType>;
  nomenclaturalStatus?: Maybe<Array<Scalars['String']>>;
  nubKey?: Maybe<Scalars['Int']>;
  numDescendants?: Maybe<Scalars['Int']>;
  order?: Maybe<Scalars['String']>;
  orderKey?: Maybe<Scalars['Int']>;
  origin?: Maybe<GbifOrigin>;
  parent?: Maybe<Scalars['String']>;
  parentKey?: Maybe<Scalars['Int']>;
  phylum?: Maybe<Scalars['String']>;
  phylumKey?: Maybe<Scalars['Int']>;
  publishedIn?: Maybe<Scalars['String']>;
  rank?: Maybe<GbifTaxonomicRank>;
  remarks?: Maybe<Scalars['String']>;
  scientificName?: Maybe<Scalars['String']>;
  sourceTaxonKey?: Maybe<Scalars['Int']>;
  species?: Maybe<Scalars['String']>;
  speciesKey?: Maybe<Scalars['Int']>;
  taxonID?: Maybe<Scalars['String']>;
  taxonomicStatus?: Maybe<GbifTaxonomicStatus>;
  vernacularName?: Maybe<Scalars['String']>;
};

export type GbifOrigin =
  | 'AUTONYM'
  | 'BASIONYM_PLACEHOLDER'
  | 'DENORMED_CLASSIFICATION'
  | 'EX_AUTHOR_SYNONYM'
  | 'IMPLICIT_NAME'
  | 'MISSING_ACCEPTED'
  | 'OTHER'
  | 'PROPARTE'
  | 'SOURCE'
  | 'VERBATIM_ACCEPTED'
  | 'VERBATIM_BASIONYM'
  | 'VERBATIM_PARENT';

export type GbifSuggestion = {
  __typename?: 'GBIFSuggestion';
  canonicalName?: Maybe<Scalars['String']>;
  class?: Maybe<Scalars['String']>;
  family?: Maybe<Scalars['String']>;
  genus?: Maybe<Scalars['String']>;
  key: Scalars['ID'];
  kingdom?: Maybe<Scalars['String']>;
  order?: Maybe<Scalars['String']>;
  phylum?: Maybe<Scalars['String']>;
  rank?: Maybe<GbifTaxonomicRank>;
  species?: Maybe<Scalars['String']>;
};

export type GbifTaxonomicRank =
  | 'ABERRATION'
  | 'BIOVAR'
  | 'CHEMOFORM'
  | 'CHEMOVAR'
  | 'CLASS'
  | 'COHORT'
  | 'CONVARIETY'
  | 'CULTIVAR'
  | 'CULTIVAR_GROUP'
  | 'DOMAIN'
  | 'FAMILY'
  | 'FORM'
  | 'FORMA_SPECIALIS'
  | 'GENUS'
  | 'GRANDORDER'
  | 'GREX'
  | 'INFRACLASS'
  | 'INFRACOHORT'
  | 'INFRAFAMILY'
  | 'INFRAGENERIC_NAME'
  | 'INFRAGENUS'
  | 'INFRAKINGDOM'
  | 'INFRALEGION'
  | 'INFRAORDER'
  | 'INFRAPHYLUM'
  | 'INFRASPECIFIC_NAME'
  | 'INFRASUBSPECIFIC_NAME'
  | 'INFRATRIBE'
  | 'KINGDOM'
  | 'LEGION'
  | 'MAGNORDER'
  | 'MORPH'
  | 'MORPHOVAR'
  | 'NATIO'
  | 'ORDER'
  | 'OTHER'
  | 'PARVCLASS'
  | 'PARVORDER'
  | 'PATHOVAR'
  | 'PHAGOVAR'
  | 'PHYLUM'
  | 'PROLES'
  | 'RACE'
  | 'SECTION'
  | 'SERIES'
  | 'SEROVAR'
  | 'SPECIES'
  | 'SPECIES_AGGREGATE'
  | 'STRAIN'
  | 'SUBCLASS'
  | 'SUBCOHORT'
  | 'SUBFAMILY'
  | 'SUBFORM'
  | 'SUBGENUS'
  | 'SUBKINGDOM'
  | 'SUBLEGION'
  | 'SUBORDER'
  | 'SUBPHYLUM'
  | 'SUBSECTION'
  | 'SUBSERIES'
  | 'SUBSPECIES'
  | 'SUBTRIBE'
  | 'SUBVARIETY'
  | 'SUPERCLASS'
  | 'SUPERCOHORT'
  | 'SUPERFAMILY'
  | 'SUPERKINGDOM'
  | 'SUPERLEGION'
  | 'SUPERORDER'
  | 'SUPERPHYLUM'
  | 'SUPERTRIBE'
  | 'SUPRAGENERIC_NAME'
  | 'TRIBE'
  | 'UNRANKED'
  | 'VARIETY';

export type GbifTaxonomicStatus =
  | 'ACCEPTED'
  | 'DOUBTFUL'
  | 'HETEROTYPIC_SYNONYM'
  | 'HOMOTYPIC_SYNONYM'
  | 'MISAPPLIED'
  | 'PROPARTE_SYNONYM'
  | 'SYNONYM';

export type GovernType =
  | 'FEDERAL'
  | 'MUNICIPAL'
  | 'STATE';

export type LayerCategory =
  | 'ANTROPOGENICA'
  | 'CLIMA'
  | 'GEO_ESTATISTICA'
  | 'HIDROLOGIA'
  | 'INTRINSECA';

export type MapLayer = {
  __typename?: 'MapLayer';
  category?: Maybe<LayerCategory>;
  description?: Maybe<Scalars['String']>;
  geojson?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  metadata?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  thumbnail?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['String']>;
};

export type MapLayerInput = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  name: Scalars['String'];
};

export type MeasurementOrFact = {
  __typename?: 'MeasurementOrFact';
  timestamp: Scalars['DateTime'];
  value: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addFavouriteCenote?: Maybe<Scalars['Boolean']>;
  create?: Maybe<MapLayer>;
  createCenote?: Maybe<Cenote>;
  createMof?: Maybe<VariableWithData>;
  createReference?: Maybe<Reference>;
  createVariable?: Maybe<Variable>;
  deleteCenote?: Maybe<Scalars['Boolean']>;
  deleteMof?: Maybe<Scalars['Boolean']>;
  deleteReference?: Maybe<Scalars['Boolean']>;
  deleteUser: Scalars['Boolean'];
  deleteVariable: Scalars['Boolean'];
  inviteUser: Scalars['Boolean'];
  login: Scalars['String'];
  register: User;
  registerGovern?: Maybe<User>;
  registerInvestigator?: Maybe<User>;
  registerStudent?: Maybe<User>;
  registerTeacher?: Maybe<User>;
  registerTourist?: Maybe<User>;
  removeFavouriteCenote?: Maybe<Scalars['Boolean']>;
  updateCenote?: Maybe<Cenote>;
  updateCenotePermissions?: Maybe<User>;
  updateReference?: Maybe<Reference>;
  updateUserInfo?: Maybe<User>;
  updateVariable?: Maybe<Variable>;
  updateVariablePermissions?: Maybe<User>;
  uploadMap?: Maybe<Scalars['Boolean']>;
  uploadPhoto?: Maybe<Scalars['Boolean']>;
};


export type MutationAddFavouriteCenoteArgs = {
  cenoteId: Scalars['ID'];
  userId: Scalars['ID'];
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


export type MutationCreateReferenceArgs = {
  new_reference: NewReferenceInput;
};


export type MutationCreateVariableArgs = {
  new_variable: NewVariableInput;
};


export type MutationDeleteCenoteArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteMofArgs = {
  delete_mof_input: DeleteMofInput;
};


export type MutationDeleteReferenceArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUserArgs = {
  userId: Scalars['ID'];
};


export type MutationDeleteVariableArgs = {
  id: Scalars['ID'];
};


export type MutationInviteUserArgs = {
  email: Scalars['EmailAddress'];
  name: Scalars['String'];
  userRole: UserRole;
};


export type MutationLoginArgs = {
  email: Scalars['EmailAddress'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  userInfo: RegisterUserInput;
};


export type MutationRegisterGovernArgs = {
  profileData: RegisterGovernInput;
  userInfo: RegisterUserInput;
};


export type MutationRegisterInvestigatorArgs = {
  profileData: RegisterInvestigatorInput;
  userInfo: RegisterUserInput;
};


export type MutationRegisterStudentArgs = {
  profileData: RegisterStudentInput;
  userInfo: RegisterUserInput;
};


export type MutationRegisterTeacherArgs = {
  profileData: RegisterStudentInput;
  userInfo: RegisterUserInput;
};


export type MutationRegisterTouristArgs = {
  profileData: RegisterTouristInput;
  userInfo: RegisterUserInput;
};


export type MutationRemoveFavouriteCenoteArgs = {
  cenoteId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type MutationUpdateCenoteArgs = {
  updated_cenote: UpdatedCenoteInput;
};


export type MutationUpdateCenotePermissionsArgs = {
  cenotePermissions: UpdateCenotePermissions;
  userId: Scalars['String'];
};


export type MutationUpdateReferenceArgs = {
  id: Scalars['ID'];
  updated_reference: UpdatedReferenceInput;
};


export type MutationUpdateUserInfoArgs = {
  userId: Scalars['String'];
  userInfo: UpdateUserInfoInput;
};


export type MutationUpdateVariableArgs = {
  firestore_id: Scalars['String'];
  updated_variable: UpdateVariableInput;
};


export type MutationUpdateVariablePermissionsArgs = {
  userId: Scalars['String'];
  variablePermissions: UpdateVariablePermissions;
};


export type MutationUploadMapArgs = {
  mapInput: PhotoOrMapUploadInput;
};


export type MutationUploadPhotoArgs = {
  photoInput: PhotoOrMapUploadInput;
};

export type NewCenoteInput = {
  coordinates: CoordinatesInput;
};

export type NewMeasurementOrFactInput = {
  cenoteId: Scalars['ID'];
  timestamp: Scalars['DateTime'];
  value: Scalars['String'];
  variableId: Scalars['ID'];
};

export type NewReferenceInput = {
  authors: Array<Scalars['String']>;
  book?: InputMaybe<Scalars['String']>;
  cenoteando_id?: InputMaybe<Scalars['ID']>;
  date_primary?: InputMaybe<Scalars['Int']>;
  date_secondary?: InputMaybe<Scalars['Int']>;
  doi?: InputMaybe<Scalars['String']>;
  has_pdf: Scalars['Boolean'];
  institution?: InputMaybe<Scalars['String']>;
  issue?: InputMaybe<Scalars['String']>;
  journal_name?: InputMaybe<Scalars['String']>;
  keywords?: InputMaybe<Array<Scalars['String']>>;
  mendeley_ref: Scalars['Boolean'];
  pages?: InputMaybe<Scalars['String']>;
  pdf_base64?: InputMaybe<Scalars['String']>;
  pdf_name?: InputMaybe<Scalars['String']>;
  referenced_cenotes: Array<Scalars['String']>;
  referenced_species: Array<Scalars['String']>;
  short_name?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  type: ReferenceType;
  unique_code?: InputMaybe<Scalars['String']>;
  uploaded_dropbox: Scalars['Boolean'];
  uploaded_gcp: Scalars['Boolean'];
  uploaded_mendeley: Scalars['Boolean'];
  url?: InputMaybe<Scalars['String']>;
  validated_mendeley: Scalars['Boolean'];
};

export type NewVariableInput = {
  accessLevel: AccessLevel;
  category: VariableCategory;
  cenote_count?: InputMaybe<Scalars['Int']>;
  description: Scalars['String'];
  methodology?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  origin: VariableOrigin;
  sphere: VariableSphere;
  theme: VariableTheme;
  timeseries: Scalars['Boolean'];
  type: VariableType;
  units?: InputMaybe<Scalars['String']>;
};

export type PaginationInput = {
  limit: Scalars['Int'];
  offset: Scalars['Int'];
};

export type PhotoOrMapUploadInput = {
  cenoteId: Scalars['ID'];
  content: Scalars['String'];
  extension: Scalars['String'];
  filename: Scalars['String'];
};

export type ProfileData = {
  __typename?: 'ProfileData';
  companyName?: Maybe<Scalars['String']>;
  companyUrl?: Maybe<Scalars['String']>;
  degree?: Maybe<Degree>;
  googleScholar?: Maybe<Scalars['String']>;
  govern_institution?: Maybe<Scalars['String']>;
  govern_type?: Maybe<GovernType>;
  linkedin?: Maybe<Scalars['String']>;
  orchid?: Maybe<Scalars['String']>;
  researchGate?: Maybe<Scalars['String']>;
  school?: Maybe<Scalars['String']>;
  subject?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  auditLogs?: Maybe<Array<Maybe<AuditLog>>>;
  cenoteById?: Maybe<Cenote>;
  cenotesBounds?: Maybe<CenoteBounds>;
  cenotesCsv?: Maybe<Scalars['String']>;
  getCenoteData?: Maybe<Array<VariableWithData>>;
  getCenoteDataByTheme?: Maybe<Array<VariableWithData>>;
  getCenoteDataByVariable?: Maybe<VariableWithData>;
  getCenotes: CenoteList;
  getReferenceById?: Maybe<Reference>;
  getReferences: ReferenceList;
  getSpecies: SpeciesList;
  getSpeciesByGbifId?: Maybe<Species>;
  getSpeciesByINaturalistId?: Maybe<Species>;
  getSpeciesById?: Maybe<Species>;
  getThemesByCenote: Array<Scalars['String']>;
  getUserByEmail?: Maybe<User>;
  getUserById?: Maybe<User>;
  getUserByName: Array<User>;
  getUsers: UserList;
  getVariableById?: Maybe<Variable>;
  getVariables: VariableList;
  getVariablesByTheme: Array<Variable>;
  layer?: Maybe<MapLayer>;
  layers?: Maybe<Array<Maybe<MapLayer>>>;
  verifyCode?: Maybe<User>;
};


export type QueryAuditLogsArgs = {
  id: Scalars['ID'];
  type: AuditLogType;
};


export type QueryCenoteByIdArgs = {
  id: Scalars['ID'];
};


export type QueryGetCenoteDataArgs = {
  cenoteId: Scalars['ID'];
};


export type QueryGetCenoteDataByThemeArgs = {
  cenoteId: Scalars['ID'];
  theme: VariableTheme;
};


export type QueryGetCenoteDataByVariableArgs = {
  cenoteId: Scalars['ID'];
  variableId: Scalars['ID'];
};


export type QueryGetCenotesArgs = {
  name?: InputMaybe<Scalars['String']>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortField>;
};


export type QueryGetReferenceByIdArgs = {
  id: Scalars['ID'];
};


export type QueryGetReferencesArgs = {
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortField>;
  title?: InputMaybe<Scalars['String']>;
};


export type QueryGetSpeciesArgs = {
  name?: InputMaybe<Scalars['String']>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortField>;
};


export type QueryGetSpeciesByGbifIdArgs = {
  gbifId: Scalars['ID'];
};


export type QueryGetSpeciesByINaturalistIdArgs = {
  inaturalistId: Scalars['ID'];
};


export type QueryGetSpeciesByIdArgs = {
  id: Scalars['ID'];
};


export type QueryGetThemesByCenoteArgs = {
  cenoteId: Scalars['ID'];
};


export type QueryGetUserByEmailArgs = {
  email: Scalars['String'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['ID'];
};


export type QueryGetUserByNameArgs = {
  name: Scalars['String'];
};


export type QueryGetUsersArgs = {
  name?: InputMaybe<Scalars['String']>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortField>;
};


export type QueryGetVariableByIdArgs = {
  id: Scalars['ID'];
};


export type QueryGetVariablesArgs = {
  name?: InputMaybe<Scalars['String']>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortField>;
};


export type QueryGetVariablesByThemeArgs = {
  theme: VariableTheme;
};


export type QueryLayerArgs = {
  id: Scalars['ID'];
};


export type QueryVerifyCodeArgs = {
  code: Scalars['String'];
};

export type Reference = {
  __typename?: 'Reference';
  authors: Array<Scalars['String']>;
  book?: Maybe<Scalars['String']>;
  cenoteando_id?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  date_primary?: Maybe<Scalars['Int']>;
  date_secondary?: Maybe<Scalars['Int']>;
  doi?: Maybe<Scalars['String']>;
  firestore_id: Scalars['ID'];
  has_pdf: Scalars['Boolean'];
  institution?: Maybe<Scalars['String']>;
  issue?: Maybe<Scalars['String']>;
  journal_name?: Maybe<Scalars['String']>;
  keywords?: Maybe<Array<Scalars['String']>>;
  mendeley_ref: Scalars['Boolean'];
  pages?: Maybe<Scalars['String']>;
  pdf_name?: Maybe<Scalars['String']>;
  pdf_url?: Maybe<Scalars['String']>;
  referenced_cenotes: Array<Scalars['String']>;
  referenced_species: Array<Scalars['String']>;
  short_name?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  type: ReferenceType;
  unique_code: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  uploaded_dropbox: Scalars['Boolean'];
  uploaded_gcp: Scalars['Boolean'];
  uploaded_mendeley: Scalars['Boolean'];
  url?: Maybe<Scalars['String']>;
  validated_mendeley: Scalars['Boolean'];
};

export type ReferenceList = {
  __typename?: 'ReferenceList';
  references: Array<Reference>;
  totalCount: Scalars['Int'];
};

export type ReferenceType =
  | 'BOOK'
  | 'BOOK_CHAPTER'
  | 'JOURNAL'
  | 'OTHER'
  | 'REPORT'
  | 'THESIS'
  | 'WEB_PAGE';

export type RegisterGovernInput = {
  govern: GovernType;
  institution: Scalars['String'];
};

export type RegisterInvestigatorInput = {
  googleScholar: Scalars['String'];
  linkedin?: InputMaybe<Scalars['String']>;
  orchid: Scalars['String'];
  researchGate: Scalars['String'];
};

export type RegisterStudentInput = {
  degree: Scalars['String'];
  school: Scalars['String'];
};

export type RegisterTouristInput = {
  companyName?: InputMaybe<Scalars['String']>;
  companyUrl?: InputMaybe<Scalars['String']>;
};

export type RegisterUserInput = {
  email: Scalars['EmailAddress'];
  name: Scalars['String'];
  password: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
  surname: Scalars['String'];
};

export type SortField = {
  field: Scalars['String'];
  sortOrder: SortOrder;
};

export type SortOrder =
  | 'ASC'
  | 'DESC';

export type Species = {
  __typename?: 'Species';
  createdAt?: Maybe<Scalars['DateTime']>;
  gbifId?: Maybe<Scalars['ID']>;
  id: Scalars['ID'];
  inaturalistId?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  thumbnail?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type SpeciesList = {
  __typename?: 'SpeciesList';
  species: Array<Species>;
  totalCount: Scalars['Int'];
};

export type UpdateCenotePermissions = {
  cenoteEditBlackList: Array<Scalars['String']>;
  cenoteEditWhiteList: Array<Scalars['String']>;
  cenoteViewBlackList: Array<Scalars['String']>;
  cenoteViewWhiteList: Array<Scalars['String']>;
};

export type UpdateUserInfoInput = {
  email: Scalars['EmailAddress'];
  name: Scalars['String'];
  password?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<UserRole>;
  surname: Scalars['String'];
};

export type UpdateVariableInput = {
  accessLevel: AccessLevel;
  category: VariableCategory;
  cenote_count?: InputMaybe<Scalars['Int']>;
  description: Scalars['String'];
  firestore_id: Scalars['ID'];
  methodology?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  origin: VariableOrigin;
  sphere: VariableSphere;
  theme: VariableTheme;
  timeseries: Scalars['Boolean'];
  type: VariableType;
  units?: InputMaybe<Scalars['String']>;
};

export type UpdateVariablePermissions = {
  variableEditBlackList: Array<Scalars['String']>;
  variableEditWhiteList: Array<Scalars['String']>;
  variableViewBlackList: Array<Scalars['String']>;
  variableViewWhiteList: Array<Scalars['String']>;
};

export type UpdatedCenoteInput = {
  alternativeNames?: InputMaybe<Array<Scalars['String']>>;
  id: Scalars['ID'];
  issues?: InputMaybe<Array<InputMaybe<CenoteIssue>>>;
  name?: InputMaybe<Scalars['String']>;
  touristic?: InputMaybe<Scalars['Boolean']>;
  type?: InputMaybe<CenoteType>;
};

export type UpdatedReferenceInput = {
  authors: Array<Scalars['String']>;
  book?: InputMaybe<Scalars['String']>;
  cenoteando_id?: InputMaybe<Scalars['ID']>;
  date_primary?: InputMaybe<Scalars['Int']>;
  date_secondary?: InputMaybe<Scalars['Int']>;
  doi?: InputMaybe<Scalars['String']>;
  firestore_id: Scalars['ID'];
  has_pdf: Scalars['Boolean'];
  institution?: InputMaybe<Scalars['String']>;
  issue?: InputMaybe<Scalars['String']>;
  journal_name?: InputMaybe<Scalars['String']>;
  keywords?: InputMaybe<Array<Scalars['String']>>;
  mendeley_ref: Scalars['Boolean'];
  pages?: InputMaybe<Scalars['String']>;
  pdf_name?: InputMaybe<Scalars['String']>;
  pdf_url?: InputMaybe<Scalars['String']>;
  referenced_cenotes: Array<Scalars['String']>;
  referenced_species: Array<Scalars['String']>;
  short_name?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  type: ReferenceType;
  unique_code: Scalars['String'];
  uploaded_dropbox: Scalars['Boolean'];
  uploaded_gcp: Scalars['Boolean'];
  uploaded_mendeley: Scalars['Boolean'];
  url?: InputMaybe<Scalars['String']>;
  validated_mendeley: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  cenoteEditBlackList: Array<Scalars['String']>;
  cenoteEditWhiteList: Array<Scalars['String']>;
  cenoteViewBlackList: Array<Scalars['String']>;
  cenoteViewWhiteList: Array<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  email: Scalars['EmailAddress'];
  favouriteCenotes: Array<FavouriteCenote>;
  favouriteCenotesIds: Array<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  password: Scalars['String'];
  profile?: Maybe<UserProfile>;
  profileData?: Maybe<ProfileData>;
  role: UserRole;
  surname?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  variableEditBlackList: Array<Scalars['String']>;
  variableEditWhiteList: Array<Scalars['String']>;
  variableViewBlackList: Array<Scalars['String']>;
  variableViewWhiteList: Array<Scalars['String']>;
};

export type UserList = {
  __typename?: 'UserList';
  totalCount: Scalars['Int'];
  users: Array<User>;
};

export type UserProfile =
  | 'GOVERN'
  | 'INVESTIGATOR'
  | 'STUDENT'
  | 'TEACHER'
  | 'TOURIST';

export type UserRole =
  | 'ADMIN'
  | 'BASIC'
  | 'CURATOR';

export type Variable = {
  __typename?: 'Variable';
  accessLevel: AccessLevel;
  category: VariableCategory;
  cenote_count: Scalars['Int'];
  createdAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  firestore_id?: Maybe<Scalars['ID']>;
  icon?: Maybe<Scalars['String']>;
  methodology?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  origin: VariableOrigin;
  sphere: VariableSphere;
  theme: VariableTheme;
  timeseries: Scalars['Boolean'];
  type: VariableType;
  units?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  variableRepresentation?: Maybe<VariableRepresentation>;
};

export type VariableCategory =
  | 'ADDITIONAL'
  | 'BASIC'
  | 'BIOMARKERS'
  | 'CLIMATE'
  | 'CULTURE'
  | 'ESSENTIAL'
  | 'FARMACEUTIC'
  | 'GEOLOGY'
  | 'GOVERN'
  | 'HEAVY_METAL'
  | 'HIDROLOGY'
  | 'INFRASTRUCTURE'
  | 'LAND'
  | 'LOCATION'
  | 'NUTRIENT'
  | 'ORGANOCHLORINE_PESTICIDES'
  | 'ORGANOPHOSPHATE_PESTICIDES'
  | 'OTHER'
  | 'POLYNUCLEAR_AROMATIC_HYDROCARBONS'
  | 'PROPERTY'
  | 'PROTECTION'
  | 'SOCIAL'
  | 'SPELEDIVING'
  | 'THREATS'
  | 'VOLATILE_HYDROCARBONS'
  | 'WATER';

export type VariableList = {
  __typename?: 'VariableList';
  totalCount: Scalars['Int'];
  variables: Array<Variable>;
};

export type VariableOrigin =
  | 'CALCULATED'
  | 'CALCULATED_OFFICE'
  | 'FIELD'
  | 'FIELD_OFFICE'
  | 'FIELD_WEB'
  | 'OFFICE'
  | 'WEB';

export type VariableRepresentation =
  | 'CHECK'
  | 'ICON'
  | 'LIST'
  | 'TEXT'
  | 'UNITS';

export type VariableSphere =
  | 'HUMAN_SOCIO_ECONOMICAL'
  | 'KARSTICO_AMBIENT_SYSTEM';

export type VariableTheme =
  | 'BIODIVERSITY'
  | 'CULTURAL'
  | 'GEOMORPHOLOGY'
  | 'IDENTIFICATION'
  | 'ORGANIZATION'
  | 'REGULATION'
  | 'TOURISM'
  | 'WATER';

export type VariableType =
  | 'CONTINUOUS'
  | 'DISCRETE'
  | 'NOMINAL'
  | 'ORDINAL';

export type VariableWithData = {
  __typename?: 'VariableWithData';
  cenoteId: Scalars['ID'];
  firstTimestamp: Scalars['DateTime'];
  id: Scalars['ID'];
  lastTimestamp: Scalars['DateTime'];
  measurements: Array<MeasurementOrFact>;
  variableIcon?: Maybe<Scalars['String']>;
  variableId: Scalars['ID'];
  variableName: Scalars['String'];
  variableRepresentation: VariableRepresentation;
  variableUnits?: Maybe<Scalars['String']>;
};

export type INaturalistFlagCounts = {
  __typename?: 'iNaturalistFlagCounts';
  resolved?: Maybe<Scalars['Int']>;
  unresolved?: Maybe<Scalars['Int']>;
};

export type INaturalistPhoto = {
  __typename?: 'iNaturalistPhoto';
  attribution?: Maybe<Scalars['String']>;
  flags?: Maybe<Array<Maybe<Scalars['String']>>>;
  id?: Maybe<Scalars['Int']>;
  large_url?: Maybe<Scalars['String']>;
  license_code?: Maybe<Scalars['String']>;
  medium_url?: Maybe<Scalars['String']>;
  original_dimensions?: Maybe<INaturalistPhotoDimensions>;
  original_url?: Maybe<Scalars['String']>;
  small_url?: Maybe<Scalars['String']>;
  square_url?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type INaturalistPhotoDimensions = {
  __typename?: 'iNaturalistPhotoDimensions';
  height?: Maybe<Scalars['Int']>;
  width?: Maybe<Scalars['Int']>;
};

export type INaturalistSearchTaxonResponse = {
  __typename?: 'iNaturalistSearchTaxonResponse';
  page?: Maybe<Scalars['Int']>;
  per_page?: Maybe<Scalars['Int']>;
  results?: Maybe<Array<Maybe<INaturalistTaxonResult>>>;
  total_results?: Maybe<Scalars['Int']>;
};

export type INaturalistTaxonPhoto = {
  __typename?: 'iNaturalistTaxonPhoto';
  photo?: Maybe<INaturalistPhoto>;
  taxon_id?: Maybe<Scalars['Int']>;
};

export type INaturalistTaxonRecord = {
  __typename?: 'iNaturalistTaxonRecord';
  ancestor_ids?: Maybe<Array<Maybe<Scalars['Int']>>>;
  ancestry?: Maybe<Scalars['String']>;
  atlas_id?: Maybe<Scalars['Int']>;
  complete_species_count?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['String']>;
  current_synonymous_taxon_ids?: Maybe<Array<Maybe<Scalars['Int']>>>;
  default_photo?: Maybe<INaturalistPhoto>;
  extinct?: Maybe<Scalars['Boolean']>;
  flag_counts?: Maybe<INaturalistFlagCounts>;
  iconic_taxon_id?: Maybe<Scalars['Int']>;
  iconic_taxon_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  is_active?: Maybe<Scalars['Boolean']>;
  matched_term?: Maybe<Scalars['String']>;
  min_species_ancestry?: Maybe<Scalars['String']>;
  min_species_taxon_id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  observations_count?: Maybe<Scalars['Int']>;
  parent_id?: Maybe<Scalars['Int']>;
  photos_locked?: Maybe<Scalars['Boolean']>;
  preferred_common_name?: Maybe<Scalars['String']>;
  rank?: Maybe<Scalars['String']>;
  rank_level?: Maybe<Scalars['Int']>;
  taxon_changes_count?: Maybe<Scalars['Int']>;
  taxon_photos?: Maybe<Array<Maybe<INaturalistTaxonPhoto>>>;
  taxon_schemes_count?: Maybe<Scalars['Int']>;
  universal_search_rank?: Maybe<Scalars['Int']>;
  wikipedia_url?: Maybe<Scalars['String']>;
};

export type INaturalistTaxonResult = {
  __typename?: 'iNaturalistTaxonResult';
  matches?: Maybe<Array<Maybe<Scalars['String']>>>;
  record?: Maybe<INaturalistTaxonRecord>;
  score?: Maybe<Scalars['Float']>;
  type?: Maybe<Scalars['String']>;
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
  CenoteList: ResolverTypeWrapper<CenoteList>;
  CenoteLocation: ResolverTypeWrapper<CenoteLocation>;
  CenoteSocialData: ResolverTypeWrapper<CenoteSocialData>;
  CenoteType: CenoteType;
  CityDistances: ResolverTypeWrapper<CityDistances>;
  Comment: ResolverTypeWrapper<Comment>;
  Coordinate: ResolverTypeWrapper<Scalars['Coordinate']>;
  Coordinates: ResolverTypeWrapper<Coordinates>;
  CoordinatesInput: CoordinatesInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Degree: Degree;
  DeleteMofInput: DeleteMofInput;
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']>;
  FavouriteCenote: ResolverTypeWrapper<FavouriteCenote>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  GBIFNameType: GbifNameType;
  GBIFNameUsage: ResolverTypeWrapper<GbifNameUsage>;
  GBIFOrigin: GbifOrigin;
  GBIFSuggestion: ResolverTypeWrapper<GbifSuggestion>;
  GBIFTaxonomicRank: GbifTaxonomicRank;
  GBIFTaxonomicStatus: GbifTaxonomicStatus;
  GovernType: GovernType;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  Latitude: ResolverTypeWrapper<Scalars['Latitude']>;
  LayerCategory: LayerCategory;
  Longitude: ResolverTypeWrapper<Scalars['Longitude']>;
  MapLayer: ResolverTypeWrapper<MapLayer>;
  MapLayerInput: MapLayerInput;
  MeasurementOrFact: ResolverTypeWrapper<MeasurementOrFact>;
  Mutation: ResolverTypeWrapper<{}>;
  NewCenoteInput: NewCenoteInput;
  NewMeasurementOrFactInput: NewMeasurementOrFactInput;
  NewReferenceInput: NewReferenceInput;
  NewVariableInput: NewVariableInput;
  PaginationInput: PaginationInput;
  PhotoOrMapUploadInput: PhotoOrMapUploadInput;
  ProfileData: ResolverTypeWrapper<ProfileData>;
  Query: ResolverTypeWrapper<{}>;
  Reference: ResolverTypeWrapper<Reference>;
  ReferenceList: ResolverTypeWrapper<ReferenceList>;
  ReferenceType: ReferenceType;
  RegisterGovernInput: RegisterGovernInput;
  RegisterInvestigatorInput: RegisterInvestigatorInput;
  RegisterStudentInput: RegisterStudentInput;
  RegisterTouristInput: RegisterTouristInput;
  RegisterUserInput: RegisterUserInput;
  SortField: SortField;
  SortOrder: SortOrder;
  Species: ResolverTypeWrapper<Species>;
  SpeciesList: ResolverTypeWrapper<SpeciesList>;
  String: ResolverTypeWrapper<Scalars['String']>;
  URL: ResolverTypeWrapper<Scalars['URL']>;
  UpdateCenotePermissions: UpdateCenotePermissions;
  UpdateUserInfoInput: UpdateUserInfoInput;
  UpdateVariableInput: UpdateVariableInput;
  UpdateVariablePermissions: UpdateVariablePermissions;
  UpdatedCenoteInput: UpdatedCenoteInput;
  UpdatedReferenceInput: UpdatedReferenceInput;
  User: ResolverTypeWrapper<User>;
  UserList: ResolverTypeWrapper<UserList>;
  UserProfile: UserProfile;
  UserRole: UserRole;
  Variable: ResolverTypeWrapper<Variable>;
  VariableCategory: VariableCategory;
  VariableList: ResolverTypeWrapper<VariableList>;
  VariableOrigin: VariableOrigin;
  VariableRepresentation: VariableRepresentation;
  VariableSphere: VariableSphere;
  VariableTheme: VariableTheme;
  VariableType: VariableType;
  VariableWithData: ResolverTypeWrapper<VariableWithData>;
  iNaturalistFlagCounts: ResolverTypeWrapper<INaturalistFlagCounts>;
  iNaturalistPhoto: ResolverTypeWrapper<INaturalistPhoto>;
  iNaturalistPhotoDimensions: ResolverTypeWrapper<INaturalistPhotoDimensions>;
  iNaturalistSearchTaxonResponse: ResolverTypeWrapper<INaturalistSearchTaxonResponse>;
  iNaturalistTaxonPhoto: ResolverTypeWrapper<INaturalistTaxonPhoto>;
  iNaturalistTaxonRecord: ResolverTypeWrapper<INaturalistTaxonRecord>;
  iNaturalistTaxonResult: ResolverTypeWrapper<INaturalistTaxonResult>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuditLog: AuditLog;
  Boolean: Scalars['Boolean'];
  Cenote: Cenote;
  CenoteBounds: CenoteBounds;
  CenoteList: CenoteList;
  CenoteLocation: CenoteLocation;
  CenoteSocialData: CenoteSocialData;
  CityDistances: CityDistances;
  Comment: Comment;
  Coordinate: Scalars['Coordinate'];
  Coordinates: Coordinates;
  CoordinatesInput: CoordinatesInput;
  DateTime: Scalars['DateTime'];
  DeleteMofInput: DeleteMofInput;
  EmailAddress: Scalars['EmailAddress'];
  FavouriteCenote: FavouriteCenote;
  Float: Scalars['Float'];
  GBIFNameUsage: GbifNameUsage;
  GBIFSuggestion: GbifSuggestion;
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
  NewReferenceInput: NewReferenceInput;
  NewVariableInput: NewVariableInput;
  PaginationInput: PaginationInput;
  PhotoOrMapUploadInput: PhotoOrMapUploadInput;
  ProfileData: ProfileData;
  Query: {};
  Reference: Reference;
  ReferenceList: ReferenceList;
  RegisterGovernInput: RegisterGovernInput;
  RegisterInvestigatorInput: RegisterInvestigatorInput;
  RegisterStudentInput: RegisterStudentInput;
  RegisterTouristInput: RegisterTouristInput;
  RegisterUserInput: RegisterUserInput;
  SortField: SortField;
  Species: Species;
  SpeciesList: SpeciesList;
  String: Scalars['String'];
  URL: Scalars['URL'];
  UpdateCenotePermissions: UpdateCenotePermissions;
  UpdateUserInfoInput: UpdateUserInfoInput;
  UpdateVariableInput: UpdateVariableInput;
  UpdateVariablePermissions: UpdateVariablePermissions;
  UpdatedCenoteInput: UpdatedCenoteInput;
  UpdatedReferenceInput: UpdatedReferenceInput;
  User: User;
  UserList: UserList;
  Variable: Variable;
  VariableList: VariableList;
  VariableWithData: VariableWithData;
  iNaturalistFlagCounts: INaturalistFlagCounts;
  iNaturalistPhoto: INaturalistPhoto;
  iNaturalistPhotoDimensions: INaturalistPhotoDimensions;
  iNaturalistSearchTaxonResponse: INaturalistSearchTaxonResponse;
  iNaturalistTaxonPhoto: INaturalistTaxonPhoto;
  iNaturalistTaxonRecord: INaturalistTaxonRecord;
  iNaturalistTaxonResult: INaturalistTaxonResult;
};

export type AuditLogResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuditLog'] = ResolversParentTypes['AuditLog']> = {
  arguments?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  objectId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['AuditLogType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CenoteResolvers<ContextType = any, ParentType extends ResolversParentTypes['Cenote'] = ResolversParentTypes['Cenote']> = {
  altnames?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  cenoteando_id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  firestore_id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Latitude'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Longitude'], ParentType, ContextType>;
  maps?: Resolver<Maybe<Array<ResolversTypes['URL']>>, ParentType, ContextType>;
  municipality?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  photos?: Resolver<Maybe<Array<ResolversTypes['URL']>>, ParentType, ContextType>;
  reference_count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  references?: Resolver<Maybe<Array<ResolversTypes['Reference']>>, ParentType, ContextType>;
  referencesIds?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  species?: Resolver<Maybe<Array<ResolversTypes['Species']>>, ParentType, ContextType>;
  speciesIds?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  species_count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  state?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  touristic?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['CenoteType']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  variable_count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CenoteBoundsResolvers<ContextType = any, ParentType extends ResolversParentTypes['CenoteBounds'] = ResolversParentTypes['CenoteBounds']> = {
  bottom_right?: Resolver<Maybe<ResolversTypes['Coordinates']>, ParentType, ContextType>;
  top_left?: Resolver<Maybe<ResolversTypes['Coordinates']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CenoteListResolvers<ContextType = any, ParentType extends ResolversParentTypes['CenoteList'] = ResolversParentTypes['CenoteList']> = {
  cenotes?: Resolver<Array<ResolversTypes['Cenote']>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CenoteLocationResolvers<ContextType = any, ParentType extends ResolversParentTypes['CenoteLocation'] = ResolversParentTypes['CenoteLocation']> = {
  coordinates?: Resolver<ResolversTypes['Coordinate'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  county?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  geojson?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
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

export interface CoordinateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Coordinate'], any> {
  name: 'Coordinate';
}

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

export type FavouriteCenoteResolvers<ContextType = any, ParentType extends ResolversParentTypes['FavouriteCenote'] = ResolversParentTypes['FavouriteCenote']> = {
  cenoteando_id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  firestore_id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  municipality?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  state?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  thumbnail?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  touristic?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['CenoteType']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GbifNameUsageResolvers<ContextType = any, ParentType extends ResolversParentTypes['GBIFNameUsage'] = ResolversParentTypes['GBIFNameUsage']> = {
  authorship?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  basionym?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  basionymKey?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  canonicalName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  class?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  classKey?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  constituentKey?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  datasetKey?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  family?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  familyKey?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  genus?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  genusKey?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  issues?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  key?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  kingdom?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  kingdomKey?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  lastCrawled?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastInterpreted?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nameKey?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  nameType?: Resolver<Maybe<ResolversTypes['GBIFNameType']>, ParentType, ContextType>;
  nomenclaturalStatus?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  nubKey?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  numDescendants?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  order?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  orderKey?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  origin?: Resolver<Maybe<ResolversTypes['GBIFOrigin']>, ParentType, ContextType>;
  parent?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  parentKey?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  phylum?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phylumKey?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  publishedIn?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rank?: Resolver<Maybe<ResolversTypes['GBIFTaxonomicRank']>, ParentType, ContextType>;
  remarks?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  scientificName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sourceTaxonKey?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  species?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  speciesKey?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  taxonID?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  taxonomicStatus?: Resolver<Maybe<ResolversTypes['GBIFTaxonomicStatus']>, ParentType, ContextType>;
  vernacularName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GbifSuggestionResolvers<ContextType = any, ParentType extends ResolversParentTypes['GBIFSuggestion'] = ResolversParentTypes['GBIFSuggestion']> = {
  canonicalName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  class?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  family?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  genus?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  key?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  kingdom?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  order?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phylum?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rank?: Resolver<Maybe<ResolversTypes['GBIFTaxonomicRank']>, ParentType, ContextType>;
  species?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

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
  category?: Resolver<Maybe<ResolversTypes['LayerCategory']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  geojson?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  metadata?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  thumbnail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  zip?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MeasurementOrFactResolvers<ContextType = any, ParentType extends ResolversParentTypes['MeasurementOrFact'] = ResolversParentTypes['MeasurementOrFact']> = {
  timestamp?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addFavouriteCenote?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationAddFavouriteCenoteArgs, 'cenoteId' | 'userId'>>;
  create?: Resolver<Maybe<ResolversTypes['MapLayer']>, ParentType, ContextType, RequireFields<MutationCreateArgs, 'input'>>;
  createCenote?: Resolver<Maybe<ResolversTypes['Cenote']>, ParentType, ContextType, RequireFields<MutationCreateCenoteArgs, 'new_cenote'>>;
  createMof?: Resolver<Maybe<ResolversTypes['VariableWithData']>, ParentType, ContextType, RequireFields<MutationCreateMofArgs, 'new_mof'>>;
  createReference?: Resolver<Maybe<ResolversTypes['Reference']>, ParentType, ContextType, RequireFields<MutationCreateReferenceArgs, 'new_reference'>>;
  createVariable?: Resolver<Maybe<ResolversTypes['Variable']>, ParentType, ContextType, RequireFields<MutationCreateVariableArgs, 'new_variable'>>;
  deleteCenote?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteCenoteArgs, 'id'>>;
  deleteMof?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteMofArgs, 'delete_mof_input'>>;
  deleteReference?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteReferenceArgs, 'id'>>;
  deleteUser?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'userId'>>;
  deleteVariable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteVariableArgs, 'id'>>;
  inviteUser?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationInviteUserArgs, 'email' | 'name' | 'userRole'>>;
  login?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>;
  register?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'userInfo'>>;
  registerGovern?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationRegisterGovernArgs, 'profileData' | 'userInfo'>>;
  registerInvestigator?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationRegisterInvestigatorArgs, 'profileData' | 'userInfo'>>;
  registerStudent?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationRegisterStudentArgs, 'profileData' | 'userInfo'>>;
  registerTeacher?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationRegisterTeacherArgs, 'profileData' | 'userInfo'>>;
  registerTourist?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationRegisterTouristArgs, 'profileData' | 'userInfo'>>;
  removeFavouriteCenote?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationRemoveFavouriteCenoteArgs, 'cenoteId' | 'userId'>>;
  updateCenote?: Resolver<Maybe<ResolversTypes['Cenote']>, ParentType, ContextType, RequireFields<MutationUpdateCenoteArgs, 'updated_cenote'>>;
  updateCenotePermissions?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateCenotePermissionsArgs, 'cenotePermissions' | 'userId'>>;
  updateReference?: Resolver<Maybe<ResolversTypes['Reference']>, ParentType, ContextType, RequireFields<MutationUpdateReferenceArgs, 'id' | 'updated_reference'>>;
  updateUserInfo?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateUserInfoArgs, 'userId' | 'userInfo'>>;
  updateVariable?: Resolver<Maybe<ResolversTypes['Variable']>, ParentType, ContextType, RequireFields<MutationUpdateVariableArgs, 'firestore_id' | 'updated_variable'>>;
  updateVariablePermissions?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateVariablePermissionsArgs, 'userId' | 'variablePermissions'>>;
  uploadMap?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationUploadMapArgs, 'mapInput'>>;
  uploadPhoto?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationUploadPhotoArgs, 'photoInput'>>;
};

export type ProfileDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProfileData'] = ResolversParentTypes['ProfileData']> = {
  companyName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  companyUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  degree?: Resolver<Maybe<ResolversTypes['Degree']>, ParentType, ContextType>;
  googleScholar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  govern_institution?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  govern_type?: Resolver<Maybe<ResolversTypes['GovernType']>, ParentType, ContextType>;
  linkedin?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  orchid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  researchGate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  school?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  subject?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  auditLogs?: Resolver<Maybe<Array<Maybe<ResolversTypes['AuditLog']>>>, ParentType, ContextType, RequireFields<QueryAuditLogsArgs, 'id' | 'type'>>;
  cenoteById?: Resolver<Maybe<ResolversTypes['Cenote']>, ParentType, ContextType, RequireFields<QueryCenoteByIdArgs, 'id'>>;
  cenotesBounds?: Resolver<Maybe<ResolversTypes['CenoteBounds']>, ParentType, ContextType>;
  cenotesCsv?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  getCenoteData?: Resolver<Maybe<Array<ResolversTypes['VariableWithData']>>, ParentType, ContextType, RequireFields<QueryGetCenoteDataArgs, 'cenoteId'>>;
  getCenoteDataByTheme?: Resolver<Maybe<Array<ResolversTypes['VariableWithData']>>, ParentType, ContextType, RequireFields<QueryGetCenoteDataByThemeArgs, 'cenoteId' | 'theme'>>;
  getCenoteDataByVariable?: Resolver<Maybe<ResolversTypes['VariableWithData']>, ParentType, ContextType, RequireFields<QueryGetCenoteDataByVariableArgs, 'cenoteId' | 'variableId'>>;
  getCenotes?: Resolver<ResolversTypes['CenoteList'], ParentType, ContextType, Partial<QueryGetCenotesArgs>>;
  getReferenceById?: Resolver<Maybe<ResolversTypes['Reference']>, ParentType, ContextType, RequireFields<QueryGetReferenceByIdArgs, 'id'>>;
  getReferences?: Resolver<ResolversTypes['ReferenceList'], ParentType, ContextType, Partial<QueryGetReferencesArgs>>;
  getSpecies?: Resolver<ResolversTypes['SpeciesList'], ParentType, ContextType, Partial<QueryGetSpeciesArgs>>;
  getSpeciesByGbifId?: Resolver<Maybe<ResolversTypes['Species']>, ParentType, ContextType, RequireFields<QueryGetSpeciesByGbifIdArgs, 'gbifId'>>;
  getSpeciesByINaturalistId?: Resolver<Maybe<ResolversTypes['Species']>, ParentType, ContextType, RequireFields<QueryGetSpeciesByINaturalistIdArgs, 'inaturalistId'>>;
  getSpeciesById?: Resolver<Maybe<ResolversTypes['Species']>, ParentType, ContextType, RequireFields<QueryGetSpeciesByIdArgs, 'id'>>;
  getThemesByCenote?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, RequireFields<QueryGetThemesByCenoteArgs, 'cenoteId'>>;
  getUserByEmail?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserByEmailArgs, 'email'>>;
  getUserById?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserByIdArgs, 'id'>>;
  getUserByName?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserByNameArgs, 'name'>>;
  getUsers?: Resolver<ResolversTypes['UserList'], ParentType, ContextType, Partial<QueryGetUsersArgs>>;
  getVariableById?: Resolver<Maybe<ResolversTypes['Variable']>, ParentType, ContextType, RequireFields<QueryGetVariableByIdArgs, 'id'>>;
  getVariables?: Resolver<ResolversTypes['VariableList'], ParentType, ContextType, Partial<QueryGetVariablesArgs>>;
  getVariablesByTheme?: Resolver<Array<ResolversTypes['Variable']>, ParentType, ContextType, RequireFields<QueryGetVariablesByThemeArgs, 'theme'>>;
  layer?: Resolver<Maybe<ResolversTypes['MapLayer']>, ParentType, ContextType, RequireFields<QueryLayerArgs, 'id'>>;
  layers?: Resolver<Maybe<Array<Maybe<ResolversTypes['MapLayer']>>>, ParentType, ContextType>;
  verifyCode?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryVerifyCodeArgs, 'code'>>;
};

export type ReferenceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Reference'] = ResolversParentTypes['Reference']> = {
  authors?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  book?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cenoteando_id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  date_primary?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  date_secondary?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  doi?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firestore_id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  has_pdf?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  institution?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  issue?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  journal_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  keywords?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  mendeley_ref?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  pages?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pdf_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pdf_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  referenced_cenotes?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  referenced_species?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  short_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ReferenceType'], ParentType, ContextType>;
  unique_code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  uploaded_dropbox?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  uploaded_gcp?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  uploaded_mendeley?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  validated_mendeley?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReferenceListResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReferenceList'] = ResolversParentTypes['ReferenceList']> = {
  references?: Resolver<Array<ResolversTypes['Reference']>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpeciesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Species'] = ResolversParentTypes['Species']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  gbifId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  inaturalistId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  thumbnail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpeciesListResolvers<ContextType = any, ParentType extends ResolversParentTypes['SpeciesList'] = ResolversParentTypes['SpeciesList']> = {
  species?: Resolver<Array<ResolversTypes['Species']>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UrlScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['URL'], any> {
  name: 'URL';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  cenoteEditBlackList?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  cenoteEditWhiteList?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  cenoteViewBlackList?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  cenoteViewWhiteList?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['EmailAddress'], ParentType, ContextType>;
  favouriteCenotes?: Resolver<Array<ResolversTypes['FavouriteCenote']>, ParentType, ContextType>;
  favouriteCenotesIds?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  profile?: Resolver<Maybe<ResolversTypes['UserProfile']>, ParentType, ContextType>;
  profileData?: Resolver<Maybe<ResolversTypes['ProfileData']>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes['UserRole'], ParentType, ContextType>;
  surname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  variableEditBlackList?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  variableEditWhiteList?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  variableViewBlackList?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  variableViewWhiteList?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserListResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserList'] = ResolversParentTypes['UserList']> = {
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VariableResolvers<ContextType = any, ParentType extends ResolversParentTypes['Variable'] = ResolversParentTypes['Variable']> = {
  accessLevel?: Resolver<ResolversTypes['AccessLevel'], ParentType, ContextType>;
  category?: Resolver<ResolversTypes['VariableCategory'], ParentType, ContextType>;
  cenote_count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firestore_id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  icon?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  methodology?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  origin?: Resolver<ResolversTypes['VariableOrigin'], ParentType, ContextType>;
  sphere?: Resolver<ResolversTypes['VariableSphere'], ParentType, ContextType>;
  theme?: Resolver<ResolversTypes['VariableTheme'], ParentType, ContextType>;
  timeseries?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['VariableType'], ParentType, ContextType>;
  units?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  variableRepresentation?: Resolver<Maybe<ResolversTypes['VariableRepresentation']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VariableListResolvers<ContextType = any, ParentType extends ResolversParentTypes['VariableList'] = ResolversParentTypes['VariableList']> = {
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  variables?: Resolver<Array<ResolversTypes['Variable']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VariableWithDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['VariableWithData'] = ResolversParentTypes['VariableWithData']> = {
  cenoteId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  firstTimestamp?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastTimestamp?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  measurements?: Resolver<Array<ResolversTypes['MeasurementOrFact']>, ParentType, ContextType>;
  variableIcon?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  variableId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  variableName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  variableRepresentation?: Resolver<ResolversTypes['VariableRepresentation'], ParentType, ContextType>;
  variableUnits?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type INaturalistFlagCountsResolvers<ContextType = any, ParentType extends ResolversParentTypes['iNaturalistFlagCounts'] = ResolversParentTypes['iNaturalistFlagCounts']> = {
  resolved?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  unresolved?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type INaturalistPhotoResolvers<ContextType = any, ParentType extends ResolversParentTypes['iNaturalistPhoto'] = ResolversParentTypes['iNaturalistPhoto']> = {
  attribution?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  flags?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  large_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  license_code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  medium_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  original_dimensions?: Resolver<Maybe<ResolversTypes['iNaturalistPhotoDimensions']>, ParentType, ContextType>;
  original_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  small_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  square_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type INaturalistPhotoDimensionsResolvers<ContextType = any, ParentType extends ResolversParentTypes['iNaturalistPhotoDimensions'] = ResolversParentTypes['iNaturalistPhotoDimensions']> = {
  height?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  width?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type INaturalistSearchTaxonResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['iNaturalistSearchTaxonResponse'] = ResolversParentTypes['iNaturalistSearchTaxonResponse']> = {
  page?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  per_page?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  results?: Resolver<Maybe<Array<Maybe<ResolversTypes['iNaturalistTaxonResult']>>>, ParentType, ContextType>;
  total_results?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type INaturalistTaxonPhotoResolvers<ContextType = any, ParentType extends ResolversParentTypes['iNaturalistTaxonPhoto'] = ResolversParentTypes['iNaturalistTaxonPhoto']> = {
  photo?: Resolver<Maybe<ResolversTypes['iNaturalistPhoto']>, ParentType, ContextType>;
  taxon_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type INaturalistTaxonRecordResolvers<ContextType = any, ParentType extends ResolversParentTypes['iNaturalistTaxonRecord'] = ResolversParentTypes['iNaturalistTaxonRecord']> = {
  ancestor_ids?: Resolver<Maybe<Array<Maybe<ResolversTypes['Int']>>>, ParentType, ContextType>;
  ancestry?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  atlas_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  complete_species_count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  created_at?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  current_synonymous_taxon_ids?: Resolver<Maybe<Array<Maybe<ResolversTypes['Int']>>>, ParentType, ContextType>;
  default_photo?: Resolver<Maybe<ResolversTypes['iNaturalistPhoto']>, ParentType, ContextType>;
  extinct?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  flag_counts?: Resolver<Maybe<ResolversTypes['iNaturalistFlagCounts']>, ParentType, ContextType>;
  iconic_taxon_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  iconic_taxon_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  is_active?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  matched_term?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  min_species_ancestry?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  min_species_taxon_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  observations_count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  parent_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  photos_locked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  preferred_common_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rank?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rank_level?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  taxon_changes_count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  taxon_photos?: Resolver<Maybe<Array<Maybe<ResolversTypes['iNaturalistTaxonPhoto']>>>, ParentType, ContextType>;
  taxon_schemes_count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  universal_search_rank?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  wikipedia_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type INaturalistTaxonResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['iNaturalistTaxonResult'] = ResolversParentTypes['iNaturalistTaxonResult']> = {
  matches?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  record?: Resolver<Maybe<ResolversTypes['iNaturalistTaxonRecord']>, ParentType, ContextType>;
  score?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AuditLog?: AuditLogResolvers<ContextType>;
  Cenote?: CenoteResolvers<ContextType>;
  CenoteBounds?: CenoteBoundsResolvers<ContextType>;
  CenoteList?: CenoteListResolvers<ContextType>;
  CenoteLocation?: CenoteLocationResolvers<ContextType>;
  CenoteSocialData?: CenoteSocialDataResolvers<ContextType>;
  CityDistances?: CityDistancesResolvers<ContextType>;
  Comment?: CommentResolvers<ContextType>;
  Coordinate?: GraphQLScalarType;
  Coordinates?: CoordinatesResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  FavouriteCenote?: FavouriteCenoteResolvers<ContextType>;
  GBIFNameUsage?: GbifNameUsageResolvers<ContextType>;
  GBIFSuggestion?: GbifSuggestionResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  Latitude?: GraphQLScalarType;
  Longitude?: GraphQLScalarType;
  MapLayer?: MapLayerResolvers<ContextType>;
  MeasurementOrFact?: MeasurementOrFactResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  ProfileData?: ProfileDataResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Reference?: ReferenceResolvers<ContextType>;
  ReferenceList?: ReferenceListResolvers<ContextType>;
  Species?: SpeciesResolvers<ContextType>;
  SpeciesList?: SpeciesListResolvers<ContextType>;
  URL?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UserList?: UserListResolvers<ContextType>;
  Variable?: VariableResolvers<ContextType>;
  VariableList?: VariableListResolvers<ContextType>;
  VariableWithData?: VariableWithDataResolvers<ContextType>;
  iNaturalistFlagCounts?: INaturalistFlagCountsResolvers<ContextType>;
  iNaturalistPhoto?: INaturalistPhotoResolvers<ContextType>;
  iNaturalistPhotoDimensions?: INaturalistPhotoDimensionsResolvers<ContextType>;
  iNaturalistSearchTaxonResponse?: INaturalistSearchTaxonResponseResolvers<ContextType>;
  iNaturalistTaxonPhoto?: INaturalistTaxonPhotoResolvers<ContextType>;
  iNaturalistTaxonRecord?: INaturalistTaxonRecordResolvers<ContextType>;
  iNaturalistTaxonResult?: INaturalistTaxonResultResolvers<ContextType>;
};


export type Coordinate = Scalars["Coordinate"];
export type DateTime = Scalars["DateTime"];
export type EmailAddress = Scalars["EmailAddress"];
export type Json = Scalars["JSON"];
export type Latitude = Scalars["Latitude"];
export type Longitude = Scalars["Longitude"];
export type Url = Scalars["URL"];