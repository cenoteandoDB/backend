import { ID } from "graphql-modules/shared/types";
import { db } from "../../database/db";
import { Cenote, CenoteLocation, NewCenoteInput, UpdatedCenoteInput } from "../../../generated-types/graphql";

const cenotesDB = db.cenotes

export const CenotesProvider = {
    getCenotes: async () => {
        const cenote = await cenotesDB.get()
        return cenote.docs.map(doc => doc.data() as Cenote)
    },

    getCenoteById: async (id: ID) => {
        const snapshot = await cenotesDB.doc(id).get()
        return snapshot.data() as Cenote
    },

    getCenotesBounds: async () => {
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
    },

    cenotesToCsv: () => "",

    createCenote: async (new_cenote: NewCenoteInput, location: CenoteLocation) => {
        const docRef = cenotesDB.doc();
        await docRef.set({
            id: docRef.id,
            createdAt: new Date().toISOString(),
            location,
            ...new_cenote
        })
        
        const snapshot = await cenotesDB.doc(docRef.id).get()
        return snapshot.data() as Cenote
    },
    
    updateCenote: async (updated_cenote: UpdatedCenoteInput) => {
        await cenotesDB.doc(updated_cenote.id).update({
            ...updated_cenote,
            updatedAt: new Date().toISOString()
        })

        const snapshot = await cenotesDB.doc(updated_cenote.id).get()
        return snapshot.data() as Cenote
    }
};
