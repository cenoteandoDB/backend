import { createApplication } from "graphql-modules";
import { CenotesModule } from "./cenotes";
import { UsersModule } from "./users";
import { SpeciesModule } from "./species";
import { AuditLogsModule } from "./auditLogs";
import { VariablesModule } from "./variables";
import { MofModule } from "./mof";

export const CenoteandoApp = createApplication({
    modules: [
        UsersModule,
        CenotesModule,
        SpeciesModule,
        VariablesModule,
        MofModule,
        AuditLogsModule
    ],
    providers: [],
    middlewares: {},
//   schemaBuilder: (typedefs, resolvers) => GraphQLSchema,
});
