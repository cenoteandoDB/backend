/* eslint-disable require-jsdoc */
import { ID } from "graphql-modules/shared/types";
import { db } from "../../database/db";
import {
  Cenote,
  CenoteBounds,
  NewCenoteInput,
  PaginationInput,
  SortField,
  UpdatedCenoteInput,
  CenoteList,
} from "../../../generated-types/graphql";
import { firestore } from "firebase-admin";

const cenotesDB = db.cenotes;
const favoriteCenoteDB = db.favorite_cenotes;

export class CenotesProvider {
  /**
   * Get all cenotes.
   * @param {SortField} sort optional sort field. Default by name
   * @param {PaginationInput} pagination optional pagination parameter
   * @param {string} name  The name of user to retrieve
   * @param {string} userId
   * @return {Promise<CenoteList>} a list with all cenotes
   */
  async getCenotes(
      sort: SortField | null | undefined = {
      field: "cenoteando_id",
      sortOrder: "ASC"
    },
    pagination: PaginationInput | null = { offset: 0, limit: 25 },
    name: string | null | undefined,
    userId: string | null | undefined
  ): Promise<CenoteList> {
    let query: any;
    let countQuery: any;
    if (name) {
      const endSearch = name.replace(/.$/, (c) =>
        String.fromCharCode(c.charCodeAt(0) + 1),
      );
      query = cenotesDB
        .where("name", ">=", name)
        .where("name", "<", endSearch)
        .orderBy(
          sort?.field ?? "name",
          sort?.sortOrder.toLowerCase() as firestore.OrderByDirection,
        );
      countQuery = cenotesDB
        .where("name", ">=", name)
        .where("name", "<", endSearch);
    } else {
      query = cenotesDB.orderBy(
        sort?.field ?? "name",
        sort?.sortOrder.toLowerCase() as firestore.OrderByDirection,
      );
      countQuery = cenotesDB;
    }

    if (pagination) {
      query = query.offset(pagination.offset).limit(pagination.limit);
    }

<<<<<<< HEAD
    const [cenotesSnapshot, totalCountSnapshot] = await Promise.all([
      query.get(),
      countQuery.get(),
    ]);

    const cenotes = cenotesSnapshot.docs.map(
      (doc: any) => doc.data() as Cenote,
=======
    const cenotes = await Promise.all(
      cenotesSnapshot.docs.map(async (doc: any) => {
        const data = doc.data() as Cenote;
        const favoriteSnapshot = await favoriteCenoteDB
          .where('userId', '==', userId)
          .where('cenoteId', '==', doc.id)
          .get();
        const isFavorite = !favoriteSnapshot.empty;
        return { ...data, isFavorite };
      })
>>>>>>> 56695d9 (Cenote List Changes)
    );
    const totalCount = totalCountSnapshot.size;

    return { cenotes, totalCount };
  }

  /**
   * Get a cenote by id.
   *
   * @param {ID} id of the cenote to get
   *
   * @return {Promise<Cenote>} the cenote
   */
  async getCenoteById(id: ID): Promise<Cenote> {
    const cenoteDoc = await this.getCenoteDocument(id);
    return cenoteDoc.data() as Cenote;
  }

  /**
   * Get the maximum and minimum latitude and longitude where cenotes
   * are located.
   *
   * @return {Promise<CenoteBounds>} the map cenote boundaries
   */
  async getCenotesBounds(): Promise<CenoteBounds> {
    const maxLat = await cenotesDB
      .orderBy("lat", "desc")
      .limit(1)
      .get()
      .then((snapshot) => (snapshot.docs[0].data() as Cenote).latitude);
    const minLat = await cenotesDB
      .orderBy("lat", "desc")
      .limit(1)
      .get()
      .then((snapshot) => (snapshot.docs[0].data() as Cenote).latitude);
    const maxLng = await cenotesDB
      .orderBy("lng", "asc")
      .limit(1)
      .get()
      .then((snapshot) => (snapshot.docs[0].data() as Cenote).longitude);
    const minLng = await cenotesDB
      .orderBy("lng", "asc")
      .limit(1)
      .get()
      .then((snapshot) => (snapshot.docs[0].data() as Cenote).longitude);

    return {
      top_left: {
        latitude: maxLat,
        longitude: minLng,
      },
      bottom_right: {
        latitude: minLat,
        longitude: maxLng,
      },
    };
  }

  async cenotesToCsv() {
    return "";
  }

  /**
   * Creates a cenote.
   *
   * @param {NewCenoteInput} newCenote new cenote input
   *
   * @return {Promise<Cenote>} the new cenote
   */
  async createCenote(
    newCenote: NewCenoteInput
  ): Promise<Cenote> {
    /*
        const distances = await DirectionsService.getDrivingDistance(
            coordinates
        );
        */

    const docRef = cenotesDB.doc();
    await docRef.set({
      id: docRef.id,
      firestore_id: docRef.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...newCenote,
    });

    const snapshot = await cenotesDB.doc(docRef.id).get();
    return snapshot.data() as Cenote;
  }

  /**
   * Updates a cenote.
   * @param {string} cenoteId the cenote id to be updated
   * @param {UpdatedCenoteInput} updatedCenote the information to update the cenote
   * @return {Promise<Cenote>} the updated cenote
   */
  async updateCenote(cenoteId: string, updatedCenote: UpdatedCenoteInput): Promise<Cenote> {
    await cenotesDB.doc(cenoteId).update({
      ...updatedCenote,
      updatedAt: new Date().toISOString(),
    });

    const cenote = await cenotesDB.doc(cenoteId).get();
    return cenote.data() as Cenote;
  }

  /**
   * Delete a cenote by id.
   *
   * @param {ID} id of the cenote to delete
   *
   * @return {Promise<Boolean>} true if deleted
   */
  async deleteCenote(id: ID): Promise<boolean> {
    const snapshot = await cenotesDB.doc(id).get();

    if (!snapshot.exists) {
        throw new Error(`Cenote does not exist.`);
    }

    await cenotesDB.doc(id).delete();
    return true;
  }

  /**
   * Gets Cenote Firestore Document by id. If it doesn't exist, throws an error.
   *
   * @param {ID} id the Cenote id
   *
   * @return {Promise<FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>>}
   * the Cenote Firestore Document
   */
  private async getCenoteDocument(
    id: string,
  ): Promise<
    FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>
  > {
    const doc = await cenotesDB.doc(id).get();

    if (!doc.exists) {
      throw new Error(`Cenote ${id} not found.`);
    }

    return doc;
  }
}
