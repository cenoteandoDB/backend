import {loadFilesSync} from "@graphql-tools/load-files";
import {createModule} from "graphql-modules";
import {SpeciesResolvers} from "./resolvers";

export const SpeciesModule = createModule({
    id: "species",
    dirname: __dirname,
    typeDefs: loadFilesSync(__dirname + "/schema/**/*.graphql"),
    resolvers: SpeciesResolvers,
    middlewares: {},
    providers: [],
});
