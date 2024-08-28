import { MofModule } from "../generated-types/module-types";
import { MofProvider } from "../providers/mof.provider";

const mofProvider = new MofProvider();

export const QueryResolver: MofModule.Resolvers["Query"] = {
  getCenoteDataByTheme: (parent, args, contextValue, info) => {
    return mofProvider.cenoteDataByTheme(args.cenoteId, args.theme);
  },

  getCenoteDataByVariable: (parent, args, contextValue, info) => {
    return mofProvider.cenoteDataByVariable(args.cenoteId, args.variableId);
  },

  getCenoteData: (parent, args, contextValue, info) => {
    return mofProvider.getCenoteData(args.cenoteId);
  },

  getThemesByCenote: (parent, args, contextValue, info) => {
    return mofProvider.getThemesByCenote(args.cenoteId);
  },

  getMofModificationRequests: (parent, args, contextValue, info) => {
    return mofProvider.getMofModificationRequests();
  },
};
