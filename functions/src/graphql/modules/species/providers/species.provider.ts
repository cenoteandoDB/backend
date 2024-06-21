import { ID, Maybe } from "graphql-modules/shared/types";
import {
  GbifSuggestion,
  GbifTaxonomicRank,
  INaturalistSearchTaxonResponse,
  NewSpeciesInput,
  Species,
  UpdateSpeciesInput,
} from "../../../generated-types/graphql";
import { db } from "../../database/db";

import axios from "axios";

const speciesDB = db.species;

export const SpeciesProvider = {
  getSpecies: async () => {
    const species = await speciesDB.get();
    return species.docs.map((doc) => doc.data() as Species);
  },

  getSpeciesById: async (id: ID) => {
    const snapshot = await speciesDB.doc(id).get();
    return snapshot.data() as Species;
  },

  getSpeciesByGBIFId: async (gbifId: ID) => {
    const snapshot = await speciesDB.where("gbifId", "==", gbifId).get();
    return snapshot.docs[0].data() as Species;
  },

  getSpeciesByINaturalistId: async (iNaturalistId: ID) => {
    const snapshot = await speciesDB
      .where("iNaturalistId", "==", iNaturalistId)
      .get();
    return snapshot.docs[0].data() as Species;
  },

  getGBIFSpeciesSuggestions: async (
    q: string,
    rank: Maybe<GbifTaxonomicRank>,
  ) => {
    const url = "http://api.gbif.org/v1/species/suggest";
    const response = await axios.get(url, {
      params: { q: q, rank: rank?.toString() },
    });
    const data = response.data;
    const suggestions: [GbifSuggestion] = data.reduce(
      (res: [GbifSuggestion], item: any) => {
        res.push({
          key: item.key,
          rank: item.rank,
          canonicalName: item.canonicalName,
          class: item.class,
          family: item.family,
          genus: item.genus,
          kingdom: item.kingdom,
          order: item.order,
          phylum: item.phylum,
          species: item.species,
        } as GbifSuggestion);
        return res;
      },
      [],
    );
    return suggestions;
  },

  getINaturalistSearch: async (q: string, perPage: Maybe<number>) => {
    const url = "https://api.inaturalist.org/v1/search";
    const response = await axios.get(url, {
      params: { q: q, perPage: perPage },
    });
    return response.data as INaturalistSearchTaxonResponse;
  },

  // TODO: implement species to csv
  speciesToCsv: () => "",

  // TODO: Make sure no duplicates exist already
  // TODO: Get GBIF and iNaturalist details if id is given
  createSpecies: async (newSpecies: NewSpeciesInput) => {
    const docRef = speciesDB.doc();

    await docRef.set({
      id: docRef.id,
      createdAt: new Date().toISOString(),
      ...newSpecies,
    });

    const snapshot = await speciesDB.doc(docRef.id).get();
    return snapshot.data() as Species;
  },

  // TODO: Make sure no duplicates exist already
  // TODO: Get updated GBIF and iNaturalist details if id is changed
  updateSpecies: async (updatedSpecies: UpdateSpeciesInput) => {
    await speciesDB.doc(updatedSpecies.id).update({
      gbifId: updatedSpecies.gbifId,
      iNaturalistId: updatedSpecies.iNaturalistId,
      updatedAt: new Date().toISOString(),
    });

    const snapshot = await speciesDB.doc(updatedSpecies.id).get();
    return snapshot.data() as Species;
  },
};
