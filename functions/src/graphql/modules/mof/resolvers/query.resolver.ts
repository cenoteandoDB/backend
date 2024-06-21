import { MofModule } from "../generated-types/module-types";
import { MofProvider } from "../providers/mof.provider";

const mofProvider = new MofProvider();

export const QueryResolver: MofModule.Resolvers["Query"] = {
  cenoteDataByTheme: (parent, args, contextValue, info) => {
    return mofProvider.cenoteDataByTheme(args.cenote, args.theme);
  },

  cenoteDataByVariable: (parent, args, contextValue, info) => {
    return mofProvider.cenoteDataByVariable(args.cenote, args.variable);
  },
};
