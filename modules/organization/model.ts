import { Document, Schema, model } from "mongoose";
import { OrgTypes } from "./enums";
import { generateRefreshToken, generateAccessToken, isPasswordCorrect, preSaveUser } from "../../mongo/util/methods";

export interface IOrganziation extends Document {
    name: string
    email: string
    password: string
    overview: string
    role: string
    refreshToken: string
}

const orgSchema = new Schema<IOrganziation>({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: String,
    overview: String,
    role: {
        type: String,
        enum: OrgTypes,
        default: OrgTypes.OTHER,
    },
    refreshToken: String,
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            delete ret._id
            delete ret.__v
            delete ret.refreshToken
        }
    }
})


orgSchema.pre('save', preSaveUser)

orgSchema.methods.isPasswordCorrect = isPasswordCorrect
orgSchema.methods.generateAccessToken = generateAccessToken
orgSchema.methods.generateRefreshToken = generateRefreshToken

export const Organization = model<IOrganziation>('Organization', orgSchema)