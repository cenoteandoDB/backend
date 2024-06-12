import {UsersModule} from "../generated-types/module-types";
  
export const UserResolver: UsersModule.Resolvers["User"] = {
    cenoteViewWhiteList: (parent) => (parent.cenoteViewWhiteList != null ? parent.cenoteViewWhiteList : []),
    cenoteViewBlackList: (parent) => (parent.cenoteViewBlackList != null ? parent.cenoteViewBlackList : []),
    cenoteEditWhiteList: (parent) => (parent.cenoteEditWhiteList != null ? parent.cenoteEditWhiteList : []),
    cenoteEditBlackList: (parent) => (parent.cenoteEditBlackList != null ? parent.cenoteEditBlackList : []),
};
