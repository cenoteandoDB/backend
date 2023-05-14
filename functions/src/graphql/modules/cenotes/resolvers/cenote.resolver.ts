import {CenotesModule} from "../generated-types/module-types";

export const CenoteResolver: CenotesModule.Resolvers["Cenote"] = {
    id: (parent, args, contextValue, info) => parent.id,
    name: () => "Cenote Name",
    alternativeNames: () => [],
    type: () => "NO_TYPE",
    location: () => {
        return {
            coordinates: {
                latitude: "0",
                longitude: "0",
            },
            geojson: {},
            country: "Mexico",
            municipality: "Yucatan",
            state: "Yucatan"
        };
    },
    touristic: () => true,
    social: () => null,
    photos: () => [],
    maps: () => [],
    creator: () => null,
    contributors: () => [],
    createdAt: () => null,
    updatedAt: () => null,
    issues: () => [],
};
