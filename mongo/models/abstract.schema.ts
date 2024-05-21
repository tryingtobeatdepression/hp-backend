import { Schema, SchemaDefinition, SchemaOptions } from 'mongoose'

export default class AbstractSchema<T> {
    schema: Schema<T>
    constructor(definition: SchemaDefinition<T>, options?: SchemaOptions) {
        this.schema = new Schema(definition, options!)
    }
}

