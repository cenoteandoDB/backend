/* eslint-disable require-jsdoc */
import { ID } from "graphql-modules/shared/types";
import { db } from "../../database/db";
import {
  Cenote,
  CenoteBounds,
  CoordinatesInput,
  NewCenoteInput,
  PaginationInput,
  SortField,
  UpdatedCenoteInput,
  CenoteList,
  FavouriteCenote,
} from "../../../generated-types/graphql";
import { firestore } from "firebase-admin";

const cenotesDB = db.cenotes;

export class CenotesProvider {
  /**
   * Get all cenotes.
   * @param {SortField} sort optional sort field. Default by name
   * @param {PaginationInput} pagination optional pagination parameter
   * @param {string} name  The name of user to retrieve
   * @return {Promise<CenoteList>} a list with all cenotes
   */
  async getCenotes(
    sort: SortField | null | undefined = {
      field: "cenoteando_id",
      sortOrder: "ASC",
    },
    pagination: PaginationInput | null = { offset: 0, limit: 25 },
    name: string | null | undefined,
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

    const [cenotesSnapshot, totalCountSnapshot] = await Promise.all([
      query.get(),
      countQuery.get(),
    ]);

    const cenotes = cenotesSnapshot.docs.map(
      (doc: any) => doc.data() as Cenote,
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
   * @param {CoordinatesInput} coordinates cenote geographical location
   *
   * @return {Promise<Cenote>} the new cenote
   */
  async createCenote(
    newCenote: NewCenoteInput,
    coordinates: CoordinatesInput,
  ): Promise<Cenote> {
    /*
        const distances = await DirectionsService.getDrivingDistance(
            coordinates
        );
        */

    const docRef = cenotesDB.doc();
    await docRef.set({
      id: docRef.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      ...newCenote,
    });

    const snapshot = await cenotesDB.doc(docRef.id).get();
    return snapshot.data() as Cenote;
  }

  /**
   * Updates a cenote.
   *
   * @param {UpdatedCenoteInput} updatedCenote the information to update the cenote
   *
   * @return {Promise<Cenote>} the updated cenote
   */
  async updateCenote(updatedCenote: UpdatedCenoteInput): Promise<Cenote> {
    const cenoteDoc = await this.getCenoteDocument(updatedCenote.id);

    await cenotesDB.doc(cenoteDoc.id).update({
      ...updatedCenote,
      updatedAt: new Date().toISOString(),
    });

    const cenote = await cenotesDB.doc(cenoteDoc.id).get();
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
    this.getCenoteDocument(id);
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

  /**
   * Check if cenote exists by cenoteando id. If it doesn't exist, throws an error.
   *
   * @param {ID} cenoteandoId the Cenote id
   *
   * @return {Promise<boolean>} if the cenote exists
   */
  async cenoteExistsByCenoteandoId(cenoteandoId: string,): Promise<boolean> {
    const doc = await cenotesDB.where("cenoteando_id", "==", cenoteandoId).get();

    return !doc.empty;
  }

  /**
   * Get the user favourite cenotes. Receives a list of cenote ids, using the cenoteando id.
   *
   * @param {string[]} favouriteCenotesIds the user favourite cenotes
   * @param {SortField} sort optional sort parameter
   * @param {PaginationInput} pagination optional pagination parameter
   *
   * @return {Promise<FavouriteCenote[]>} the list of favourite cenotes
   */
  async getUserFavouriteCenotes(favouriteCenotesIds: string[],
    sort: SortField | null | undefined = { field: "cenoteando_id", sortOrder: "ASC"},
    pagination: PaginationInput | null = { offset: 0, limit: 25 }): Promise<FavouriteCenote[]> {
    let query = cenotesDB.where("cenoteando_id", "in", favouriteCenotesIds)
      .orderBy(
        sort?.field ?? "name",
        sort?.sortOrder.toLowerCase() as firestore.OrderByDirection,
      );

    if (pagination) {
      query = query.offset(pagination.offset).limit(pagination.limit);
    }

    const cenotesSnapshot = await query.get();

    const favouriteCenotesList: FavouriteCenote[] = cenotesSnapshot.docs.map( (doc: any) => {
      const cenote = doc.data() as Cenote;
      const favouriteCenote: FavouriteCenote = {
        firestore_id: cenote.firestore_id,
        cenoteando_id: cenote.cenoteando_id,
        name: cenote.name,
        type: cenote.type,
        touristic: cenote.touristic,
        state: cenote.state,
        municipality: cenote.municipality,
        thumbnail: "http://example.com/thumbnail.jpg", // TODO
      };
      return favouriteCenote;
    });

    return favouriteCenotesList;
  }

  /**
   * Verify if a cenote exists by id.
   *
   * @param {ID} id of the cenote to verify
   *
   * @return {Promise<Boolean>} true if exists. Throws exception otherwise
   */
  async cenoteExists(id: ID): Promise<boolean> {
    const snapshot = await cenotesDB.doc(id).get();

    if (!snapshot.exists) {
      throw new Error("Cenote does not exist.");
    }

    return true;
  }
}
