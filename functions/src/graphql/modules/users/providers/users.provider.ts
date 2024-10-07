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
import { UserList } from "../../../generated-types/graphql";
import {
  comparePassword,
  createToken,
  encryptPassword,
} from "../../../utils/auth";
import { db } from "../../database/db";
import { firestore } from "firebase-admin";
import { VariableProvider } from "../../variables/providers/variable.provider";
import { CenotesProvider } from "../../cenotes/providers/cenotes.provider";

const usersDB = db.users;
const registrationCodeDB = db.registration_code;

interface InvitationCode {
  email: string;
  name: string;
  role: string;
  createdAt: string;
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
   * @return {Promise<UserList>} list of all users and the total count
   */
  async getUsers(
    sort: SortField | null | undefined = { field: "name", sortOrder: "ASC" },
    pagination: PaginationInput | null = { offset: 0, limit: 25 },
    name: string | null | undefined,
  ): Promise<UserList> {
    let query: any;
    let countQuery: any;
    if (name) {
      const endSearch = name.replace(/.$/, (c) =>
        String.fromCharCode(c.charCodeAt(0) + 1),
      );
      query = usersDB
        .where("name", ">=", name)
        .where("name", "<", endSearch)
        .orderBy(
          sort?.field ?? "name",
          sort?.sortOrder.toLowerCase() as firestore.OrderByDirection,
        );
      countQuery = usersDB
        .where("name", ">=", name)
        .where("name", "<", endSearch);
    } else {
      query = usersDB.orderBy(
        sort?.field ?? "name",
        sort?.sortOrder.toLowerCase() as firestore.OrderByDirection,
      );
      countQuery = usersDB;
    }

    if (pagination) {
      query = query.offset(pagination.offset).limit(pagination.limit);
    }

    const [usersSnapshot, totalCountSnapshot] = await Promise.all([
      query.get(),
      countQuery.get(),
    ]);

    const users = usersSnapshot.docs.map((doc: any) => doc.data() as User);
    const totalCount = totalCountSnapshot.size;

    return { users, totalCount };
  }

  /**
   * Get a user by its user ID.
   *
   * @param {string} id - The identifier of the user to fetch.
   *
   * @return {Promise<UsersModule.User>}
   */
  async getUserById(id: string): Promise<User> {
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
    const endSearch = name.replace(/.$/, (c) =>
      String.fromCharCode(c.charCodeAt(0) + 1),
    );

    const query = usersDB.where("name", ">=", name).where("name", "<", endSearch);

    const usersSnapshot = await query.get();
    return usersSnapshot.docs.map((doc) => doc.data() as User);
  }

  /**
   * Register an user.
   *
   * @param {RegisterUserInput} userInfo user input to be registered
   * @param {UserProfile} profile the user profile type
   * @param {UserProfileInput} profileData the user profile data
   *
   * @return {Promise<User>} the new user
   */
  async register(
    userInfo: RegisterUserInput,
    profile: UserProfile,
    profileData: UserProfileInput,
  ): Promise<User> {
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
      profileData: profileData,
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

    const user = snapshot.docs[0].data() as User;

    const correctPassword = await comparePassword(password, user.password);
    if (!correctPassword) {
      throw new Error("Password does not match.");
    }

    return createToken(user.id);
  }

  /**
   * Update user information.
   *
   * @param {string} userId the user id to be updated
   * @param {UpdateUserInfoInput} userInfo user info to be updated
   *
   * @return {Promise<User>} the new user
   */
  async updateUserInfo(
    userId: string,
    userInfo: UpdateUserInfoInput,
  ): Promise<User> {
    await this.userExists(userId);

    // Prepare update data object
    const updateData: { [key: string]: any } = {
      name: userInfo.name,
      surname: userInfo.surname,
      email: userInfo.email,
      updatedAt: new Date().toISOString(),
    };
    if (userInfo.password) {
      const encryptedPassword = await encryptPassword(userInfo.password);
      updateData.password = encryptedPassword;
    }
    if (userInfo.phone !== undefined) {
      updateData.phone = userInfo.phone;
    }
    if (userInfo.role !== undefined) {
      updateData.role = userInfo.role;
    }

    // Remove undefined fields from updateData
    Object.keys(updateData).forEach((key) => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });

    const updatedUser = await usersDB.doc(userId).get();
    await usersDB.doc(userId).update(updateData);

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
  async updateCenotePermissions(
    userId: string,
    cenotePermissions: UpdateCenotePermissions,
  ): Promise<User> {
    await this.userExists(userId);

    const cenotes = [
      ...cenotePermissions.cenoteViewBlackList,
      ...cenotePermissions.cenoteViewBlackList,
      ...cenotePermissions.cenoteEditBlackList,
      ...cenotePermissions.cenoteEditWhiteList,
    ];
    const cenoteProvider = new CenotesProvider();
    cenotes.map((cenote) => cenoteProvider.cenoteExists(cenote));

    await usersDB.doc(userId).update({
      ...cenotePermissions,
      updatedAt: new Date().toISOString(),
    });

    const updatedUser = await usersDB.doc(userId).get();
    return updatedUser.data() as User;
  }

  /**
   * Updates user variables view and edit permissions.
   *
   * @param {string} userId the user id to be updated
   * @param {UpdateVariablePermissions} variablePermissions the updated user permissions to view
   * and edit variables
   *
   * @return {Promise<User>} the updated user
   */
  async updateVariablePermissions(
    userId: string,
    variablePermissions: UpdateVariablePermissions,
  ): Promise<User> {
    await this.userExists(userId);

    const variables = [
      ...variablePermissions.variableEditBlackList,
      ...variablePermissions.variableEditWhiteList,
      ...variablePermissions.variableViewBlackList,
      ...variablePermissions.variableViewWhiteList,
    ];
    const variableProvider = new VariableProvider();
    variables.map((variable) => variableProvider.variableExists(variable));

    await usersDB.doc(userId).update({
      ...variablePermissions,
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
  async inviteUser(
    email: EmailAddress,
    name: string,
    role: UserRole,
  ): Promise<boolean> {
    const emailService = new EmailService();

    const code = await this.generateCode(email, name, role);

    emailService.sendInvitationEmail(email, name, code);
    return true;
  }

  /**
   * Method to generate code for registration.
   *
   * @param {EmailAddress} email the email of the user to be invited
   * @param {string} name the name of the user
   * @param {UserRole} role the role of the user
   * @return {Promise<string>} the generated code
   */
  private async generateCode(
    email: EmailAddress,
    name: string,
    role: UserRole,
  ): Promise<string> {
    const docRef = registrationCodeDB.doc();
    await docRef.set({
      email: email,
      name: name,
      role: role,
      createdAt: new Date().toISOString(),
    });

    return docRef.id;
  }

  /**
   * Verify code to register user. If valid, creates an user with the predefined data and deletes
   * the invitation code from the database.
   *
   * @param {string} code the code to be validated
   * @return {Promise<User>} the registered user
   */
  async verifyCode(code: string): Promise<User> {
    const snapshot = await registrationCodeDB.doc(code).get();

    if (!snapshot.exists) {
      throw new Error("Invalid registration code.");
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

    await registrationCodeDB.doc(code).delete();

    const userSnapshot = await usersDB.doc(docRef.id).get();
    return userSnapshot.data() as User;
  }

  /**
   * Delete a user by id.
   *
   * @param {ID} userId of the user to delete
   *
   * @return {Promise<Boolean>} true if deleted
   */
  async deleteUser(userId: ID): Promise<boolean> {
    await this.userExists(userId);

    await usersDB.doc(userId).delete();
    return true;
  }

  /**
   * Get the user profile data.
   *
   * @param {ID} id the user id
   * @return {Promise<ProfileData>} the user profile data
   */
  async getUserProfileData(id: ID): Promise<ProfileData> {
    const snapshot = await usersDB.doc(id).get();

    if (!snapshot.exists) {
      throw new Error(`User ${id} not found.`);
    }

    const user = snapshot.data() as User;

    if (!user || !user.profileData) {
      throw new Error(`Profile data for user ${id} not found.`);
    }
    return user.profileData;
  }

  /**
   * Adds a cenote to the list of favourite cenotes of a user.
   *
   * @param {string} userId the identifier of the user to fetch favourite cenotes.
   * @param {string} cenoteId the cenote id to add to the favourite list.
   *
   * @return {Promise<boolean>} the list of favouriteCenotes
   */
  async addFavouriteCenote(userId: string, cenoteId: string): Promise<boolean> {
    const user = await this.getUserById(userId);
    // TODO should validate that cenote exists

    const userFavouriteCenotes = user.favouriteCenotesIds;
    if (userFavouriteCenotes.includes(cenoteId)) {
      return true;
    } else {
      userFavouriteCenotes.push(cenoteId);
      await usersDB.doc(userId).update({
        favouriteCenotesIds: userFavouriteCenotes,
        updatedAt: new Date().toISOString(),
      });
    }

    return true;
  }

  /**
   * Removes a cenote from the list of favourite cenotes of a user.
   *
   * @param {string} userId the identifier of the user to remove the cenote.
   * @param {string} cenoteId the cenote id to remove from the favourite list.
   *
   * @return {Promise<boolean>} flag to indicate if operation was valid
   */
  async removeFavouriteCenote(userId: string, cenoteId: string): Promise<boolean> {
    const user = await this.getUserById(userId);

    const userFavouriteCenotes = user.favouriteCenotesIds;
    const index = userFavouriteCenotes.indexOf(cenoteId);

    if (index !== -1) {
      userFavouriteCenotes.splice(index, 1);
      await usersDB.doc(userId).update({
        favouriteCenotesIds: userFavouriteCenotes,
        updatedAt: new Date().toISOString(),
      });
    }

    return true;
  }

  /**
   * Verify if a user exists by id.
   *
   * @param {ID} id of the user to verify
   *
   * @return {Promise<Boolean>} true if exists. Throws exception otherwise
   */
  async userExists(id: ID): Promise<boolean> {
    const snapshot = await usersDB.doc(id).get();

    if (!snapshot.exists) {
      throw new Error("User does not exist.");
    }

    return true;
  }
}
