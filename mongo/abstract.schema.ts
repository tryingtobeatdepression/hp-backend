import { Schema } from 'mongoose'

export default class AbstractSchema {
    schema: Schema
    constructor(params: Object, timestamps: boolean) {
        this.schema = new Schema(params, {
            timestamps: timestamps,
        })
    }
}

