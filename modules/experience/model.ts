import mongoose, { Schema, Document, Model, Types } from 'mongoose'

interface ItineraryItem { milestoneName: string, location: string }

interface IncludesObject { description: string, icon: string }

export interface IExperience extends Document {
    id: string
    title: string;
    description: string;
    overview: string;
    status: string;
    capacity: number; 
    cost: number;
    bookedSeats: number
    registrationStartDate: Date
    registrationEndDate: Date
    itinerary: Array<ItineraryItem>
    duration: string
    rating: Number
    includes: Array<IncludesObject>
    media: string[]
}

const schema = new Schema<IExperience>(
    {
        title: {
            type: String,
            required: true,
        },
        overview:  {
            type: String,
        },
        status: {
            type: String,
        },
        capacity: {
            type: Number,
        },
        cost: Number,
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
        description: {
            type: String,
            required: true,
        },
        itinerary: [{
            milestoneName: String,
            location: String,
        }],
        duration: String,
        rating: {
            type: Number,
            min: 0,
            max: 5,
            default: 0,
        },
        includes: [
            {
                description: String,
                icon: String,
            }
        ],
        media: [String]
    },{
        timestamps:true,
        toJSON: {
            virtuals: true,
            transform: function(document, ret) {
                delete ret.__v;
                delete ret._id;
                ret.itinerary.map((obj:any): ItineraryItem => {
                    delete obj.id;
                    delete obj._id;
                    return obj
                })
                ret.includes.map((obj:any): IncludesObject => {
                    delete obj.id;
                    delete obj._id;
                    return obj
                })
            }
        }
    }
)

const Experience = mongoose.model<IExperience>('Experience', schema)

export default Experience