import mongoose, { Schema, Document, Types, Model } from 'mongoose'
import { IProject } from "../project/model";
import { DonationType } from "./enums";
import { IUser } from '../user/model';

interface DonorObject {
    id?: string
    user: IUser['_id']
    donation: number
    // type?: DonationType
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

interface ImpactFundsModel extends Model<IImpactFunds> {
    getEconomicImpact(): Promise<number>
    getPeopleImpacted(): Promise<number>
}

const schema = new Schema<IImpactFunds, ImpactFundsModel>(
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
            enum: ['live', 'completed'],
            default: "live",
        },
        donors: [
            {
                user: {
                    type: Types.ObjectId,
                    ref: "User",
                },
                donation: Number,
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

// TESTED ✅
schema.static("getEconomicImpact", async function () {
    const result = await this.aggregate([
        {
            $group: {
                _id: null,
                totalSum: { $sum: "$totalAmount" },
            }
        }
    ])
    return result.length > 0 ? result[0].totalSum : 0
})

// TESTED ✅
schema.static("getPeopleImpacted", async function () {
    const result = await this.aggregate([
        { $unwind: "$donors", },
        { $count: "totalDonors"}
    ])
    return result.length > 0 ? result[0].totalDonors : 0
})

schema.pre('save', async function (this) {
    if (this.allocatedAmount == this.totalAmount)
        this.status = "completed"
})

const ImpactFunds = mongoose.model<IImpactFunds, ImpactFundsModel>('ImpactFunds', schema)

export default ImpactFunds