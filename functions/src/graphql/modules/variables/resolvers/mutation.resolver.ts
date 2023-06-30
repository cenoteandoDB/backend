import { AuditLogsProvider } from "../../auditLogs/providers/auditLogs.provider";
import { VariablesModule } from "../generated-types/module-types";
import { VariableProvider } from "../providers/variable.provider";

export const MutationResolver: VariablesModule.Resolvers["Mutation"] = {
    createVariable: async (parent, args, contextValue, info) => {
        const variable = await VariableProvider.createVariable(args.new_variable)
        AuditLogsProvider.save(variable.id, "NEW_VARIABLE", args.new_variable)
        return variable
    },
    updateVariable: async (parent, args, contextValue, info) => {
        const variable = await VariableProvider.updateVariable(args.updated_variable)
        AuditLogsProvider.save(args.updated_variable.id, "UPDATED_VARIABLE", args.updated_variable)
        return variable
    },
};
