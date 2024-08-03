import mongoose, {Document, Schema, Types} from "mongoose";
import {IOrganziation} from "../organization/model";
import {IExperience} from "../experience/model";
import {OfferType, Status} from "./enums";

interface IOffer {
    description: string
    offerType: OfferType,
    offerValue: number
}

export interface IOrganizationExperience  extends Document{
    id: string
    host: IOrganziation['_id']
    experience: IExperience['_id']
    pricePerIndividual: number
    seats: number
    bookedSeats: Number
    registrationStartDate: Date | null
    registrationEndDate: Date | null
    status: Status
    offers:Array<IOffer>
}

const schema = new Schema<IOrganizationExperience>({
    host: {
        type: Types.ObjectId,
        ref: 'Organziation'
    },
    experience: {
        type: Types.ObjectId,
        ref: 'Experience'
    },
    pricePerIndividual:{
        type: Number
    },
    seats: {
        type: Number
    },
    bookedSeats: {
        type: Number,
        default: 0,
    },
    registrationStartDate:{
        type: Date,
        default: null
    },
    registrationEndDate: {
        type: Date,
        default: null
    },
    status: {
        type: String,
        enum: ['available','sold-out','closed','suggested']
    },
    offers: [
        {
            description: String,
            offerType: {
                type: String,
                enum: ["seats", "discount"]
            },
            offerValue: {
                type: Number,
                min: 0,
                max: 1
            }
        }
    ]
},{
        timestamps:true,
        toJSON: {
            virtuals: true,
            transform: function(document, ret) {
                delete ret.__v;
                delete ret._id;
            }
        }
    }
    )



export default mongoose.model<IOrganizationExperience>('OrganizationExperience', schema)
