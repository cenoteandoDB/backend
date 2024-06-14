import {VariablesModule} from "../generated-types/module-types";
import {VariableProvider} from "../providers/variable.provider";

const variablesProvider = new VariableProvider();

export const QueryResolver: VariablesModule.Resolvers["Query"] = {
    getVariables: (parent, args, contextValue, info) => {
        return variablesProvider.getVariables(args.sort, args.pagination, args.name);
    },
    getVariableById: (parent, args, contextValue, info) => {
        return variablesProvider.getVariableById(args.id);
    },
    getVariablesByTheme: (parent, args, contextValue, info) => {
        return variablesProvider.getVariablesByTheme(args.theme);
    },
};
