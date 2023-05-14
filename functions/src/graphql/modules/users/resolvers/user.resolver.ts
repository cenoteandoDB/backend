import {UsersModule} from "../generated-types/module-types";

export const UserResolver: UsersModule.Resolvers["User"] = {
    id: () => "userid_000",
    name: () => "name",
    email: () => "user@example.com",
    password: () => "password",
    role: () => "ADMIN"
};
