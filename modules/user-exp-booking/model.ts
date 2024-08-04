import { Document, Schema, Types, model } from "mongoose";
import { IUser } from "../user/model";
import { IOrganizationExperience } from "../organization-experience/model";

export interface IUserExpBooking extends Document {
    user: IUser['_id']
    orgExperience: IOrganizationExperience['_id']
    bookingDate: Date,
}

const schema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: "User"
    },
    orgExperience: {
        type: Types.ObjectId,
        ref: "OrganizationExperience"
    },
    bookingDate: {
        type: Date,
        default: Date.now()
    }   
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
   
export const UserExpBooking = model<IUserExpBooking>("UserExpBooking", schema)