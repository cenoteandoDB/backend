import { AuditLogsModule } from "../generated-types/module-types";
import { AuditLogsProvider } from "../providers/auditLogs.provider";

export const QueryResolver: AuditLogsModule.Resolvers["Query"] = {
    auditLogs: (parent, args, contextValue, info) => AuditLogsProvider.getAuditLogs(args.id, args.type),
};
