import { Document, Schema, model } from "mongoose";
import { OrgTypes } from "./enums";
import { preSaveUser } from "../../mongo/models/util/methods";

export interface IOrganziation extends Document {
    name: string
    email: string
    password: string
    overview: string
    role: string
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
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            delete ret._id
            delete ret.__v
        }
    }
})


orgSchema.pre('save', preSaveUser)

export const Organization = model<IOrganziation>('Organization', orgSchema)