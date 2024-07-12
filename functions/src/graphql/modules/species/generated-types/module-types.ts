/* eslint-disable */
import * as Types from "../../../generated-types/graphql";
import * as gm from "graphql-modules";
export namespace SpeciesModule {
  interface DefinedFields {
    GBIFSuggestion: 'key' | 'kingdom' | 'phylum' | 'class' | 'order' | 'family' | 'genus' | 'species' | 'canonicalName' | 'rank';
    GBIFNameUsage: 'key' | 'nubKey' | 'nameKey' | 'taxonID' | 'sourceTaxonKey' | 'kingdom' | 'phylum' | 'order' | 'family' | 'genus' | 'species' | 'kingdomKey' | 'phylumKey' | 'classKey' | 'orderKey' | 'familyKey' | 'genusKey' | 'speciesKey' | 'datasetKey' | 'constituentKey' | 'parentKey' | 'parent' | 'scientificName' | 'canonicalName' | 'vernacularName' | 'authorship' | 'nameType' | 'rank' | 'origin' | 'taxonomicStatus' | 'nomenclaturalStatus' | 'remarks' | 'publishedIn' | 'numDescendants' | 'lastCrawled' | 'lastInterpreted' | 'issues' | 'class' | 'basionymKey' | 'basionym';
    iNaturalistSearchTaxonResponse: 'total_results' | 'page' | 'per_page' | 'results';
    iNaturalistTaxonResult: 'score' | 'type' | 'matches' | 'record';
    iNaturalistTaxonRecord: 'id' | 'rank' | 'rank_level' | 'iconic_taxon_id' | 'ancestor_ids' | 'is_active' | 'min_species_taxon_id' | 'name' | 'parent_id' | 'ancestry' | 'min_species_ancestry' | 'extinct' | 'created_at' | 'default_photo' | 'taxon_changes_count' | 'taxon_schemes_count' | 'observations_count' | 'photos_locked' | 'universal_search_rank' | 'flag_counts' | 'current_synonymous_taxon_ids' | 'taxon_photos' | 'atlas_id' | 'complete_species_count' | 'wikipedia_url' | 'matched_term' | 'iconic_taxon_name' | 'preferred_common_name';
    iNaturalistPhoto: 'id' | 'license_code' | 'attribution' | 'url' | 'original_dimensions' | 'flags' | 'square_url' | 'medium_url' | 'small_url' | 'large_url' | 'original_url';
    iNaturalistPhotoDimensions: 'height' | 'width';
    iNaturalistFlagCounts: 'resolved' | 'unresolved';
    iNaturalistTaxonPhoto: 'taxon_id' | 'photo';
    Query: 'species' | 'speciesById' | 'speciesByGbifId' | 'speciesByINaturalistId';
    Species: 'id' | 'gbifId' | 'inaturalistId' | 'name' | 'thumbnail' | 'createdAt' | 'updatedAt';
  };
  
  interface DefinedEnumValues {
    GBIFNameType: 'BLACKLISTED' | 'CANDIDATUS' | 'CULTIVAR' | 'DOUBTFUL' | 'HYBRID' | 'INFORMAL' | 'NO_NAME' | 'OTU' | 'PLACEHOLDER' | 'SCIENTIFIC' | 'VIRUS';
    GBIFTaxonomicRank: 'ABERRATION' | 'BIOVAR' | 'CHEMOFORM' | 'CHEMOVAR' | 'CLASS' | 'COHORT' | 'CONVARIETY' | 'CULTIVAR' | 'CULTIVAR_GROUP' | 'DOMAIN' | 'FAMILY' | 'FORM' | 'FORMA_SPECIALIS' | 'GENUS' | 'GRANDORDER' | 'GREX' | 'INFRACLASS' | 'INFRACOHORT' | 'INFRAFAMILY' | 'INFRAGENERIC_NAME' | 'INFRAGENUS' | 'INFRAKINGDOM' | 'INFRALEGION' | 'INFRAORDER' | 'INFRAPHYLUM' | 'INFRASPECIFIC_NAME' | 'INFRASUBSPECIFIC_NAME' | 'INFRATRIBE' | 'KINGDOM' | 'LEGION' | 'MAGNORDER' | 'MORPH' | 'MORPHOVAR' | 'NATIO' | 'ORDER' | 'OTHER' | 'PARVCLASS' | 'PARVORDER' | 'PATHOVAR' | 'PHAGOVAR' | 'PHYLUM' | 'PROLES' | 'RACE' | 'SECTION' | 'SERIES' | 'SEROVAR' | 'SPECIES' | 'SPECIES_AGGREGATE' | 'STRAIN' | 'SUBCLASS' | 'SUBCOHORT' | 'SUBFAMILY' | 'SUBFORM' | 'SUBGENUS' | 'SUBKINGDOM' | 'SUBLEGION' | 'SUBORDER' | 'SUBPHYLUM' | 'SUBSECTION' | 'SUBSERIES' | 'SUBSPECIES' | 'SUBTRIBE' | 'SUBVARIETY' | 'SUPERCLASS' | 'SUPERCOHORT' | 'SUPERFAMILY' | 'SUPERKINGDOM' | 'SUPERLEGION' | 'SUPERORDER' | 'SUPERPHYLUM' | 'SUPERTRIBE' | 'SUPRAGENERIC_NAME' | 'TRIBE' | 'UNRANKED' | 'VARIETY';
    GBIFOrigin: 'AUTONYM' | 'BASIONYM_PLACEHOLDER' | 'DENORMED_CLASSIFICATION' | 'EX_AUTHOR_SYNONYM' | 'IMPLICIT_NAME' | 'MISSING_ACCEPTED' | 'OTHER' | 'PROPARTE' | 'SOURCE' | 'VERBATIM_ACCEPTED' | 'VERBATIM_BASIONYM' | 'VERBATIM_PARENT';
    GBIFTaxonomicStatus: 'ACCEPTED' | 'DOUBTFUL' | 'HETEROTYPIC_SYNONYM' | 'HOMOTYPIC_SYNONYM' | 'MISAPPLIED' | 'PROPARTE_SYNONYM' | 'SYNONYM';
  };
  
  export type GBIFSuggestion = Pick<Types.GbifSuggestion, DefinedFields['GBIFSuggestion']>;
  export type GBIFTaxonomicRank = DefinedEnumValues['GBIFTaxonomicRank'];
  export type GBIFNameUsage = Pick<Types.GbifNameUsage, DefinedFields['GBIFNameUsage']>;
  export type GBIFNameType = DefinedEnumValues['GBIFNameType'];
  export type GBIFOrigin = DefinedEnumValues['GBIFOrigin'];
  export type GBIFTaxonomicStatus = DefinedEnumValues['GBIFTaxonomicStatus'];
  export type iNaturalistSearchTaxonResponse = Pick<Types.INaturalistSearchTaxonResponse, DefinedFields['iNaturalistSearchTaxonResponse']>;
  export type iNaturalistTaxonResult = Pick<Types.INaturalistTaxonResult, DefinedFields['iNaturalistTaxonResult']>;
  export type iNaturalistTaxonRecord = Pick<Types.INaturalistTaxonRecord, DefinedFields['iNaturalistTaxonRecord']>;
  export type iNaturalistPhoto = Pick<Types.INaturalistPhoto, DefinedFields['iNaturalistPhoto']>;
  export type iNaturalistFlagCounts = Pick<Types.INaturalistFlagCounts, DefinedFields['iNaturalistFlagCounts']>;
  export type iNaturalistTaxonPhoto = Pick<Types.INaturalistTaxonPhoto, DefinedFields['iNaturalistTaxonPhoto']>;
  export type iNaturalistPhotoDimensions = Pick<Types.INaturalistPhotoDimensions, DefinedFields['iNaturalistPhotoDimensions']>;
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type Species = Pick<Types.Species, DefinedFields['Species']>;
  
  export type Scalars = Pick<Types.Scalars, 'JSON' | 'DateTime'>;
  export type JsonScalarConfig = Types.JsonScalarConfig;
  export type DateTimeScalarConfig = Types.DateTimeScalarConfig;
  
  export type GBIFSuggestionResolvers = Pick<Types.GbifSuggestionResolvers, DefinedFields['GBIFSuggestion'] | '__isTypeOf'>;
  export type GBIFNameUsageResolvers = Pick<Types.GbifNameUsageResolvers, DefinedFields['GBIFNameUsage'] | '__isTypeOf'>;
  export type iNaturalistSearchTaxonResponseResolvers = Pick<Types.INaturalistSearchTaxonResponseResolvers, DefinedFields['iNaturalistSearchTaxonResponse'] | '__isTypeOf'>;
  export type iNaturalistTaxonResultResolvers = Pick<Types.INaturalistTaxonResultResolvers, DefinedFields['iNaturalistTaxonResult'] | '__isTypeOf'>;
  export type iNaturalistTaxonRecordResolvers = Pick<Types.INaturalistTaxonRecordResolvers, DefinedFields['iNaturalistTaxonRecord'] | '__isTypeOf'>;
  export type iNaturalistPhotoResolvers = Pick<Types.INaturalistPhotoResolvers, DefinedFields['iNaturalistPhoto'] | '__isTypeOf'>;
  export type iNaturalistPhotoDimensionsResolvers = Pick<Types.INaturalistPhotoDimensionsResolvers, DefinedFields['iNaturalistPhotoDimensions'] | '__isTypeOf'>;
  export type iNaturalistFlagCountsResolvers = Pick<Types.INaturalistFlagCountsResolvers, DefinedFields['iNaturalistFlagCounts'] | '__isTypeOf'>;
  export type iNaturalistTaxonPhotoResolvers = Pick<Types.INaturalistTaxonPhotoResolvers, DefinedFields['iNaturalistTaxonPhoto'] | '__isTypeOf'>;
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  export type SpeciesResolvers = Pick<Types.SpeciesResolvers, DefinedFields['Species'] | '__isTypeOf'>;
  
  export interface Resolvers {
    GBIFSuggestion?: GBIFSuggestionResolvers;
    GBIFNameUsage?: GBIFNameUsageResolvers;
    iNaturalistSearchTaxonResponse?: iNaturalistSearchTaxonResponseResolvers;
    iNaturalistTaxonResult?: iNaturalistTaxonResultResolvers;
    iNaturalistTaxonRecord?: iNaturalistTaxonRecordResolvers;
    iNaturalistPhoto?: iNaturalistPhotoResolvers;
    iNaturalistPhotoDimensions?: iNaturalistPhotoDimensionsResolvers;
    iNaturalistFlagCounts?: iNaturalistFlagCountsResolvers;
    iNaturalistTaxonPhoto?: iNaturalistTaxonPhotoResolvers;
    Query?: QueryResolvers;
    Species?: SpeciesResolvers;
    JSON?: Types.Resolvers['JSON'];
    DateTime?: Types.Resolvers['DateTime'];
  };
  
  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    GBIFSuggestion?: {
      '*'?: gm.Middleware[];
      key?: gm.Middleware[];
      kingdom?: gm.Middleware[];
      phylum?: gm.Middleware[];
      class?: gm.Middleware[];
      order?: gm.Middleware[];
      family?: gm.Middleware[];
      genus?: gm.Middleware[];
      species?: gm.Middleware[];
      canonicalName?: gm.Middleware[];
      rank?: gm.Middleware[];
    };
    GBIFNameUsage?: {
      '*'?: gm.Middleware[];
      key?: gm.Middleware[];
      nubKey?: gm.Middleware[];
      nameKey?: gm.Middleware[];
      taxonID?: gm.Middleware[];
      sourceTaxonKey?: gm.Middleware[];
      kingdom?: gm.Middleware[];
      phylum?: gm.Middleware[];
      order?: gm.Middleware[];
      family?: gm.Middleware[];
      genus?: gm.Middleware[];
      species?: gm.Middleware[];
      kingdomKey?: gm.Middleware[];
      phylumKey?: gm.Middleware[];
      classKey?: gm.Middleware[];
      orderKey?: gm.Middleware[];
      familyKey?: gm.Middleware[];
      genusKey?: gm.Middleware[];
      speciesKey?: gm.Middleware[];
      datasetKey?: gm.Middleware[];
      constituentKey?: gm.Middleware[];
      parentKey?: gm.Middleware[];
      parent?: gm.Middleware[];
      scientificName?: gm.Middleware[];
      canonicalName?: gm.Middleware[];
      vernacularName?: gm.Middleware[];
      authorship?: gm.Middleware[];
      nameType?: gm.Middleware[];
      rank?: gm.Middleware[];
      origin?: gm.Middleware[];
      taxonomicStatus?: gm.Middleware[];
      nomenclaturalStatus?: gm.Middleware[];
      remarks?: gm.Middleware[];
      publishedIn?: gm.Middleware[];
      numDescendants?: gm.Middleware[];
      lastCrawled?: gm.Middleware[];
      lastInterpreted?: gm.Middleware[];
      issues?: gm.Middleware[];
      class?: gm.Middleware[];
      basionymKey?: gm.Middleware[];
      basionym?: gm.Middleware[];
    };
    iNaturalistSearchTaxonResponse?: {
      '*'?: gm.Middleware[];
      total_results?: gm.Middleware[];
      page?: gm.Middleware[];
      per_page?: gm.Middleware[];
      results?: gm.Middleware[];
    };
    iNaturalistTaxonResult?: {
      '*'?: gm.Middleware[];
      score?: gm.Middleware[];
      type?: gm.Middleware[];
      matches?: gm.Middleware[];
      record?: gm.Middleware[];
    };
    iNaturalistTaxonRecord?: {
      '*'?: gm.Middleware[];
      id?: gm.Middleware[];
      rank?: gm.Middleware[];
      rank_level?: gm.Middleware[];
      iconic_taxon_id?: gm.Middleware[];
      ancestor_ids?: gm.Middleware[];
      is_active?: gm.Middleware[];
      min_species_taxon_id?: gm.Middleware[];
      name?: gm.Middleware[];
      parent_id?: gm.Middleware[];
      ancestry?: gm.Middleware[];
      min_species_ancestry?: gm.Middleware[];
      extinct?: gm.Middleware[];
      created_at?: gm.Middleware[];
      default_photo?: gm.Middleware[];
      taxon_changes_count?: gm.Middleware[];
      taxon_schemes_count?: gm.Middleware[];
      observations_count?: gm.Middleware[];
      photos_locked?: gm.Middleware[];
      universal_search_rank?: gm.Middleware[];
      flag_counts?: gm.Middleware[];
      current_synonymous_taxon_ids?: gm.Middleware[];
      taxon_photos?: gm.Middleware[];
      atlas_id?: gm.Middleware[];
      complete_species_count?: gm.Middleware[];
      wikipedia_url?: gm.Middleware[];
      matched_term?: gm.Middleware[];
      iconic_taxon_name?: gm.Middleware[];
      preferred_common_name?: gm.Middleware[];
    };
    iNaturalistPhoto?: {
      '*'?: gm.Middleware[];
      id?: gm.Middleware[];
      license_code?: gm.Middleware[];
      attribution?: gm.Middleware[];
      url?: gm.Middleware[];
      original_dimensions?: gm.Middleware[];
      flags?: gm.Middleware[];
      square_url?: gm.Middleware[];
      medium_url?: gm.Middleware[];
      small_url?: gm.Middleware[];
      large_url?: gm.Middleware[];
      original_url?: gm.Middleware[];
    };
    iNaturalistPhotoDimensions?: {
      '*'?: gm.Middleware[];
      height?: gm.Middleware[];
      width?: gm.Middleware[];
    };
    iNaturalistFlagCounts?: {
      '*'?: gm.Middleware[];
      resolved?: gm.Middleware[];
      unresolved?: gm.Middleware[];
    };
    iNaturalistTaxonPhoto?: {
      '*'?: gm.Middleware[];
      taxon_id?: gm.Middleware[];
      photo?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      species?: gm.Middleware[];
      speciesById?: gm.Middleware[];
      speciesByGbifId?: gm.Middleware[];
      speciesByINaturalistId?: gm.Middleware[];
    };
    Species?: {
      '*'?: gm.Middleware[];
      id?: gm.Middleware[];
      gbifId?: gm.Middleware[];
      inaturalistId?: gm.Middleware[];
      name?: gm.Middleware[];
      thumbnail?: gm.Middleware[];
      createdAt?: gm.Middleware[];
      updatedAt?: gm.Middleware[];
    };
  };
}