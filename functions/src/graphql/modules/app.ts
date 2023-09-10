import { createApplication } from "graphql-modules";
import { CenotesModule } from "./cenotes";
import { UsersModule } from "./users";
import { SpeciesModule } from "./species";
import { AuditLogsModule } from "./auditLogs";
import { VariablesModule } from "./variables";
import { MofModule } from "./mof";
import { MapLayersModule } from "./map-layers";
import { LayersProvider } from "./gcp/gcp.dataSource";

export const CenoteandoApp = createApplication({
    modules: [
        UsersModule,
        CenotesModule,
        SpeciesModule,
        VariablesModule,
        MofModule,
        AuditLogsModule,
        MapLayersModule
    ],
    providers: [LayersProvider],
    middlewares: {},
//   schemaBuilder: (typedefs, resolvers) => GraphQLSchema,
});
