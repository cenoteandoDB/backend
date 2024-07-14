import { CenotesProvider } from "../../cenotes/providers/cenotes.provider";
import { UsersModule } from "../generated-types/module-types";

export const UserResolver: UsersModule.Resolvers["User"] = {
  cenoteViewWhiteList: (parent) =>
    parent.cenoteViewWhiteList ? parent.cenoteViewWhiteList : [],
  cenoteViewBlackList: (parent) =>
    parent.cenoteViewBlackList ? parent.cenoteViewBlackList : [],
  cenoteEditWhiteList: (parent) =>
    parent.cenoteEditWhiteList ? parent.cenoteEditWhiteList : [],
  cenoteEditBlackList: (parent) =>
    parent.cenoteEditBlackList ? parent.cenoteEditBlackList : [],

  variableViewWhiteList: (parent) =>
    parent.variableViewWhiteList ? parent.variableViewWhiteList : [],
  variableViewBlackList: (parent) =>
    parent.variableViewBlackList ? parent.variableViewBlackList : [],
  variableEditWhiteList: (parent) =>
    parent.variableEditWhiteList ? parent.variableEditWhiteList : [],
  variableEditBlackList: (parent) =>
    parent.variableEditBlackList ? parent.variableEditBlackList : [],
  favouriteCenotes: (parent) => {
    if (!parent.favouriteCenotesIds) return [];
    const cenotesProvider = new CenotesProvider();
    return cenotesProvider.getUserFavouriteCenotes(parent.favouriteCenotesIds);
  },
};
