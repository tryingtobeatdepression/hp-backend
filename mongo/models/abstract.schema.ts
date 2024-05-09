import { Schema, SchemaDefinition } from 'mongoose'

export default class AbstractSchema {
    schema: Schema
    constructor(definition: SchemaDefinition, timestamps: boolean) {
        this.schema = new Schema(definition, {
            timestamps: timestamps,
        })
    }
}

