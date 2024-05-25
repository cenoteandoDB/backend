import {UsersModule} from "../generated-types/module-types";
import {UsersProvider} from "../providers/users.provider";

const usersProvider = new UsersProvider();

export const MutationResolver: UsersModule.Resolvers["Mutation"] = {

    login: (parent, args, contextValue, info) => {
        return "Some-token";
    },

    register: (parent, args, contextValue, info) => {
        return usersProvider.register(args.input);
    },

    updateEmail: (parent, args, contextValue, info) => {
        return usersProvider.updateEmail(args.id, args.email);
    },
};
