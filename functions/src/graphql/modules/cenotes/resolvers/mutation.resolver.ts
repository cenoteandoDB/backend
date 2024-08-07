import { AuditLogsProvider } from "../../auditLogs/providers/auditLogs.provider";
import { StorageProvider } from "../../gcp/gcp.provider";
import { CenotesModule } from "../generated-types/module-types";
import { CenotesProvider } from "../providers/cenotes.provider";

const cenotesProvider = new CenotesProvider();

export const MutationResolver: CenotesModule.Resolvers["Mutation"] = {
  createCenote: async (parent, args, contextValue, info) => {
    const cenote = await cenotesProvider.createCenote(
      args.new_cenote,
      args.new_cenote.coordinates,
    );
    AuditLogsProvider.save(cenote.firestore_id, "NEW_CENOTE", args.new_cenote);

    return cenote;
  },
  updateCenote: async (parent, args, contextValue, info) => {
    const cenote = await cenotesProvider.updateCenote(args.updated_cenote);
    AuditLogsProvider.save(
      args.updated_cenote.id,
      "UPDATED_CENOTE",
      args.updated_cenote,
    );
    return cenote;
  },
  deleteCenote: async (parent, args, contextValue, info) => {
    const cenote = await cenotesProvider.deleteCenote(args.id);
    AuditLogsProvider.save(args.id, "DELETE_CENOTE", args.id);
    return cenote;
  },
  uploadPhoto: async (parent, args, contextValue, info) => {
    return StorageProvider.uploadPhoto(args.photoInput);
  },
  uploadMap: async (parent, args, contextValue, info) => {
    return StorageProvider.uploadMap(args.mapInput);
  },
};
