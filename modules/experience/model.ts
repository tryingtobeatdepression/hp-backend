import mongoose, { Schema, Document, Model, Types } from 'mongoose'

interface ItineraryItem { milestoneName: string, location: string }

interface IncludesObject { description: string, icon: string }

interface IRating extends Document {
    email: string
    val: number
}

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
    ratings: Types.DocumentArray<IRating>,
    includes: Array<IncludesObject>
    media: string[]

    // virtuals
    rating: number

    hasSeats(this: IExperience): boolean
    book(this: IExperience): Promise<void>
    getStatus(this: IExperience): string
    rate(this: IExperience, rating: any): Promise<void>
}


const ratingSchema = new Schema<IRating>(
    {
        email: String,
        val: {
            type: Number,
            min: 1,
            max: 5,
            required: true,
        }
    }
)

const schema = new Schema<IExperience>(
    {
        title: {
            type: String,
            required: true,
        },
        overview: {
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
        ratings: [ratingSchema],
        includes: [
            {
                description: String,
                icon: String,
            }
        ],
        media: [String]
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
    return this.capacity < this.bookedSeats
})

schema.method("getStatus", function (this: IExperience) {
    return this.hasSeats() ? 'available' : 'closed'
})

schema.method("book", async function (this: IExperience) {
    ++this.bookedSeats
    await this.save()
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

schema.pre('save', function (this: IExperience, next: any) {
    if (!this.hasSeats())
        this.status = "closed"
})

const Experience = mongoose.model<IExperience>('Experience', schema)

export default Experience