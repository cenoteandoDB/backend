import { ID } from "graphql-modules/shared/types";
import { Species } from "../../../generated-types/graphql";
import { db } from "../../database/db";

const speciesDB = db.species;

/**
 * The Species provider.
 */
export class SpeciesProvider {
  /**
   * Get all species.
   *
   * @return {Promise<Species>} list with all references
   */
  async getSpecies(): Promise<Species[]> {
    const species = await speciesDB.get();
    return species.docs.map((doc: any) => doc.data() as Species);
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
