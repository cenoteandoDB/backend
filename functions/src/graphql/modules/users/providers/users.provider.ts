import { ID } from "graphql-modules/shared/types";
import { EmailService } from "../../../email/EmailService";
import {
    EmailAddress,
    PaginationInput,
    ProfileData,
    RegisterGovernInput,
    RegisterInvestigatorInput,
    RegisterStudentInput,
    RegisterTouristInput,
    RegisterUserInput,
    SortField,
    UpdateCenotePermissions,
    UpdateUserInfoInput,
    UpdateVariablePermissions,
    User,
    UserProfile,
    UserRole,
} from "../../../generated-types/graphql";
import { comparePassword, createToken, encryptPassword } from "../../../utils/auth";
import {db} from "../../database/db";
import { firestore } from "firebase-admin";

const usersDB = db.users;
const registrationCodeDB = db.registration_code

interface InvitationCode {
    email: string,
    name: string,
    role: string,
    createdAt: string,
}

type UserProfileInput = 
                | RegisterTouristInput        
                | RegisterGovernInput
                | RegisterInvestigatorInput
                | RegisterStudentInput;

/**
 * The UserProvider service is responsible for all user-related operations.
 */
export class UsersProvider {
    /**
     * Get all users.
     * 
     * @param {SortField} sort optional sort field. Default by name
     * @param {PaginationInput} pagination optional pagination parameter
     * @param {string} name  The name of user to retrieve
     * @return {Promise<User[]>} list of all users
     */
    async getUsers(
        sort: SortField|null|undefined = { field: "name", sortOrder: "ASC" },
        pagination: PaginationInput|null = { offset: 0, limit: 25 },
        name: string|null|undefined
    ): Promise<User[]> {
        let query: any;
        if(name) {
            const endSearch = name.replace(/.$/, c => String.fromCharCode(c.charCodeAt(0) + 1));
            query = usersDB.where('name', '>=', name).where('name', '<', endSearch).orderBy(sort?.field ?? "name", sort?.sortOrder.toLowerCase() as firestore.OrderByDirection);
        } else {
            query = usersDB.orderBy(sort?.field ?? "name", sort?.sortOrder.toLowerCase() as firestore.OrderByDirection);
        }
      
        if (pagination) {
            query = query.offset(pagination.offset).limit(pagination.limit);
        }
      
        const users = await query.get();
        return users.docs.map((doc: any) => doc.data() as User);
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
        
        const user = snapshot.data() as User;
        return user;
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
     * @param {RegisterUserInput} userInfo user input to be registered
     *
     * @return {Promise<User>} the new user
     */
    async register(userInfo: RegisterUserInput, profile: UserProfile, profileData: UserProfileInput): Promise<User> {
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
            profile: profile,
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
            email: userInfo.email,

            role: userInfo.role,

            updatedAt: new Date().toISOString(),
        });

        const updatedUser = await usersDB.doc(userId).get();
        return updatedUser.data() as User;
    }

    /**
     * Updates user cenote view and edit permissions.
     *
     * @param {string} userId the user id to be updated
     * @param {UpdateCenotePermissions} cenotePermissions the updated user permissions to view 
     * and edit cenotes
     *
     * @return {Promise<User>} the updated user
     */
    async updateCenotePermissions(userId: string, cenotePermissions: UpdateCenotePermissions)
    : Promise<User> {
        const snapshot = await usersDB.doc(userId).get();

        if (!snapshot.exists) {
            throw new Error(`User does not exist.`);
        }

        await usersDB.doc(userId).update({
            cenoteViewWhiteList: cenotePermissions.cenoteViewWhiteList,
            cenoteViewBlackList: cenotePermissions.cenoteViewBlackList,

            cenoteEditWhiteList: cenotePermissions.cenoteEditWhiteList,
            cenoteEditBlackList: cenotePermissions.cenoteEditBlackList,
            updatedAt: new Date().toISOString(),
        });

        const updatedUser = await usersDB.doc(userId).get();
        return updatedUser.data() as User;
    }

    /**
     * Updates user variables view and edit permissions.
     *
     * @param {string} userId the user id to be updated
     * @param {UpdateVariablePermissions} cenotePermissions the updated user permissions to view 
     * and edit variables
     *
     * @return {Promise<User>} the updated user
     */
    async updateVariablePermissions(userId: string, variablePermissions: UpdateVariablePermissions)
    : Promise<User> {
        const snapshot = await usersDB.doc(userId).get();

        if (!snapshot.exists) {
            throw new Error(`User does not exist.`);
        }

        await usersDB.doc(userId).update({
            variableViewWhiteList: variablePermissions.variableViewWhiteList,
            variableViewBlackList: variablePermissions.variableViewBlackList,

            variableEditWhiteList: variablePermissions.variableEditWhiteList,
            variableEditBlackList: variablePermissions.variableEditBlackList,
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
     * Verify code to register user. If valid, creates an user with the predefined data.
     *
     * @param code the code to be validated
     * @returns the registered user
     */
    async verifyCode(code: string): Promise<User> {
        const snapshot = await registrationCodeDB.doc(code).get();

        if (!snapshot.exists) {
            throw new Error(`Invalid registration code.`);
        }

        const codeDetails = snapshot.data() as InvitationCode;

        const docRef = usersDB.doc();
        await docRef.set({
            id: docRef.id,
            role: codeDetails.role,
            name: codeDetails.name,
            email: codeDetails.email,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });

        const user_napshot = await usersDB.doc(docRef.id).get();
        return user_napshot.data() as User;
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

    async getUserProfileData(id: ID): Promise<ProfileData> {
        const snapshot = await usersDB.doc(id).get();

        if (!snapshot.exists) {
            throw new Error(`User ${id} not found.`);
        }
        
        const user = snapshot.data() as User;
        return user.profileData;
    }
}
