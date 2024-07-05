import { AuditLogsProvider } from "../../auditLogs/providers/auditLogs.provider";
import { VariablesModule } from "../generated-types/module-types";
import { VariableProvider } from "../providers/variable.provider";

const variablesProvider = new VariableProvider();

export const MutationResolver: VariablesModule.Resolvers["Mutation"] = {
  createVariable: async (parent, args, contextValue, info) => {
    const variable = await variablesProvider.createVariable(args.new_variable);
    if (variable.firestore_id) {
      AuditLogsProvider.save(
        variable.firestore_id,
        "NEW_VARIABLE",
        args.new_variable,
      );
    }

    return variable;
  },

  updateVariable: async (parent, args, contextValue, info) => {
    const variable = await variablesProvider.updateVariable(
      args.firestore_id,
      args.updated_variable
    );
    AuditLogsProvider.save(
      args.firestore_id,
      "UPDATED_VARIABLE",
      args.updated_variable,
    );
    return variable;
  },

  deleteVariable: (parent, args, contextValue, info) => {
    return variablesProvider.deleteVariable(args.id);
  },
};
