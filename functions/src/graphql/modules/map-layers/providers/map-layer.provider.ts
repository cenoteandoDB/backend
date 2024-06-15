import {MapLayer, MapLayerInput} from "../../../generated-types/graphql";
import {db} from "../../database/db";

const mapLayerDB = db.map_layers;

/**
 * The UserProvider service is responsible for all user-related operations.
 */
export class MapLayerProvider {
    /**
     * Get all map layers.
     *
     * @return {Promise<MapLayer[]>} list of all map layers
     */
    async getMapLayers() {
        const mapLayers = await mapLayerDB.get();
        return mapLayers.docs.map((doc) => doc.data() as MapLayer);
    }

    /**
     * Get a map layer by its ID.
     *
     * @param {string} id - The identifier of the map layer to fetch.
     *
     * @return {Promise<MapLayer>}
     */
    async getMapLayer(id: string): Promise<MapLayer> {
        const snapshot = await mapLayerDB.where("id", "==", id).get();

        if (snapshot.size == 0) {
            throw new Error("Map layer not found.");
        }
        return snapshot.docs[0].data() as MapLayer;
    }

    /**
     * Create a map layer.
     *
     * @param {MapLayerInput} input map layer input to be created
     *
     * @return {Promise<User>} the new map layer
     */
    async create(input: MapLayerInput): Promise<MapLayer> {
        // TODO encrypt password
        const docRef = mapLayerDB.doc();
        await docRef.set({
            createdAt: new Date().toISOString(),
            ...input,
        });

        const snapshot = await mapLayerDB.doc(docRef.id).get();
        return snapshot.data() as MapLayer;
    }
}
