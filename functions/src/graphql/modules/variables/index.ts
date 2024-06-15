import {loadFilesSync} from "@graphql-tools/load-files";
import {createModule} from "graphql-modules";
import {VariableResolvers} from "./resolvers";

export const VariablesModule = createModule({
    id: "variables",
    dirname: __dirname,
    typeDefs: loadFilesSync(__dirname + "/schema/**/*.graphql"),
    resolvers: VariableResolvers,
    middlewares: {},
    providers: [],
});
