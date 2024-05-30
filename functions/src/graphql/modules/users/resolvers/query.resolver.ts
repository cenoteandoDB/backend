import {UsersModule} from "../generated-types/module-types";
import {UsersProvider} from "../providers/users.provider";

const usersProvider = new UsersProvider();

export const QueryResolver: UsersModule.Resolvers["Query"] = {
    getUsers: (parent, args, contextValue, info) => {
        return usersProvider.getUsers(args.sort, args.pagination);
    },
    getUserById: (parent, args, contextValue, info) => {
        return UsersProvider.getUserById(args.id);
    },
    getUserByEmail: (parent, args, contextValue, info) => {
        return usersProvider.getUserByEmail(args.email);
    },
    getUserByName: (parent, args, contextValue, info) => {
        return usersProvider.getUserByName(args.name);
    },
    verifyCode: (parent, args, contextValue, info) => {
        return usersProvider.verifyCode(args.code);
    }
};
