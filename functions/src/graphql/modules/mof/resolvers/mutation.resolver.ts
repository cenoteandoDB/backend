import { MofModificationRequest } from "../../../generated-types/graphql";
import { requireAuth } from "../../../utils/auth";
import { MofModule } from "../generated-types/module-types";
import { MofProvider } from "../providers/mof.provider";

const mofProvider = new MofProvider();

export const MutationResolver: MofModule.Resolvers["Mutation"] = {
  requestCreateMof: async (parent, args, contextValue, info) => {
    const user = await requireAuth(contextValue.token);

    const createMofRequest: MofModificationRequest = {
      type: "CREATE",
      cenoteId: args.new_mof.cenoteId,
      variableId: args.new_mof.variableId,
      mof: {
        value: args.new_mof.value,
        timestamp: new Date(args.new_mof.timestamp).toISOString()
      }
    }
    return mofProvider.requestMofModification(createMofRequest, user);
  },
  requestDeleteMof: async (parent, args, contextValue, info) => {
    const user = await requireAuth(contextValue.token);
    const deleteMofRequest: MofModificationRequest = {
      type: "DELETE",
      cenoteId: args.delete_mof_input.cenoteId,
      variableId: args.delete_mof_input.variableId,
      mof: {
        value: args.delete_mof_input.value,
        timestamp: new Date(args.delete_mof_input.timestamp).toISOString()
      }
    }
    return mofProvider.requestMofModification(deleteMofRequest, user);
  },
  requestUpdateMof: async (parent, args, contextValue, info) => {
    const user = await requireAuth(contextValue.token);
    const updateMofRequest: MofModificationRequest = {
      type: "UPDATE",
      cenoteId: args.update_mof_input.cenoteId,
      variableId: args.update_mof_input.variableId,
      mof: {
        value: args.update_mof_input.value,
        timestamp: new Date(args.update_mof_input.timestamp).toISOString()
      },
      old_mof: {
        value: args.update_mof_input.oldValue,
        timestamp: new Date(args.update_mof_input.oldTimestamp).toISOString()
      }
    }
    return mofProvider.requestMofModification(updateMofRequest, user);
  },
  acceptMofRequest: (parent, args, contextValue, info) => {
    return mofProvider.acceptMofRequest(args.update_mof_id);
  },
  rejectMofRequest: (parent, args, contextValue, info) => {
    return mofProvider.rejectMofRequest(args.update_mof_id);
  }
};
