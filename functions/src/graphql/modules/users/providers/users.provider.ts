import {UsersModule} from "../generated-types/module-types";

/**
 * The UserProvider service is responsible for all user-related operations.
 */
export class UsersProvider {
    /**
     * Get a user by its user ID.
     * @param {string} id - The identifier of the user to fetch.
     * @return {Promise<UsersModule.User>}
     */
    async getUserById(id: string): Promise<UsersModule.User> {
        return new Promise((resolve, reject) => {
            return resolve(
                {
                id: id,
                name: "name",
                email: "user@example.com",
                password: "password",
                role: "ADMIN"
                }
            );
        });

    }
}
