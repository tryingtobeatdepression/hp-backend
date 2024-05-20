import mongoose, { Schema, Document, Model, Types } from 'mongoose'

export interface IProject extends Document {
    id: string
    name: string;
    description: string;
    location: string
    startingPoint: string
}

const schema = new Schema<IProject>(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        location:{
            type: String,
        },
        startingPoint: {
            type: String,
        },
    },{
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: function(document, ret) {
                delete ret.__v;
                delete ret._id;
            },

        }
    }
)

const Project = mongoose.model<IProject>('Project', schema)

export default Project