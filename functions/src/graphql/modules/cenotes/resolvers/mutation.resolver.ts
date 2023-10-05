import { AuditLogsProvider } from "../../auditLogs/providers/auditLogs.provider";
import { CenotesModule } from "../generated-types/module-types";
import { CenotesProvider } from "../providers/cenotes.provider";

const cenotesProvider = new CenotesProvider()

export const MutationResolver: CenotesModule.Resolvers["Mutation"] = {
    createCenote: async (parent, args, contextValue, info) => {
        const cenote = await cenotesProvider.createCenote(args.new_cenote, args.new_cenote.coordinates)
        AuditLogsProvider.save(cenote.id, "NEW_CENOTE", args.new_cenote)

        return cenote
    },
    updateCenote: async (parent, args, contextValue, info) => {
        const cenote = await cenotesProvider.updateCenote(args.updated_cenote)
        AuditLogsProvider.save(args.updated_cenote.id, "UPDATED_CENOTE", args.updated_cenote)
        return cenote
    }
};


