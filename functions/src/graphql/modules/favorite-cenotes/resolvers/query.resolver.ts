import { FavoriteCenotesModule } from "../generated-types/module-types";
import { FavoriteCenoteProvider } from "../providers/favorite-cenotes.provider";

const favoriteCenoteProvider = new FavoriteCenoteProvider();

export const QueryResolver: FavoriteCenotesModule.Resolvers["Query"] = {
  getfavoriteCenotes: (parent, args, contextValue, info) => {
    return favoriteCenoteProvider.getFavoriteCenotes(
      args.pagination,
      args.userId,
    );
  },
};
