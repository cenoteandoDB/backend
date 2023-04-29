import {UsersModule} from "../generated-types/module-types";

export const UserResolver: UsersModule.Resolvers["User"] = {
    id: () => "userid_000",
    email: () => "user@example.com",
};
