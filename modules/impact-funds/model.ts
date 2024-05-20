import mongoose, { Schema, Document, Model, Types } from 'mongoose'
import {IProject} from "../project/model";
import {DonationType} from "./enums";

interface  DonorObject {
    id: string,
    donation: number
    type: DonationType
    date: Date
}
export interface IImpactFunds extends Document {
    id: string
    project: IProject['_id'];
    totalAmount: number;
    allocatedAmount: number
    donors: Array<DonorObject>
}

const schema = new Schema<IImpactFunds>(
    {
        project: {
            type: Types.ObjectId,
            ref: "Project",
        },
        totalAmount: {
            type: Number,
        },
        allocatedAmount: {
            type: Number,
        },
        donors: [
            {
                donation: Number,
                type: {
                    type: String,
                    enum: ['visitor','organization'],
                },
                date: {
                    type:Date,
                    default: Date.now()
                }
            }
        ]
    },{
        toJSON: {
            virtuals: true,
            transform: function(document, ret) {
                delete ret.__v;
                delete ret._id;

                ret.donors.map((obj:any): DonorObject => {
                    delete obj._id;
                    return obj
                })
            }
        }
    }
)

const ImpactFunds = mongoose.model<IImpactFunds>('ImpactFunds', schema)

export default ImpactFunds