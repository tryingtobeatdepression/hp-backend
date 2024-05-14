import { Document, FlatRecord, model } from "mongoose";
import AbstractSchema from "./abstract.schema";
import { NextFunction } from "express";

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

const userSchema = new UserSchema(true).schema
// Error-handling hooks // 

userSchema.post('save', (error: any, doc: FlatRecord<any> , next: any) => {
    if (error.name === 'MongoServerError' && error.code === 11000){
        next(new Error('There was a duplicate key error'))
        
    } else 
        next()
})

export type UserType = IUser & Document
// Create User model
export const UserModel = model<UserType>("User", userSchema)
