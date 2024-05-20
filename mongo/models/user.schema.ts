import { Document, FlatRecord, model, } from "mongoose";
import AbstractSchema from "./abstract.schema";
import { hashToken } from "../../utils/encryption";


export interface IUser {
    username: string
    name: string
    email: string
    password: string
    role: number
}

export const UserRoles = ['visitor', 'admin']

export class UserSchema extends AbstractSchema {
    constructor(timestamps: boolean) {
        super({
            username: {
                type: String,
                unique: [true, '"username" already exists.'],
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
                unique: [true, '"email" already exists.']
            },
            password: {
                type: String,
                required: [true, '"password" is required.'],

            },
            role: {
                type: Number,
                default: 1,
                required: [true, '"role" is required.']
            }
        }, timestamps,)
    }
}

const userSchema = new UserSchema(true).schema

// Handle "Document doesn't exist" error
userSchema.post('save', (error: any, doc: FlatRecord<any>, next: any) => {
    if (error.name === 'MongoServerError' && error.code === 11000) {
        next(new Error('There was a duplicate key error'))

    } else
        next()
})

// https://stackoverflow.com/questions/49473635/mongoose-pre-save-gives-me-red-lines
// Hash passwords pre saving document
userSchema.pre('save', async function (this: UserDocument, next: any) {
    if (this.isNew) {
        this.password = await hashToken(this.password)
    }
    next()
})

export type UserDocument = IUser & Document
// Create User model
export const UserModel = model<UserDocument>("User", userSchema)
