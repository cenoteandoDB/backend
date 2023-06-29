import { VariablesModule } from "../generated-types/module-types";
import { VariableProvider } from "../providers/variable.provider";

export const QueryResolver: VariablesModule.Resolvers["Query"] = {
    variables: (parent, args, contextValue, info) => {
        return VariableProvider.getVariables()
    },
    variableById: (parent, args, contextValue, info) => {
        return VariableProvider.getVariableById(args.id);
    },
    variablesByTheme: (parent, args, contextValue, info) => {
        return VariableProvider.getVariablesByTheme(args.theme);
    }
};
