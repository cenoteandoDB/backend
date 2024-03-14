/* eslint-disable */
import * as Types from "../../../generated-types/graphql";
import * as gm from "graphql-modules";
export namespace ReferencesModule {
  interface DefinedFields {
    Mutation: 'createVariable' | 'updateVariable';
    Query: 'references' | 'referenceById';
    Reference: 'cenoteando_id' | 'firestore_id' | 'type' | 'unique_code' | 'title' | 'short_name' | 'date_primary' | 'authors' | 'journal_name' | 'issue' | 'institution' | 'date_secondary' | 'book' | 'pages' | 'doi' | 'url' | 'keywords' | 'has_pdf' | 'pdf_name' | 'mendeley_ref' | 'uploaded_mendeley' | 'validated_mendeley' | 'uploaded_dropbox' | 'uploaded_gcp' | 'cenotes_count' | 'species_count' | 'createdAt' | 'updatedAt';
  };
  
  interface DefinedEnumValues {
    ReferenceType: 'REPORT' | 'JOURNAL' | 'THESIS' | 'BOOK' | 'BOOK_CHAPTER' | 'WEB_PAGE' | 'OTHER';
  };
  
  interface DefinedInputFields {
    NewVariableInput: 'name' | 'description' | 'type' | 'units' | 'enumValues' | 'timeseries' | 'multiple' | 'accessLevel' | 'theme' | 'origin' | 'methodology';
    UpdateVariableInput: 'id' | 'name' | 'description' | 'type' | 'units' | 'enumValues' | 'timeseries' | 'multiple' | 'accessLevel' | 'theme' | 'origin' | 'methodology';
  };
  
  export type NewVariableInput = Pick<Types.NewVariableInput, DefinedInputFields['NewVariableInput']>;
  export type VariableType = Types.VariableType;
  export type AccessLevel = Types.AccessLevel;
  export type VariableTheme = Types.VariableTheme;
  export type VariableOrigin = Types.VariableOrigin;
  export type UpdateVariableInput = Pick<Types.UpdateVariableInput, DefinedInputFields['UpdateVariableInput']>;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  export type Variable = Types.Variable;
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type Reference = Pick<Types.Reference, DefinedFields['Reference']>;
  export type ReferenceType = DefinedEnumValues['ReferenceType'];
  
  export type Scalars = Pick<Types.Scalars, 'DateTime'>;
  export type DateTimeScalarConfig = Types.DateTimeScalarConfig;
  
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  export type ReferenceResolvers = Pick<Types.ReferenceResolvers, DefinedFields['Reference'] | '__isTypeOf'>;
  
  export interface Resolvers {
    Mutation?: MutationResolvers;
    Query?: QueryResolvers;
    Reference?: ReferenceResolvers;
    DateTime?: Types.Resolvers['DateTime'];
  };
  
  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    Mutation?: {
      '*'?: gm.Middleware[];
      createVariable?: gm.Middleware[];
      updateVariable?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      references?: gm.Middleware[];
      referenceById?: gm.Middleware[];
    };
    Reference?: {
      '*'?: gm.Middleware[];
      cenoteando_id?: gm.Middleware[];
      firestore_id?: gm.Middleware[];
      type?: gm.Middleware[];
      unique_code?: gm.Middleware[];
      title?: gm.Middleware[];
      short_name?: gm.Middleware[];
      date_primary?: gm.Middleware[];
      authors?: gm.Middleware[];
      journal_name?: gm.Middleware[];
      issue?: gm.Middleware[];
      institution?: gm.Middleware[];
      date_secondary?: gm.Middleware[];
      book?: gm.Middleware[];
      pages?: gm.Middleware[];
      doi?: gm.Middleware[];
      url?: gm.Middleware[];
      keywords?: gm.Middleware[];
      has_pdf?: gm.Middleware[];
      pdf_name?: gm.Middleware[];
      mendeley_ref?: gm.Middleware[];
      uploaded_mendeley?: gm.Middleware[];
      validated_mendeley?: gm.Middleware[];
      uploaded_dropbox?: gm.Middleware[];
      uploaded_gcp?: gm.Middleware[];
      cenotes_count?: gm.Middleware[];
      species_count?: gm.Middleware[];
      createdAt?: gm.Middleware[];
      updatedAt?: gm.Middleware[];
    };
  };
}