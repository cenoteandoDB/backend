import { ID } from "graphql-modules/shared/types";
import { EmailService } from "../../../email/EmailService";
import {
    EmailAddress,
    PaginationInput,
    SortField,
    UpdateUserInfoInput,
    User,
    UserRole,
} from "../../../generated-types/graphql";
import { comparePassword, createToken, encryptPassword } from "../../../utils/auth";
import {db} from "../../database/db";
import { firestore } from "firebase-admin";

const usersDB = db.users;
const registrationCodeDB = db.registration_code

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
        let query = usersDB.orderBy(sort?.field ?? "name", sort?.sortOrder.toLowerCase() as firestore.OrderByDirection);

        if (pagination) {
            query = query.offset(pagination.offset).limit(pagination.limit);
        }

        const users = await query.get();
        return users.docs.map((doc) => doc.data() as User);
    }

    /**
     * Get a user by its user ID.
     *
     * @param {string} id - The identifier of the user to fetch.
     *
     * @return {Promise<UsersModule.User>}
     */
    static async getUserById(id: string): Promise<User> {
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
     * @return {Promise<User>}
     */
    async getUserByEmail(email: string): Promise<User> {
        const snapshot = await usersDB.where("email", "==", email).get();
        if (snapshot.docs.length == 0) {
            throw new Error(`User with email ${email} not found.`);
        }

        return snapshot.docs[0].data() as User;
    }

    /**
     * Get all users which name starts with the search parameter.
     *
     * @param {string} name - The name of user to retrieve
     *
     * @return {Promise<User>}
     */
    async getUserByName(name: string): Promise<User[]> {
        const endSearch = name.replace(/.$/, c => String.fromCharCode(c.charCodeAt(0) + 1));
    
        let query = usersDB.where('name', '>=', name).where('name', '<', endSearch);
        
        const usersSnapshot = await query.get();
        return usersSnapshot.docs.map((doc) => doc.data() as User);
    }

    /**
     * Register an user.
     *
     * @param {UpdateUserInfoInput} userInfo user input to be registered
     *
     * @return {Promise<User>} the new user
     */
    async saveUser(userInfo: UpdateUserInfoInput): Promise<User> {
        const encryptedPassword = await encryptPassword(userInfo.password);

        const docRef = usersDB.doc();
        await docRef.set({
            id: docRef.id,
            role: userInfo.role,
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

        return createToken(user.id)
    }

    /**
     * Update user information.
     *
     * @param {string} userId the user id to be updated
     * @param {UpdateUserInfoInput} userInfo user info to be updated
     *
     * @return {Promise<User>} the new user
     */
    async updateUserInfo(userId: string, userInfo: UpdateUserInfoInput): Promise<User> {
        const snapshot = await usersDB.doc(userId).get();

        if (!snapshot.exists) {
            throw new Error(`User does not exist.`);
        }

        await usersDB.doc(userId).update({
            name: userInfo.name,
            surname: userInfo.surname,
            phone: userInfo.phone,
            updatedAt: new Date().toISOString(),
        });

        const updatedUser = await usersDB.doc(userId).get();
        return updatedUser.data() as User;
    }

    /**
     * Invites an user by sending an email with a registration code.
     *
     * @param {EmailAddress} email the email of the invitee
     * @param {string} name the name of the invitee
     * @param {UserRole} role the role of the user to be invitee
     *
     * @return {Promise<Boolean>} boolean flag to acknowledge if invitation was sent
     */
    async inviteUser(email: EmailAddress, name: string, role: UserRole): Promise<boolean> {
        const emailService = new EmailService();

        const code = await this.generateCode(email, name, role);

        emailService.sendInvitationEmail(email, name, code);
        return true;
    }

    private async generateCode(email: EmailAddress, name: string, role: UserRole): Promise<string> {
        const docRef = registrationCodeDB.doc();
        await docRef.set({
            email: email,
            name: name,
            role: role,
            createdAt: new Date().toISOString(),
        });

        return docRef.id
    }

    /**
     * Verify code to register user.
     *
     * @param code the code to be validated
     * @returns valid/invalid status
     */
    async verifyCode(code: string): Promise<boolean> {
        const snapshot = await registrationCodeDB.doc(code).get();

        if (!snapshot.exists) {
            throw new Error(`Invalid registration code.`);
        }

        return true;
    }

    /**
     * Delete a user by id.
     *
     * @param {ID} userId of the user to delete
     *
     * @return {Promise<Boolean>} true if deleted
     */
    async deleteUser(userId: ID): Promise<boolean> {
        const snapshot = await usersDB.doc(userId).get();

        if (!snapshot.exists) {
            throw new Error(`User does not exist.`);
        }

        await usersDB.doc(userId).delete();
        return true;
    }
}
