import { Document, Types, model } from "mongoose";
import AbstractSchema from "../../mongo/models/abstract.schema";
import { IUser } from "../../mongo/models/user.schema";
import { IOrganizationExperience } from "../organization-experience/model";

export interface IUserExpBooking extends Document {
    user: IUser['_id']
    orgExperience: IOrganizationExperience['_id']
    bookingDate: Date,
}

export class UserExpBookingSchema extends AbstractSchema<IUserExpBooking> {
    constructor(timestamps: boolean) {
        super({
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

const userExpBookingSchema = new UserExpBookingSchema(true).schema
export const UserExpBooking = model("UserExpBooking", userExpBookingSchema)