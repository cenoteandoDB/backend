import { AuditLogsProvider } from "../../auditLogs/providers/auditLogs.provider";
import { ReferencesModule } from "../generated-types/module-types";
import { ReferenceProvider } from "../providers/reference.provider";

const referenceProvider = new ReferenceProvider();

export const MutationResolver: ReferencesModule.Resolvers["Mutation"] = {
  createReference: async (parent, args, contextValue, info) => {
    const reference = await referenceProvider.createReference(args.new_reference);
    AuditLogsProvider.save(reference.firestore_id, "NEW_REFERENCE", args.new_reference);

    return reference;
  },

  updateReference: async (parent, args, contextValue, info) => {
    const reference = await referenceProvider.updateReference(args.id, args.updated_reference);
    AuditLogsProvider.save(reference.firestore_id, "UPDATED_REFERENCE", args.updated_reference);

    return reference;
  },

  deleteReference: async (parent, args, contextValue, info) => {
    const cenote = await referenceProvider.deleteReference(args.id);
    AuditLogsProvider.save(args.id, "DELETE_REFERENCE", args.id);
    return cenote;
  },
};
