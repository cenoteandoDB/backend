import {UsersModule} from "../generated-types/module-types";
import {UsersProvider} from "../providers/users.provider";

const usersProvider = new UsersProvider();

export const MutationResolver: UsersModule.Resolvers["Mutation"] = {

    login: (parent, args, contextValue, info) => {
        return usersProvider.login(args.email, args.password);
    },

    inviteUser: (parent, args, contextValue, info) => {
        return usersProvider.inviteUser(args.email, args.name, args.userRole);
    },

    saveUser: (parent, args, contextValue, info) => {
        return usersProvider.saveUser(args.userInfo);
    },

    updateUserInfo: (parent, args, contextValue, info) => {
        return usersProvider.updateUserInfo(args.userId, args.userInfo);
    },

    deleteUser: (parent, args, contextValue, info) => {
        return usersProvider.deleteUser(args.userId);
    },
};
