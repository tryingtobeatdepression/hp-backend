import { Schema, SchemaDefinition, SchemaOptions } from 'mongoose'

export default class AbstractSchema {
    schema: Schema
    constructor(definition: SchemaDefinition, options?: SchemaOptions) {
        this.schema = new Schema(definition, options!)
    }
}

