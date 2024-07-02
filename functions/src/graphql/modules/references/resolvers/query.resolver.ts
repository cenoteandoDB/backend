import { ReferencesModule } from "../generated-types/module-types";
import { ReferenceProvider } from "../providers/reference.provider";

const referenceProvider = new ReferenceProvider();

export const QueryResolver: ReferencesModule.Resolvers["Query"] = {
  getReferences: (parent, args, contextValue, info) => {
    return referenceProvider.getReferences(args.sort, args.pagination, args.title);
  },
  getReferenceById: (parent, args, contextValue, info) => {
    return referenceProvider.getReferenceById(args.id);
  },
};
