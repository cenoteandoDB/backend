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

    register: (parent, args, contextValue, info) => {
        return usersProvider.register(args.userInfo);
    },

    updateUserInfo: (parent, args, contextValue, info) => {
        return usersProvider.updateUserInfo(args.userId, args.userInfo);
    },

    updateCenotePermissions: (parent, args, contextValue, info) => {
        return usersProvider.updateCenotePermissions(args.userId, args.cenotePermissions);
    },

    updateVariablePermissions: (parent, args, contextValue, info) => {
        return usersProvider.updateVariablePermissions(args.userId, args.variablePermissions);
    },

    deleteUser: (parent, args, contextValue, info) => {
        return usersProvider.deleteUser(args.userId);
    },
};
