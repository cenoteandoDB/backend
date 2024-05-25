import {
    EmailAddress,
    RegisterInput,
    User,
} from "../../../generated-types/graphql";
import { comparePassword, encryptPassword } from "../../../utils/auth";
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
    static async getUserById(id: string): Promise<UsersModule.User> {
        const snapshot = await usersDB.doc(id).get();

        if (!snapshot.exists) {
            throw new Error(`User ${id} not found.`);
        }

        return snapshot.data() as User;
    }

    /**
     * Get a user by email.
     *
     * @param {string} email - The email of the user to fetch.
     *
     * @return {Promise<UsersModule.User>}
     */
    async getUserByEmail(email: string): Promise<UsersModule.User> {
        const snapshot = await usersDB.where("email", "==", email).get();
        if (snapshot.docs.length == 0) {
            throw new Error(`User with email ${email} not found.`);
        }

        return snapshot.docs[0].data() as User;
    }

    /**
     * Register an user.
     *
     * @param {RegisterInput} input user input to be registered
     *
     * @return {Promise<User>} the new user
     */
    async register(input: RegisterInput): Promise<User> {
        const encryptedPassword = await encryptPassword(input.password);

        const docRef = usersDB.doc();
        await docRef.set({
            id: docRef.id,
            role: "BASIC",
            name: input.name,
            surname: input.surname,
            password: encryptedPassword,
            email: input.email,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });

        const snapshot = await usersDB.doc(docRef.id).get();
        return snapshot.data() as User;
    }

    /**
     * Login an user. Returns access token in case of success.
     *
     * @param {string} email the email of the user
     * @param {string} password the user password
     *
     * @return {Promise<User>} the new user
     */
    async login(email: string, password: string): Promise<User> {
        const snapshot = await usersDB.where("email", "==", email).get();
        if (snapshot.docs.length == 0) {
            throw new Error(`User with email ${email} not found.`);
        }
        
        const user = snapshot.docs[0].data() as User

        if (!user.password || !comparePassword(password, user.password)) {
            throw new Error(`Password does not match.`);
        }


        return user;
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
