import { Document, model } from "mongoose";
import AbstractSchema from "../../mongo/models/abstract.schema";
import { OrganizationTypes } from "./enums";
import { hashToken } from "../../utils/encryption";

export interface IOrganziation extends Document {
    name: string
    email: string
    password: string
    overview: string
    role: string
}

export class OrganizationSchema extends AbstractSchema {
    constructor(timestamps: boolean) {
        super({
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
                enum: OrganizationTypes,
                default: OrganizationTypes.OTHER,
            },
        }, {
            timestamps,
            toJSON: {
                virtuals: true,
                transform: (doc, ret) => {
                    delete ret._id
                    delete ret.__v
                }
            }
        })
    }
}

const orgSchema = new OrganizationSchema(true).schema

orgSchema.pre('save', async function (this: IOrganziation, next: any) {
    if (this.isNew)
        this.password = await hashToken(this.password)
    next()
})

export const Organization = model<IOrganziation>('Organization', orgSchema)