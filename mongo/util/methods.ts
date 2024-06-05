import { sign } from "jsonwebtoken";
import { compareToken, hashToken } from "../../utils/encryption";

export async function preSaveUser(this: any, next: any) {
    if (this.isNew || this.isModified("password"))
        this.password = await hashToken(this.password)
    next()
}

export async function isPasswordCorrect(this: any, password: string) {
    return await compareToken(password, this.password);
}

export function generateAccessToken(this: any, user?: any) {
    return sign(
        {
            id: this?._id ? this._id : user?.id!,
            email: this?.email ? this.email : user?.email!,
            role: this?.role ? this.role : user?.role!,
        },
        process.env.JWT_SECRET_KEY!,
        {
            expiresIn: process.env.JWT_EXPIRATION_TIME!,
        }
    );
}

export function generateRefreshToken(this: any, user?: any) {
    return sign(
        {
            id: this?._id ? this?._id : user?._id!,
        },
        process.env.REFRESH_TOKEN_SECRET!,
        {
            expiresIn: process.env.REFRESH_TK_EXPIRATION_TIME!,
        }
    );
};