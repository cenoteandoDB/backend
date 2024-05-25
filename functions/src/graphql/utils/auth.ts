import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import { UsersProvider } from "../modules/users/providers/users.provider";
import { User } from "../generated-types/graphql";

const SALT_ROUNDS = 10
const SECRET = process.env.JWT_SECRET!;
const EXPIRATION_TIME = "15 minutes"

interface DecodedToken {
    _id: string
}

export async function encryptPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, SALT_ROUNDS);
}

export async function comparePassword(password: string, actualPassword: string): Promise<boolean> {
    return bcrypt.compareSync(password, actualPassword);
}


export function createToken(id: string): string {
    const payload = { id: id}

    const token = jwt.sign(payload, SECRET, {expiresIn: EXPIRATION_TIME})

    return token
}

export function decodeToken(token: string): string {
    const decodedToken = jwt.verify(token, SECRET) as DecodedToken

    return decodedToken._id
}

export function validateAuth(authorizationHeader: string): Promise<User>|null {
    const token = authorizationHeader.replace('Bearer ', '')

    const userId = decodeToken(token)

    try {
        return UsersProvider.getUserById(userId)
    } catch (error) {
        return null;
    }
}
