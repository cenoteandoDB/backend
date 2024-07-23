import { VariableProvider } from "../../variables/providers/variable.provider";
import { MofModule } from "../generated-types/module-types";

const variableProvider = new VariableProvider();

export const VariableWithDataResolver: MofModule.Resolvers["VariableWithData"] = {
  variableIcon: async (parent) => {
    const variable = await variableProvider.getVariableById(parent.variableId);
    return variable.icon ? variable.icon : "";
  },
  variableRepresentation: async (parent) => {
    const variable = await variableProvider.getVariableById(parent.variableId);
    return variable.variableRepresentation ? variable.variableRepresentation : "TEXT";
  },
  variableUnits: async (parent) => {
    const variable = await variableProvider.getVariableById(parent.variableId);
    return variable.units ? variable.units : "";
  },
};
