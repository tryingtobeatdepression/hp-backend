import { sign } from "jsonwebtoken";
import { compareToken, hashToken } from "../../utils/encryption";

export async function preSaveUser(this: any, next: any) {
    if(this.isNew || this.isModified("password"))
        this.password = await hashToken(this.password)
    next()
}

export async function isPasswordCorrect(this: any, password: string) {
    return await compareToken(password, this.password);
}

export function generateToken (this: any) {
    return sign(
        {
            id: this._id,
            email: this.email,
            role: this.role,
        },
        process.env.JWT_SECRET_KEY!,
        {
            expiresIn: process.env.JWT_EXPIRATION_TIME!,
        }
    );
}

export function generateRefreshToken(this: any) {
    return sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET!,
        {
            expiresIn: process.env.REFRESH_TK_EXPIRATION_TIME!,
        }
    );
};