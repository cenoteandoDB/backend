import { VariablesModule } from "../generated-types/module-types";
import { VariableProvider } from "../providers/variable.provider";

export const MutationResolver: VariablesModule.Resolvers["Mutation"] = {
    createVariable: (parent, args, contextValue, info) => {
        return VariableProvider.createVariable(args.new_variable)
    },
    updateVariable: (parent, args, contextValue, info) => {
        return VariableProvider.updateVariable(args.updated_variable)
    },
};
