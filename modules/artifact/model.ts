import { Document, Types, model } from "mongoose";
import AbstractSchema from "../../mongo/models/abstract.schema";
import { IOrganziation } from "../organization/model";

interface Dimension { height: number, width: number, unit: string }

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

export class ArtifactSchema extends AbstractSchema<IArtifact> {
    constructor(timestamps: boolean) {
        super({
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

const artifactSchema = new ArtifactSchema(true).schema

export const Artifact = model<IArtifact>("Artifact", artifactSchema)