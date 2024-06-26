import { loadFilesSync } from "@graphql-tools/load-files";
import { createModule } from "graphql-modules";
import { AuditLogsResolvers } from "./resolvers";

export const AuditLogsModule = createModule({
  id: "auditLogs",
  dirname: __dirname,
  typeDefs: loadFilesSync(__dirname + "/schema/**/*.graphql"),
  resolvers: AuditLogsResolvers,
  middlewares: {},
  providers: [],
});
