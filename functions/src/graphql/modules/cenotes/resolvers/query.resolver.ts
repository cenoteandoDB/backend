import {CenotesModule} from "../generated-types/module-types";

export const QueryResolver: CenotesModule.Resolvers["Query"] = {
    cenoteById: (parent, args, contextValue, info) => {
        return {
            id: args.id,
            type: "NO_TYPE",
            location: {
                coordinates: {
                    latitude: "0",
                    longitude: "0",
                },
                geojson: {},
                country: "Mexico",
                municipality: "Yucatan",
                state: "Yucatan"
            },
            touristic: true,
        };
    },
    cenotes: () => [],
    cenotesBounds: () => {
        return {
            top_left: {
                latitude: "0",
                longitude: "0",
            },
            bottom_right: {
                latitude: "0",
                longitude: "0",
            },
        };
    },
    cenotesCsv: () => "",
};
