/* eslint-disable require-jsdoc */
import {ID} from "graphql-modules/shared/types";
import {db} from "../../database/db";
import {
    Cenote,
    CenoteBounds,
    CenoteLocation,
    CoordinatesInput,
    NewCenoteInput,
    UpdatedCenoteInput,
} from "../../../generated-types/graphql";
import {DirectionsService} from "../../../../api/googleAPI/directions";

const cenotesDB = db.cenotes;

export class CenotesProvider {
    /**
     * Get all cenotes.
     *
     * @return {Promise<Cenote[]>} a list with all cenotes
     */
    async getCenotes(): Promise<Cenote[]> {
        const cenotes = await cenotesDB.get();
        return cenotes.docs.map((doc) => doc.data() as Cenote);
    }

    /**
     * Get a cenote by id.
     *
     * @param {ID} id of the cenote to get
     *
     * @return {Promise<Cenote>} the cenote
     */
    async getCenoteById(id: ID): Promise<Cenote> {
        const snapshot = await cenotesDB.where("_key", "==", id).get();
        return snapshot.docs[0].data() as Cenote;
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
            .then(
                (snapshot) =>
                    (snapshot.docs[0].data() as Cenote).location.coordinates
                        .latitude
            );
        const minLat = await cenotesDB
            .orderBy("lat", "desc")
            .limit(1)
            .get()
            .then(
                (snapshot) =>
                    (snapshot.docs[0].data() as Cenote).location.coordinates
                        .latitude
            );
        const maxLng = await cenotesDB
            .orderBy("lng", "asc")
            .limit(1)
            .get()
            .then(
                (snapshot) =>
                    (snapshot.docs[0].data() as Cenote).location.coordinates
                        .longitude
            );
        const minLng = await cenotesDB
            .orderBy("lng", "asc")
            .limit(1)
            .get()
            .then(
                (snapshot) =>
                    (snapshot.docs[0].data() as Cenote).location.coordinates
                        .longitude
            );

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
        coordinates: CoordinatesInput
    ): Promise<Cenote> {
        const distances = await DirectionsService.getDrivingDistance(
            coordinates
        );
        const location = this.getCenoteLocation(coordinates);

        const docRef = cenotesDB.doc();
        await docRef.set({
            id: docRef.id,
            createdAt: new Date().toISOString(),
            location,
            distances,
            ...newCenote,
        });

        const snapshot = await cenotesDB.doc(docRef.id).get();
        return snapshot.data() as Cenote;
    }

    /**
     * Updates a cenote.
     *
     * @param {UpdatedCenoteInput} updatedCenote the information
     * to update the cenote
     *
     * @return {Promise<Cenote>} the updated cenote
     */
    async updateCenote(updatedCenote: UpdatedCenoteInput): Promise<Cenote> {
        await cenotesDB.doc(updatedCenote.id).update({
            ...updatedCenote,
            updatedAt: new Date().toISOString(),
        });

        const snapshot = await cenotesDB.doc(updatedCenote.id).get();
        return snapshot.data() as Cenote;
    }

    /**
     * Get Cenote Location information.
     *
     * @param {CoordinatesInput} input the cenote coordinates
     *
     * @return {CenoteLocation} with Cenote's coordinates, country,
     * state and municipality
     */
    private getCenoteLocation(input: CoordinatesInput): CenoteLocation {
        const location: CenoteLocation = {
            coordinates: {
                latitude: input.latitude,
                longitude: input.longitude,
            },
            country: "Mexico",
            state: "State",
            municipality: "Municipality",
        };

        return location;
    }
}
