import { createApplication } from "graphql-modules";
import { CenotesModule } from "./cenotes";
import { UsersModule } from "./users";
import { SpeciesModule } from "./species";
import { AuditLogsModule } from "./auditLogs";

export const CenoteandoApp = createApplication({
    modules: [
        UsersModule,
        CenotesModule,
        SpeciesModule,
        AuditLogsModule
    ],
    providers: [],
    middlewares: {},
//   schemaBuilder: (typedefs, resolvers) => GraphQLSchema,
});
