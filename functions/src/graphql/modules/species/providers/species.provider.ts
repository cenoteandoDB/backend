import { ID } from "graphql-modules/shared/types";
import { PaginationInput, SortField, Species, SpeciesList } from "../../../generated-types/graphql";
import { db } from "../../database/db";
import { firestore } from "firebase-admin";

const speciesDB = db.species;

/**
 * The Species provider.
 */
export class SpeciesProvider {
  /**
   * Get all species.
   *
   * @param {SortField | null | undefined} sort the sort
   * @param {PaginationInput | null} pagination the pagination
   * @param {string | null | undefined} name the name of the species
   *
   * @return {Promise<Species>} list with all references
   */
  async getSpecies(sort: SortField | null | undefined = {field: "id", sortOrder: "ASC"},
    pagination: PaginationInput | null = { offset: 0, limit: 25 },
    name: string | null | undefined): Promise<SpeciesList> {
    let query: any;
    let countQuery: any;
    if (name) {
      const endSearch = name.replace(/.$/, (c) =>
        String.fromCharCode(c.charCodeAt(0) + 1),
      );
      query = speciesDB
        .where("name", ">=", name)
        .where("name", "<", endSearch)
        .orderBy(
          sort?.field ?? "name",
          sort?.sortOrder.toLowerCase() as firestore.OrderByDirection,
        );
      countQuery = speciesDB
        .where("name", ">=", name)
        .where("name", "<", endSearch);
    } else {
      query = speciesDB.orderBy(
        sort?.field ?? "name",
        sort?.sortOrder.toLowerCase() as firestore.OrderByDirection,
      );
      countQuery = speciesDB;
    }

    if (pagination) {
      query = query.offset(pagination.offset).limit(pagination.limit);
    }

    const [speciesSnapshot, totalCountSnapshot] = await Promise.all([
      query.get(),
      countQuery.get(),
    ]);

    const species = speciesSnapshot.docs.map(
      (doc: any) => doc.data() as Species,
    );
    const totalCount = totalCountSnapshot.size;

    return { species, totalCount };
  }

  /**
   * Get species by id.
   *
   * @param {ID} id the id of the species to get
   *
   * @return {Promise<Species>} the species
   */
  async getSpeciesById(id: ID): Promise<Species> {
    const snapshot = await speciesDB.where("id", "==", id).get();

    if (snapshot.empty) {
      throw new Error("Species not found");
    }

    return snapshot.docs[0].data() as Species;
  }

  /**
   * Get species by GBIF id.
   *
   * @param {ID} gbifId the GBIF id of the species to get
   *
   * @return {Promise<Species>} the species
   */
  async getSpeciesByGbifId(gbifId: ID): Promise<Species> {
    const snapshot = await speciesDB.where("gbifId", "==", gbifId).get();

    if (snapshot.empty) {
      throw new Error("Species not found");
    }

    return snapshot.docs[0].data() as Species;
  }

  /**
   * Get species by iNaturalist id.
   *
   * @param {ID} iNaturalistId the iNaturalist id of the species to get
   *
   * @return {Promise<Species>} the species
   */
  async getSpeciesByINaturalistId(iNaturalistId: ID): Promise<Species> {
    const snapshot = await speciesDB.where("inaturalistId", "==", iNaturalistId).get();

    if (snapshot.empty) {
      throw new Error("Species not found");
    }

    return snapshot.docs[0].data() as Species;
  }

  /**
   * Get species from a list of ids.
   *
   * @param {string[]} speciesIds the list of species ids to load
   *
   * @return {Promise<Species[]>} the species list
   */
  async getCenoteSpecies(speciesIds: string[]): Promise<Species[]> {
    const speciesSnapshot = await speciesDB.where("id", "in", speciesIds).get();

    return speciesSnapshot.docs.map((doc: any) => doc.data() as Species);
  }
}
