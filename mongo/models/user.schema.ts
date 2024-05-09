import { Document, model } from "mongoose";
import AbstractSchema from "./abstract.schema";

export interface IUser {
    username: string
    name: string
    email: string
    password: string
    role: number
}

export enum UserRoles {
    'admin', 'visitor'
}

export class UserSchema extends AbstractSchema {
    constructor(timestamps: boolean) {
        super({ 
            username: {
                type: String,
                required: [true, '"username" is required.'],
            },
            name: {
                type: String,
                required: [true, '"name" is required.'],
            },
            email: {
                type: String,
                // match: 
                required: [true, '"email" is required.']
            }, 
            password: {
                type: String,
                required: [true, '"password" is required.']
            },
            role: {
                type: Number,
                enum: UserRoles,
                default: UserRoles['visitor'],
                required: [true, '"role" is required.']
            }
        }, timestamps,)
    }
}

export type UserType = IUser & Document
// Create User model
export const UserModel = model<UserType>("User", new UserSchema(true).schema)
