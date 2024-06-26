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

    registerTourist: (parent, args, contextValue, info) => {
        return usersProvider.register(args.userInfo, "TOURIST", args.profileData);
    },

    registerStudent: (parent, args, contextValue, info) => {
        return usersProvider.register(args.userInfo, "STUDENT", args.profileData);
    },

    registerTeacher: (parent, args, contextValue, info) => {
        return usersProvider.register(args.userInfo, "TEACHER", args.profileData);
    },

    registerInvestigator: (parent, args, contextValue, info) => {
        return usersProvider.register(args.userInfo, "INVESTIGATOR", args.profileData);
    },

    registerGovern: (parent, args, contextValue, info) => {
        return usersProvider.register(args.userInfo, "GOVERN", args.profileData);
    },
};
