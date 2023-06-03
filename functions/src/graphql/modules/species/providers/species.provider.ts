import { ID } from "graphql-modules/shared/types";
import { NewSpeciesInput, Species, UpdateSpeciesInput } from "../../../generated-types/graphql";
import { db } from "../../database/db";

const speciesDB = db.species

export const SpeciesProvider = {
    getSpecies: async () => {
        const species = await speciesDB.get()
        return species.docs.map(doc => doc.data() as Species)
    },

    getSpeciesById: async (id: ID) => {
        const snapshot = await speciesDB.doc(id).get()
        return snapshot.data() as Species
    },

    getSpeciesByAphiaId: async (parent: any, args: any, contextValue: any, info: any) => {
        const snapshot = await speciesDB.where("aphiaId", "==", args.aphiaId).get()
        return snapshot.docs[0].data();
    },

    getSpeciesByINaturalistId: async (parent: any, args: any, contextValue: any, info: any) => {
        const snapshot = await speciesDB.where("iNaturalistId", "==", args.iNaturalistId).get()
        return snapshot.docs[0].data();
    },
    speciesToCsv: () => "",

    createSpecies: async (new_species: NewSpeciesInput) => {
        const docRef = speciesDB.doc();
        await docRef.set({
            id: docRef.id,
            createdAt: new Date().toISOString(),
            ...new_species
        })
        
        const snapshot = await speciesDB.doc(docRef.id).get()
        return snapshot.data() as Species
    },
    updateSpecies: async (updated_species: UpdateSpeciesInput) => {
        await speciesDB.doc(updated_species.id).update({
            aphiaId: updated_species.aphiaId,
            iNaturalistId: updated_species.iNaturalistId,
            updatedAt: new Date().toISOString()
        })

        const snapshot = await speciesDB.doc(updated_species.id).get()
        return snapshot.data() as Species
    }
};
