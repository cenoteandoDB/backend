import { requireAuth } from "../../../utils/auth";
import { MofModule } from "../generated-types/module-types";
import { MofProvider } from "../providers/mof.provider";

const mofProvider = new MofProvider();

export const QueryResolver: MofModule.Resolvers["Query"] = {
  getCenoteDataByTheme: async (parent, args, contextValue, info) => {
    const user = await requireAuth(contextValue.token);

    return mofProvider.cenoteDataByTheme(user.id, args.cenoteId, args.theme);
  },

  getCenoteDataByCategory: async (parent, args, contextValue, info) => {
    const user = await requireAuth(contextValue.token);

    return mofProvider.cenoteDataByCategory(user.id, args.cenoteId, args.category);
  },

  getCenoteDataByVariable: async (parent, args, contextValue, info) => {
    const user = await requireAuth(contextValue.token);

    return mofProvider.cenoteDataByVariable(user.id, args.cenoteId, args.variableId);
  },

  getCenoteData: async (parent, args, contextValue, info) => {
    const user = await requireAuth(contextValue.token);

    return mofProvider.getCenoteData(user.id, args.cenoteId);
  },

  getThemesByCenote: async (parent, args, contextValue, info) => {
    const user = await requireAuth(contextValue.token);
    return mofProvider.getThemesByCenote(user.id, args.cenoteId);
  },

  getMofModificationRequests: (parent, args, contextValue, info) => {
    return mofProvider.getMofModificationRequests();
  },

  getCenoteVariablesWithoutData: (parent, args, contextValue, info) => {
    return mofProvider.getCenoteVariablesWithoutData(args.cenoteId);
  },
};
