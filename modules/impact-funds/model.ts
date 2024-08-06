import mongoose, { Schema, Document, Types } from 'mongoose'
import { IProject } from "../project/model";
import { DonationType } from "./enums";

interface DonorObject {
    id?: string
    donation: number
    type?: DonationType
    date?: Date
}
export interface IImpactFunds extends Document {
    id: string
    project: IProject['_id'];
    totalAmount: number;
    allocatedAmount: number
    donors: Array<DonorObject>
    status: string
    
    addDonor(this: IImpactFunds, donor: DonorObject): Promise<void>
    hasExceeded(this: IImpactFunds, donation: number): boolean
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
            default: 0,
        },
        status: {
            type: String,
            enum: ['pending', 'completed'],
            default: "pending",
        },
        donors: [
            {
                donation: Number,
                type: {
                    type: String,
                    enum: ['visitor', 'organization'],
                },
                date: {
                    type: Date,
                    default: Date.now()
                }
            }
        ]
    }, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: function (document, ret) {
            delete ret.__v;
            delete ret._id;

            ret.donors.map((obj: any): DonorObject => {
                delete obj._id;
                return obj
            })
        }
    }
})

schema.method('hasExceeded', function (this: IImpactFunds, donation: number): boolean {
    return this.allocatedAmount + donation > this.totalAmount
}) 

schema.method("addDonor", async function (this: IImpactFunds, donor: DonorObject): Promise<void> {
    this.donors.push(donor);
    this.allocatedAmount += donor.donation;
    await this.save();
})

schema.pre('save', async function (this) {
    if (this.allocatedAmount == this.totalAmount) 
        this.status = "completed"
})

const ImpactFunds = mongoose.model<IImpactFunds>('ImpactFunds', schema)

export default ImpactFunds