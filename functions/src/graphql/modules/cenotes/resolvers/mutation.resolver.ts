import { CenoteLocation, CoordinatesInput } from "../../../generated-types/graphql";
import { CenotesModule } from "../generated-types/module-types";
import { CenotesProvider } from "../providers/cenotes.provider";

// TODO: Implement this
export const MutationResolver: CenotesModule.Resolvers["Mutation"] = {
    createCenote: (parent, args, contextValue, info) => {
        const location = getCenoteLocation(args.new_cenote.coordinates)
        return CenotesProvider.createCenote(args.new_cenote, location)
    },
    updateCenote: (parent, args, contextValue, info) => {
        return CenotesProvider.updateCenote(args.updated_cenote)
    }
};

const getCenoteLocation = (input: CoordinatesInput) => {
    const location : CenoteLocation = {
        coordinates: {
            latitude: input.latitude,
            longitude: input.longitude,
        },
        country: "Mexico",
        state: "State",
        municipality: "Municipality"
    }

    return location
}



