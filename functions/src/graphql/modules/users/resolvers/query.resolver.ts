import {UsersModule} from "../generated-types/module-types";

export const QueryResolver: UsersModule.Resolvers["Query"] = {
    user: (parent, args, contextValue, info) => {
        return {
            id: args.id,
            email: "user@example.com",
        };
    },
};
