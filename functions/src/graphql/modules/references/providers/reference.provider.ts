/* eslint-disable require-jsdoc */
import { ID } from "graphql-modules/shared/types";
import { db } from "../../database/db";
import { PaginationInput, Reference, ReferenceList, SortField }
  from "../../../generated-types/graphql";
import { firestore } from "firebase-admin";

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
}
