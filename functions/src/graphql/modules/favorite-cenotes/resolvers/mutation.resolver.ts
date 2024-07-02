//import { AuditLogsProvider } from "../../auditLogs/providers/auditLogs.provider";
//import { StorageProvider } from "../../gcp/gcp.provider";
import { FavoriteCenotesModule } from "../generated-types/module-types";
import { FavoriteCenoteProvider } from "../providers/favorite-cenotes.provider";

const favoriteCenoteProvider = new FavoriteCenoteProvider();

export const MutationResolver: FavoriteCenotesModule.Resolvers["Mutation"] = {
  addFavoriteCenote: async (parent, args, contextValue, info) => {
    const favorite = await favoriteCenoteProvider.addFavoriteCenote(
      args.favoriteCenotes
    );
    return favorite;
  },
};
