import { Document, Schema, model, } from "mongoose";
import { UserRoles } from "./enums";
import { generateRefreshToken, generateToken, isPasswordCorrect, preSaveUser } from "../../mongo/util/methods";

export interface IUser extends Document {
    username: string
    name: string
    email: string
    password: string
    role: string
    refreshToken: string
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        unique: true,
        required: [true, '"username" is required.'],
    },
    name: {
        type: String,
        required: [true, '"name" is required.'],
    },
    email: {
        type: String,
        // match: 
        required: [true, '"email" is required.'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, '"password" is required.'],

    },
    role: {
        type: String,
        enum: UserRoles,
        default: UserRoles['VISITOR'],
        required: [true, '"role" is required.']
    },
    refreshToken: String,
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: function (doc: any, ret: any) {
            delete ret._id
            delete ret.__v
            delete ret.password
            delete ret.refreshToken
        },
    }
})


userSchema.pre('save', preSaveUser)
userSchema.methods.isPasswordCorrect = isPasswordCorrect
userSchema.methods.generateToken = generateToken
userSchema.methods.generateRefreshToken = generateRefreshToken

// Create User model
export const UserModel = model<IUser>("User", userSchema)
