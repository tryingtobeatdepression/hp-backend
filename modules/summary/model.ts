import { Document, model, Schema } from "mongoose";

interface ISummary extends Document {
    id: string
    header1: string
    header2: string
        
}

const schema = new Schema({
    header1: String,
    header2: String
}, {
    timestamps: true, 
    virtuals: {
        
    },
    toJSON: {
        virtuals: true, 
        transform: function(document, ret) {
            delete ret.__v;
            delete ret._id;
        },
    }  
})

const Summary = model<ISummary>("Summary", schema)

export default Summary