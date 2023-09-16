import { ID } from "graphql-modules/shared/types";
import { db } from "../../database/db";
import { Cenote, CenoteBounds, CenoteLocation, CityDistances, NewCenoteInput, UpdatedCenoteInput } from "../../../generated-types/graphql";

const cenotesDB = db.cenotes

export class CenotesProvider {
    /**
     * Get all cenotes.
     *
     * @returns {Promise<Cenote[]>} a list with all cenotes
     */
    async getCenotes(): Promise<Cenote[]> {
        const cenotes = await cenotesDB.get()
        return cenotes.docs.map(doc => doc.data() as Cenote)
    }

    /**
     * Get a cenote by id.
     *
     * @param id of the cenote to get
     * 
     * @returns {Promise<Cenote>} the cenote
     */
    async getCenoteById(id: ID): Promise<Cenote>  {
        const snapshot = await cenotesDB.doc(id).get()
        return snapshot.data() as Cenote
    }

    /**
     * Get the maximum and minimum latitude and longitude where cenotes are located.
     *
     * @returns {Promise<CenoteBounds>} the map cenote boundaries 
     */
    async getCenotesBounds(): Promise<CenoteBounds> {
        const maxLat = await cenotesDB.orderBy('lat', 'desc').limit(1).get()
                .then((snapshot) => (snapshot.docs[0].data() as Cenote).location.coordinates.latitude);
        const minLat = await cenotesDB.orderBy('lat', 'desc').limit(1).get()
                .then((snapshot) => (snapshot.docs[0].data() as Cenote).location.coordinates.latitude);
        const maxLng = await cenotesDB.orderBy('lng', 'asc').limit(1).get()
                .then((snapshot) => (snapshot.docs[0].data() as Cenote).location.coordinates.longitude);
        const minLng = await cenotesDB.orderBy('lng', 'asc').limit(1).get()
                .then((snapshot) => (snapshot.docs[0].data() as Cenote).location.coordinates.longitude);
        
        return {
            top_left: {
                latitude: maxLat,
                longitude: minLng
            },
            bottom_right: {
                latitude: minLat,
                longitude: maxLng
            }
        };
    }

    async cenotesToCsv() {
        return ""
    }

    /**
     * Creates a cenote.
     *
     * @param new_cenote new cenote input
     * @param location cenote geographical location
     *
     * @returns {Promise<Cenote>} the new cenote
     */
    async createCenote(new_cenote: NewCenoteInput, location: CenoteLocation): Promise<Cenote> {
        const docRef = cenotesDB.doc();
        await docRef.set({
            id: docRef.id,
            createdAt: new Date().toISOString(),
            location,
            ...new_cenote
        })
        
        const snapshot = await cenotesDB.doc(docRef.id).get()
        return snapshot.data() as Cenote
    }
    
    /**
     * Updates a cenote.
     *
     * @param updated_cenote the information to update the cenote
     *
     * @returns {Promise<Cenote>} the updated cenote
     */
    async updateCenote(updated_cenote: UpdatedCenoteInput): Promise<Cenote> {
        await cenotesDB.doc(updated_cenote.id).update({
            ...updated_cenote,
            updatedAt: new Date().toISOString()
        })

        const snapshot = await cenotesDB.doc(updated_cenote.id).get()
        return snapshot.data() as Cenote
    }

    /**
     * Set cenote distances into the 3 major cities in Yucatan.
     *
     * @param cenote the cenote to be set the distances
     * @param distances the distances to the cities
     */
    async setCenoteDistances (cenote: Cenote, distances: CityDistances[]): Promise<void> {
        cenotesDB.doc(cenote._id).update({
            ...cenote,
            updatedAt: new Date().toISOString(),
            distances
        })
    }
};
