import { DirectionsService } from "../../../../api/googleAPI/directions";
import { Cenote, CenoteLocation, Coordinates, CoordinatesInput } from "../../../generated-types/graphql";
import { AuditLogsProvider } from "../../auditLogs/providers/auditLogs.provider";
import { CenotesModule } from "../generated-types/module-types";
import { CenotesProvider } from "../providers/cenotes.provider";

// TODO: Implement this
export const MutationResolver: CenotesModule.Resolvers["Mutation"] = {
    createCenote: async (parent, args, contextValue, info) => {
        const location = getCenoteLocation(args.new_cenote.coordinates)
        const cenote = await CenotesProvider.createCenote(args.new_cenote, location)
        cenoteCityDistances(cenote, args.new_cenote.coordinates)
        AuditLogsProvider.save("NEW_CENOTE", cenote.id, args.new_cenote)

        return cenote
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

const cenoteCityDistances = async (cenote: Cenote, coordinates: Coordinates) => {
    const distances = await DirectionsService.getDrivingDistance(coordinates)
    CenotesProvider.setCenoteDistances(cenote, distances)
}


