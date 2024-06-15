import axios from "axios";
// eslint-disable-next-line max-len
import {CityDistances, Coordinates} from "../../graphql/generated-types/graphql";
// import { Coordinates } from "../../graphql/generated-types/graphql";

const BASE_URL = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=";
const CANCUN = "21.121323,-86.9316342";
const MERIDA = "20.9800457,-89.7153191";
const TULUM = "20.2096197,-87.4821757";
const citiesOrder = ["Cancun", "Merida", "Tulum"];

export const DirectionsService = {
    getDrivingDistance: async (origin: Coordinates) => {
        const distances: CityDistances[] = [];
        try {
            const url = getURL(origin);
            const response = await axios.get(url);
            const data = response.data;

            if (data.status === "OK") {
                for (let i = 0; i < citiesOrder.length; i++) {
                    const info = data.rows[0].elements[i];
                    const locationDistance = {
                        location: citiesOrder[i],
                        distance: info.distance.value / 1000,
                        duration: info.duration.value,
                    };

                    distances.push(locationDistance);
                }
                return distances;
            } else {
                throw new Error("Unable to retrieve driving distance");
            }
        } catch (error: any) {
            throw new Error(error.message);
        }
    },
};

const getURL = (origin: Coordinates) : string => {
    const destinations = `${CANCUN}|${MERIDA}|${TULUM}`;
    return BASE_URL +
        `${origin.latitude},${origin.longitude}` +
        `&destinations=${destinations}&key=${process.env.GOOGLE_API_KEY}`;
};

// https://developers.google.com/maps/documentation/directions/usage-and-billing
