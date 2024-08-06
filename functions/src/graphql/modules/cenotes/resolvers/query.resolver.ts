import { StorageProvider } from "../../gcp/gcp.provider";
import { CenotesModule } from "../generated-types/module-types";
import { CenotesProvider } from "../providers/cenotes.provider";

const cenotesProvider = new CenotesProvider();

export const QueryResolver: CenotesModule.Resolvers["Query"] = {
  getCenotes: (parent, args, contextValue, info) => {
    return cenotesProvider.getCenotes(args.sort, args.pagination, args.name);
  },

  cenoteById: (parent, args, contextValue, info) => {
    return cenotesProvider.getCenoteById(args.id);
  },

  cenotesBounds: () => {
    return cenotesProvider.getCenotesBounds();
  },

  cenotesCsv: () => {
    return cenotesProvider.cenotesToCsv();
  },

  generateCenotePhotoUploadUrl: (parent, args, contextValue, info) => {
    return StorageProvider
      .generateCenotePhotoUploadUrl(args.cenoteId, args.photoName, args.contentType);
  },
};
