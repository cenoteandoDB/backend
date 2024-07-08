/* eslint-disable */
import * as Types from "../../../generated-types/graphql";
import * as gm from "graphql-modules";
export namespace ReferencesModule {
  interface DefinedFields {
    Mutation: 'createReference' | 'updateReference';
    Query: 'getReferences' | 'getReferenceById';
    Reference: 'cenoteando_id' | 'firestore_id' | 'type' | 'unique_code' | 'title' | 'short_name' | 'date_primary' | 'authors' | 'journal_name' | 'issue' | 'institution' | 'date_secondary' | 'book' | 'pages' | 'doi' | 'url' | 'keywords' | 'has_pdf' | 'pdf_name' | 'pdf_url' | 'mendeley_ref' | 'uploaded_mendeley' | 'validated_mendeley' | 'uploaded_dropbox' | 'uploaded_gcp' | 'referenced_cenotes' | 'referenced_species' | 'createdAt' | 'updatedAt';
    ReferenceList: 'references' | 'totalCount';
  };
  
  interface DefinedEnumValues {
    ReferenceType: 'REPORT' | 'JOURNAL' | 'THESIS' | 'BOOK' | 'BOOK_CHAPTER' | 'WEB_PAGE' | 'OTHER';
  };
  
  interface DefinedInputFields {
    NewReferenceInput: 'cenoteando_id' | 'type' | 'unique_code' | 'title' | 'short_name' | 'date_primary' | 'authors' | 'journal_name' | 'issue' | 'institution' | 'date_secondary' | 'book' | 'pages' | 'doi' | 'url' | 'keywords' | 'has_pdf' | 'pdf_name' | 'pdf_base64' | 'mendeley_ref' | 'uploaded_mendeley' | 'validated_mendeley' | 'uploaded_dropbox' | 'uploaded_gcp' | 'referenced_cenotes' | 'referenced_species';
    UpdatedReferenceInput: 'cenoteando_id' | 'firestore_id' | 'type' | 'unique_code' | 'title' | 'short_name' | 'date_primary' | 'authors' | 'journal_name' | 'issue' | 'institution' | 'date_secondary' | 'book' | 'pages' | 'doi' | 'url' | 'keywords' | 'has_pdf' | 'pdf_name' | 'pdf_url' | 'mendeley_ref' | 'uploaded_mendeley' | 'validated_mendeley' | 'uploaded_dropbox' | 'uploaded_gcp' | 'referenced_cenotes' | 'referenced_species';
  };
  
  export type NewReferenceInput = Pick<Types.NewReferenceInput, DefinedInputFields['NewReferenceInput']>;
  export type ReferenceType = DefinedEnumValues['ReferenceType'];
  export type UpdatedReferenceInput = Pick<Types.UpdatedReferenceInput, DefinedInputFields['UpdatedReferenceInput']>;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  export type Reference = Pick<Types.Reference, DefinedFields['Reference']>;
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type ReferenceList = Pick<Types.ReferenceList, DefinedFields['ReferenceList']>;
  export type SortField = Types.SortField;
  export type PaginationInput = Types.PaginationInput;
  
  export type Scalars = Pick<Types.Scalars, 'DateTime'>;
  export type DateTimeScalarConfig = Types.DateTimeScalarConfig;
  
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  export type ReferenceResolvers = Pick<Types.ReferenceResolvers, DefinedFields['Reference'] | '__isTypeOf'>;
  export type ReferenceListResolvers = Pick<Types.ReferenceListResolvers, DefinedFields['ReferenceList'] | '__isTypeOf'>;
  
  export interface Resolvers {
    Mutation?: MutationResolvers;
    Query?: QueryResolvers;
    Reference?: ReferenceResolvers;
    ReferenceList?: ReferenceListResolvers;
    DateTime?: Types.Resolvers['DateTime'];
  };
  
  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    Mutation?: {
      '*'?: gm.Middleware[];
      createReference?: gm.Middleware[];
      updateReference?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      getReferences?: gm.Middleware[];
      getReferenceById?: gm.Middleware[];
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
      pdf_url?: gm.Middleware[];
      mendeley_ref?: gm.Middleware[];
      uploaded_mendeley?: gm.Middleware[];
      validated_mendeley?: gm.Middleware[];
      uploaded_dropbox?: gm.Middleware[];
      uploaded_gcp?: gm.Middleware[];
      referenced_cenotes?: gm.Middleware[];
      referenced_species?: gm.Middleware[];
      createdAt?: gm.Middleware[];
      updatedAt?: gm.Middleware[];
    };
    ReferenceList?: {
      '*'?: gm.Middleware[];
      references?: gm.Middleware[];
      totalCount?: gm.Middleware[];
    };
  };
}