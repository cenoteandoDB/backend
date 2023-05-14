import {UsersModule} from "../generated-types/module-types";

export const MutationResolver: UsersModule.Resolvers["Mutation"] = {
    updateEmail: (parent, args, contextValue, info) => {
        return {
            id: args.id,
            name: "name",
            email: args.email,
            password: "password",
            role: "ADMIN"
        };
    },
};
