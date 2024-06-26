/* eslint-disable require-jsdoc */
import {ID} from "graphql-modules/shared/types";
import {db} from "../../database/db";
import {Reference} from "../../../generated-types/graphql";

const referenceDB = db.references;

export class ReferenceProvider {
    /**
     * Get all references.
     *
     * @return {Promise<Reference[]>} list with all references
     */
    async getReferences(): Promise<Reference[]> {
        const references = await referenceDB.get();
        return references.docs.map((doc) => doc.data() as Reference);
    }

    /**
     * Get a reference by id.
     *
     * @param {ID} id the id of the reference to get
     *
     * @return {Promise<Reference>} the reference
     */
    async getReferenceById(id: ID): Promise<Reference> {
        const snapshot = await referenceDB.where("firestore_id", "==", id).get();
        return snapshot.docs[0].data() as Reference;
    }
}
