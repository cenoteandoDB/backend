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
        AuditLogsProvider.save(cenote.id, "NEW_CENOTE", args.new_cenote)

        return cenote
    },
    updateCenote: async (parent, args, contextValue, info) => {
        const cenote = await CenotesProvider.updateCenote(args.updated_cenote)
        AuditLogsProvider.save(args.updated_cenote.id, "UPDATED_CENOTE", args.updated_cenote)
        return cenote
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


