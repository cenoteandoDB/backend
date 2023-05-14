import {UsersModule} from "../generated-types/module-types";
import {UsersProvider} from "../providers/users.provider"

export const QueryResolver: UsersModule.Resolvers["Query"] = {
    users: () => [],
    user: (parent, args, contextValue, info) => {
        const userProvider = new UsersProvider()

        return userProvider.getUserById(args.id)
    },
};
