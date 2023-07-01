import { UsersModule } from "../generated-types/module-types";
import { UsersProvider } from "../providers/users.provider"

const usersProvider = new UsersProvider()

export const QueryResolver: UsersModule.Resolvers["Query"] = {
    users: () => usersProvider.getUsers(),
    userById: (parent, args, contextValue, info) => {
        return usersProvider.getUserById(args.id)
    },
};
