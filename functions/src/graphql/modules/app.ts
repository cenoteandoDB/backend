import {createApplication} from "graphql-modules";
import {CenotesModule} from "./cenotes";
import {UsersModule} from "./users";

export const CenoteandoApp = createApplication({
    modules: [
        UsersModule,
        CenotesModule,
    ],
    providers: [],
    middlewares: {},
//   schemaBuilder: (typedefs, resolvers) => GraphQLSchema,
});
