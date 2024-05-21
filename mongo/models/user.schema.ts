import { Document, FlatRecord, model, } from "mongoose";
import AbstractSchema from "./abstract.schema";
import { hashToken } from "../../utils/encryption";
import { UserRoles } from "../../modules/user/enums";


export interface IUser extends Document {
    username: string
    name: string
    email: string
    password: string
    role: string
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
                required: [true, '"email" is required.'],
                unique: [true, '"email" already exists.']
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

        }, {
            timestamps,
            toJSON: {
                virtuals: true,
                transform: function (doc, ret) {
                    delete ret._id
                    delete ret.__v
                    delete ret.password
                },
            }
        })
    }
}

const userSchema = new UserSchema(true).schema

// https://stackoverflow.com/questions/49473635/mongoose-pre-save-gives-me-red-lines
// Hash passwords pre saving document
userSchema.pre('save', async function (this: IUser, next: any) {
    if (this.isNew) 
        this.password = await hashToken(this.password)
    next()
})

// Create User model
export const UserModel = model<IUser>("User", userSchema)
