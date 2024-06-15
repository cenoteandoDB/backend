import {UsersModule} from "../generated-types/module-types";
  
export const UserResolver: UsersModule.Resolvers["User"] = {
    cenoteViewWhiteList: (parent) => (parent.cenoteViewWhiteList ? parent.cenoteViewWhiteList : []),
    cenoteViewBlackList: (parent) => (parent.cenoteViewBlackList ? parent.cenoteViewBlackList : []),
    cenoteEditWhiteList: (parent) => (parent.cenoteEditWhiteList ? parent.cenoteEditWhiteList : []),
    cenoteEditBlackList: (parent) => (parent.cenoteEditBlackList ? parent.cenoteEditBlackList : []),
};
