import { Document, Schema, Types, model } from "mongoose";
import { IUser } from "../user/model";
import { IExperience } from "../experience/model";

export interface IUserExpBooking extends Document {
    user: IUser['_id']
    experience: IExperience['_id']
    bookingDate: Date,
}

const schema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: "User"
    },
    experience: {
        type: Types.ObjectId,
        ref: "Experience"
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