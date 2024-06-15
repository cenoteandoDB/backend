import {createApplication} from "graphql-modules";
import {CenotesModule} from "./cenotes";
import {UsersModule} from "./users";
import {SpeciesModule} from "./species";
import {AuditLogsModule} from "./auditLogs";
import {VariablesModule} from "./variables";
import {MofModule} from "./mof";
import {MapLayersModule} from "./map-layers";
import {LayersProvider} from "./gcp/gcp.dataSource";
import {ReferencesModule} from "./references";

export const CenoteandoApp = createApplication({
    modules: [
        UsersModule,
        CenotesModule,
        SpeciesModule,
        VariablesModule,
        ReferencesModule,
        MofModule,
        AuditLogsModule,
        MapLayersModule,
    ],
    providers: [LayersProvider],
    middlewares: {},
//   schemaBuilder: (typedefs, resolvers) => GraphQLSchema,
});
