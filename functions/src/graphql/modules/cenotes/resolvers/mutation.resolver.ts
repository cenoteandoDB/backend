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
  updateCenoteBasicInfo: async (parent, args, contextValue, info) => {
    const cenote = await cenotesProvider.updateCenoteBasicInfo(args.updatedCenote);
    AuditLogsProvider.save(
      args.updatedCenote.firestore_id,
      "UPDATED_CENOTE",
      args.updatedCenote,
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
  changeCenoteMainPhoto: async (parent, args, contextValue, info) => {
    return cenotesProvider.changeCenoteMainPhoto(args.cenoteId, args.photoId);
  },
  deletePhoto: async (parent, args, contextValue, info) => {
    return cenotesProvider.deletePhoto(args.cenoteId, args.photoId);
  },

};
