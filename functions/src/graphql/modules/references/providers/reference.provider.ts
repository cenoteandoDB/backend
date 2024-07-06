/* eslint-disable require-jsdoc */
import { ID } from "graphql-modules/shared/types";
import { db } from "../../database/db";
import { NewReferenceInput, PaginationInput, Reference, ReferenceList, SortField, UpdatedReferenceInput }
  from "../../../generated-types/graphql";
import { firestore } from "firebase-admin";
import { StorageProvider } from "../../gcp/gcp.provider";

const referenceDB = db.references;

export class ReferenceProvider {
  /**
   * Get all references.
   *
   * @param {SortField} sort optional sort by field and order
   * @param {PaginationInput} pagination optional pagination with offset and page size
   * @param {string} title optional filter by title
   * @return {Promise<ReferenceList>} list with all references
   */
  async getReferences(
    sort: SortField|null|undefined = { field: "title", sortOrder: "ASC" },
    pagination: PaginationInput|null|undefined = { offset: 0, limit: 25 },
    title: string|null|undefined
  ): Promise<ReferenceList> {
    let query: any;
    let countQuery: any;
    if (title) {
      const endSearch = title.replace(/.$/, (c) =>
        String.fromCharCode(c.charCodeAt(0) + 1),
      );
      query = referenceDB.where("title", ">=", title)
        .where("title", "<", endSearch)
        .where("short_name", ">=", title)
        .where("short_name", "<", endSearch)
        .orderBy(sort?.field ?? "title",
          sort?.sortOrder.toLowerCase() as firestore.OrderByDirection);
      countQuery = referenceDB.where("title", ">=", title).where("title", "<", endSearch);
    } else {
      query = referenceDB.orderBy(
        sort?.field ?? "title", sort?.sortOrder.toLowerCase() as firestore.OrderByDirection);
      countQuery = referenceDB;
    }

    if (pagination) {
      query = query.offset(pagination.offset).limit(pagination.limit);
    }

    const [referenceSnapshot, totalCountSnapshot] =
      await Promise.all([query.get(), countQuery.get()]);

    const references = referenceSnapshot.docs.map((doc: any) => doc.data() as Reference);
    const totalCount = totalCountSnapshot.size;

    return { references, totalCount };
  }

  /**
   * Get a reference by id.
   *
   * @param {ID} id the id of the reference to get
   *
   * @return {Promise<Reference>} the reference
   */
  async getReferenceById(id: ID): Promise<Reference> {
    const doc = await referenceDB.doc(id).get();

    if (!doc.exists) {
      throw new Error("Reference not found.");
    }

    return doc.data() as Reference;
  }

  /**
   * Create reference. If pdf is mentioned, uploads into google cloud storage the given base 64.
   *
   * @param {NewReferenceInput} newReference the data to create the reference
   *
   * @return {Promise<Reference>} the reference
   */
  async createReference(newReference: NewReferenceInput): Promise<Reference> {

    const docRef = referenceDB.doc();
    await docRef.set({
      firestore_id: docRef.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),

      cenoteando_id: newReference.cenoteando_id ? newReference.cenoteando_id : null,
      type: newReference.type,
      unique_code: newReference.unique_code ? newReference.unique_code : null,
      title: newReference.title,
      short_name: newReference.short_name ? newReference.short_name : null,
      date_primary: newReference.date_primary ? newReference.date_primary : null,
      authors: newReference.authors,
      journal_name: newReference.journal_name ? newReference.journal_name : null,
      issue: newReference.issue ? newReference.issue : null,
      institution: newReference.institution ? newReference.institution : null,
      date_secondary: newReference.date_secondary ? newReference.date_secondary : null,
      book: newReference.book ? newReference.book : null,
      pages: newReference.pages ? newReference.pages : null,
      doi: newReference.doi ? newReference.doi : null,
      url: newReference.url ? newReference.url : null,
      keywords: newReference.keywords ? newReference.keywords : [],
    
      has_pdf: newReference.has_pdf,
      pdf_name: newReference.pdf_name ? newReference.pdf_name : null,
    
      mendeley_ref: newReference.mendeley_ref,
      uploaded_mendeley: newReference.uploaded_mendeley,
      validated_mendeley: newReference.validated_mendeley,
      uploaded_dropbox: newReference.uploaded_dropbox,
      uploaded_gcp: newReference.uploaded_gcp,

      referenced_cenotes: newReference.referenced_cenotes,
      referenced_species: newReference.referenced_species,
    });

    if (newReference.pdf_name && newReference.pdf_base64) {
      StorageProvider.uploadReference(newReference.pdf_name, newReference.pdf_base64);
    }

    const snapshot = await referenceDB.doc(docRef.id).get();
    return snapshot.data() as Reference;
  }

    /**
   * Updates a reference.
   *
   * @param {UpdatedReferenceInput} updatedReference the information to update the reference
   *
   * @return {Promise<Cenote>} the updated cenote
   */
    async updateCenote(referenceId: string, updatedReference: UpdatedReferenceInput)
    : Promise<Reference> {
      const referenceDoc = await this.getReferenceById(referenceId);
  
      await referenceDB.doc(referenceDoc.firestore_id).update({
        ...updatedReference,
        updatedAt: new Date().toISOString(),
      });
  
      const reference = await referenceDB.doc(referenceDoc.firestore_id).get();
      return reference.data() as Reference;
    }
}
