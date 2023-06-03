import {createApplication} from "graphql-modules";
import {CenotesModule} from "./cenotes";
import {UsersModule} from "./users";
import { SpeciesModule } from "./species";

export const CenoteandoApp = createApplication({
    modules: [
        UsersModule,
        CenotesModule,
        SpeciesModule
    ],
    providers: [],
    middlewares: {},
//   schemaBuilder: (typedefs, resolvers) => GraphQLSchema,
});
