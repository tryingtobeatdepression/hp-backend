import mongoose, { Schema, Document, Model, Types, ClientSession } from 'mongoose'

interface ItineraryItem { milestoneName: string, location: string }

interface IncludesObject { description: string, icon: string }

interface Rating { email: string, val: number }

export interface IExperience extends Document {
    // id: string
    title: string;
    description: string;
    status: string;
    capacity: number;
    cost: number;
    bookedSeats: number
    registrationStartDate: Date
    registrationEndDate: Date
    itinerary: Array<ItineraryItem>
    duration: string
    ratings: Array<Rating>,
    includes: Array<IncludesObject>
    media: Array<string>

    // virtuals
    rating: number

    hasSeats(this: IExperience): boolean
    book(this: IExperience, session?: ClientSession): Promise<void>
    rate(this: IExperience, rating: any): Promise<void>
}

const schema = new Schema<IExperience>(
    {
        title: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            default: 'available',
        },
        capacity: {
            type: Number,
        },
        cost: {
            type: Number,
        },
        bookedSeats: {
            type: Number,
            default: 0,
        },
        registrationStartDate: {
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
        ratings: [{
            email: String,
            val: {
                type: Number,
                min: 1,
                max: 5,
                required: true,
            }
        }],
        includes: [
            {
                description: String,
                icon: String,
            }
        ],
        media: [String],
    }, {
    timestamps: true,
    toObject: { virtuals: true, },
    toJSON: {
        virtuals: true,
        transform: function (document, ret) {
            delete ret.__v;
            delete ret._id;
            ret.itinerary.map((obj: any): ItineraryItem => {
                delete obj.id;
                delete obj._id;
                return obj
            })
            ret.ratings.map((obj: any): IncludesObject => {
                delete obj.id;
                delete obj._id;
                return obj
            })
            ret.includes.map((obj: any): IncludesObject => {
                delete obj.id;
                delete obj._id;
                return obj
            })
        }
    }
}
)

schema.method("hasSeats", function (this: IExperience) {
    return this.capacity > this.bookedSeats
})

schema.method("book", async function (this: IExperience, session?: ClientSession) {
    ++this.bookedSeats!
    await this.save({ session, })
})

schema.method("rate", async function (this: IExperience, rating: any) {
    const { email, val } = rating
    this.ratings.push({ email, val })
    await this.save()
})

schema.virtual("rating").get(function () {
    const len = this.ratings.length;
    return len > 0 ?
        this.ratings.reduce((acc, r) => acc + r.val, 0) / len :
        len
})

schema.pre('save', function (this: IExperience) {
    if (!this.hasSeats())
        this.status = "closed"
})

const Experience = mongoose.model<IExperience>('Experience', schema)

export default Experience