import {loadFilesSync} from "@graphql-tools/load-files";
import {createModule} from "graphql-modules";
import {ReferencesResolvers} from "./resolvers";

export const ReferencesModule = createModule({
    id: "references",
    dirname: __dirname,
    typeDefs: loadFilesSync(__dirname + "/schema/**/*.graphql"),
    resolvers: ReferencesResolvers,
    middlewares: {},
    providers: [],
});
