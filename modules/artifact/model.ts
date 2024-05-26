import { Document, Schema, Types, model } from "mongoose";
import { IOrganziation } from "../organization/model";

export interface Dimension { height: number, width: number, unit: string }

export interface IArtifact extends Document {
    organization: IOrganziation['_id'],
    name: string
    description: string
    media: string[]
    discoveryLocation: string
    age: string
    material: string
    dimensions: Array<Dimension>
    indexCode: string
    currentLocation: string
}

const schema = new Schema({
    organization: {
        type: Types.ObjectId,
        ref: "Organization"
    },
    name: String,
    description: String,
    media: Array<String>,
    discoveryLocation: String,
    age: String,
    material: String,
    dimensions: {
        height: Number,
        width: Number,
        unit: String
    },
    indexCode: String,
    currentLocation: String,
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
 
export const Artifact = model<IArtifact>("Artifact", schema)