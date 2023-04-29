import {CenotesModule} from "../generated-types/module-types";

// TODO: Implement this
export const MutationResolver: CenotesModule.Resolvers["Mutation"] = {
    createCenote: (parent, args, contextValue, info) => {
        return {
            id: "new_cenote_id_000",
            location: {
                coordinates: {
                    latitude: args.new_cenote.coordinates.latitude,
                    longitude: args.new_cenote.coordinates.longitude,
                },
                geojson: {},
            },
            touristic: true,
            type: "NO_TYPE",
        };
    },
};
