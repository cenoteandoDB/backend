import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UsersProvider } from "../modules/users/providers/users.provider";
import { User } from "../generated-types/graphql";

const SALT_ROUNDS = 10;
const SECRET = process.env.JWT_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
const EXPIRATION_TIME = "59 minutes";
const REFRESH_EXPIRATION_TIME = "59 minutes";

interface DecodedToken {
  userId: string;
}

/**
 * Encrypts a password.
 *
 * @param {string} password the original password
 * @return {Promise<string>} the encrypted password
 */
export async function encryptPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Compares two passwords.
 *
 * @param {string} password the original password
 * @param {string} actualPassword the encrypted password from database
 * @return {Promise<boolean>} true if they are the same. False otherwise
 */
export async function comparePassword(
  password: string,
  actualPassword: string,
): Promise<boolean> {
  return bcrypt.compareSync(password, actualPassword);
}

/**
 * Creates a JWT token for a user id.
 *
 * @param {string} userId the user id
 * @return {string} the JWT
 */
export function createToken(userId: string): { token: string, refreshToken: string } {
  const payload = { userId: userId };

  const token = jwt.sign(payload, SECRET, { expiresIn: EXPIRATION_TIME });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRATION_TIME });

  console.log(`Token: ${token}`)
  console.log(`Refresh Token: ${refreshToken}`)
  return { token, refreshToken };
}

/**
 * Refreshes the access token using a valid refresh token.
 *
 * @param {string} refreshToken the refresh token
 * @return {string | null} the new access token, or null if invalid
 */
export function refreshAccessToken(refreshToken: string): string {
  const decodedToken = jwt.verify(refreshToken, REFRESH_SECRET) as DecodedToken;
  const { userId } = decodedToken;

  const newAccessToken = jwt.sign({ userId }, SECRET, { expiresIn: EXPIRATION_TIME });

  return newAccessToken;
}

/**
 * Decodes a JWT token into a user id.
 *
 * @param {string} token the token to be decoded
 * @return {string} an entity with the user id
 */
export function decodeToken(token: string): string {
  const decodedToken = jwt.verify(token, SECRET) as DecodedToken;

  return decodedToken.userId;
}

/**
 * Validates that the token in the header corresponds to a valid user id.
 *
 * @param {string} authorizationHeader the header with the authorization token
 * @return {Promise<User>} the user
 */
export function validateAuth(authorizationHeader: string): Promise<User> | null {
  const token = authorizationHeader.replace("Bearer ", "");

  const userId = decodeToken(token);

  try {
    const usersProvider = new UsersProvider();
    return usersProvider.getUserById(userId);
  } catch (error) {
    return null;
  }
}

/**
 * Requires authenticated user to proceed request.
 *
 * @param {string} authorizationHeader the header with the authorization token
 * @return {Promise<User>} the user
 */
export function requireAuth(authorizationHeader: string): Promise<User> {
  const user = validateAuth(authorizationHeader);
  if (user == null) {
    throw Error("User not authenticated");
  }
  return user;
}
