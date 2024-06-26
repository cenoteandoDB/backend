import {loadFilesSync} from "@graphql-tools/load-files";
import {createModule} from "graphql-modules";
import {MofResolvers} from "./resolvers";

export const MofModule = createModule({
    id: "mof",
    dirname: __dirname,
    typeDefs: loadFilesSync(__dirname + "/schema/**/*.graphql"),
    resolvers: MofResolvers,
    middlewares: {},
    providers: [],
});
