import {VariablesModule} from "../generated-types/module-types";
import {VariableProvider} from "../providers/variable.provider";

const variablesProvider = new VariableProvider();

export const QueryResolver: VariablesModule.Resolvers["Query"] = {
    variables: () => {
        return variablesProvider.getVariables();
    },
    variableById: (parent, args, contextValue, info) => {
        return variablesProvider.getVariableById(args.id);
    },
    variablesByTheme: (parent, args, contextValue, info) => {
        return variablesProvider.getVariablesByTheme(args.theme);
    },
};
