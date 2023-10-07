import {
    EmailAddress,
    RegisterInput,
    User,
} from "../../../generated-types/graphql";
import {db} from "../../database/db";
import {UsersModule} from "../generated-types/module-types";

const usersDB = db.users;

/**
 * The UserProvider service is responsible for all user-related operations.
 */
export class UsersProvider {
    /**
     * Get all users.
     *
     * @return {Promise<User[]>} list of all users
     */
    async getUsers() {
        const users = await usersDB.get();
        return users.docs.map((doc) => doc.data() as User);
    }

    /**
     * Get a user by its user ID.
     *
     * @param {string} id - The identifier of the user to fetch.
     *
     * @return {Promise<UsersModule.User>}
     */
    async getUserById(id: string): Promise<UsersModule.User> {
        const snapshot = await usersDB.doc(id).get();
        return snapshot.data() as User;
    }

    /**
     * Register an user.
     *
     * @param {RegisterInput} input user input to be registered
     *
     * @return {Promise<User>} the new user
     */
    async register(input: RegisterInput): Promise<User> {
        // TODO encrypt password
        const docRef = usersDB.doc();
        await docRef.set({
            id: docRef.id,
            createdAt: new Date().toISOString(),
            role: "BASIC",
            ...input,
        });

        const snapshot = await usersDB.doc(docRef.id).get();
        return snapshot.data() as User;
    }

    /**
     * Update an user email.
     *
     * @param {string} id of the user to be updated
     * @param {EmailAddress} email new email
     *
     * @return {Promise<User>} the updated user
     */
    async updateEmail(id: string, email: EmailAddress): Promise<User> {
        await usersDB.doc(id).update({
            email,
            updatedAt: new Date().toISOString(),
        });

        const snapshot = await usersDB.doc(id).get();
        return snapshot.data() as User;
    }
}
