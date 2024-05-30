import { EmailService } from "../../../email/EmailService";
import {
    EmailAddress,
    PaginationInput,
    SortField,
    UpdateUserInfoInput,
    User,
    UserRole,
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
     * @param {SortField} sort optional sort field. Default by name
     * @param {PaginationInput} pagination optional pagination parameter
     *
     * @return {Promise<User[]>} list of all users
     */
    async getUsers(
        sort: SortField|null|undefined = { field: "name", sortOrder: "ASC" },
        pagination: PaginationInput|null = { offset: 0, limit: 25 }
    ): Promise<User[]> {
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
     * @param {UpdateUserInfoInput} userInfo user input to be registered
     *
     * @return {Promise<User>} the new user
     */
    async register(userInfo: UpdateUserInfoInput): Promise<User> {
        const encryptedPassword = await encryptPassword(userInfo.password);

        const docRef = usersDB.doc();
        await docRef.set({
            id: docRef.id,
            role: "BASIC",
            name: userInfo.name,
            surname: userInfo.surname,
            phone: userInfo.phone,
            password: encryptedPassword,
            email: userInfo.email,
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
     * @return {Promise<string>} the jwt
     */
    async login(email: string, password: string): Promise<string> {
        const snapshot = await usersDB.where("email", "==", email).get();
        if (snapshot.docs.length == 0) {
            throw new Error(`User with email ${email} not found.`);
        }
        
        const user = snapshot.docs[0].data() as User

        if (!user.password || !comparePassword(password, user.password)) {
            throw new Error(`Password does not match.`);
        }

        //TODO generate jwt
        return "some-token";
    }

        /**
     * Register an user.
     *
     * @param {string} userId the user id to be updated
     * @param {UpdateUserInfoInput} userInfo user info to be updated
     *
     * @return {Promise<User>} the new user
     */
        async updateUserInfo(userId: string, userInfo: UpdateUserInfoInput): Promise<User> {
            await usersDB.doc(userId).update({
                name: userInfo.name,
                surname: userInfo.surname,
                phone: userInfo.phone,
                updatedAt: new Date().toISOString(),
            });

            const snapshot = await usersDB.doc(userId).get();
            return snapshot.data() as User;
        }

    /**
     * Invites an user.
     *
     * @param {EmailAddress} email the email of the invitee
     * @param {string} name the name of the invitee
     * @param {UserRole} role the role of the user to be invitee
     *
     * @return {Promise<Boolean>} boolean flag to acknowledge if invitation was sent
     */
    async inviteUser(email: EmailAddress, name: string, role: UserRole): Promise<boolean> {
        const emailService = new EmailService();
        emailService.sendInvitationEmail(email);
        return true;
    }

    /**
     * Verify code to register user.
     *
     * @param code the code to be validated
     * @returns valid/invalid status
     */
    async verifyCode(code: string): Promise<boolean> {
        return true;
    }
}
