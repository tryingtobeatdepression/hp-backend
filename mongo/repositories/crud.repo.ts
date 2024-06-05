import { CreateOptions, FilterQuery, Model, ObjectId, UpdateQuery } from "mongoose";

export default class CrudRepository<T> {
    model: Model<T>
    constructor(model: Model<T>) {
        this.model = model
    }

    async findAll(filter?: FilterQuery<any>) {
        return this.model.find(filter!,)
    }

    async findOne(filter: FilterQuery<any>) {
        return this.model.findOne(filter,)
    }

    async findById(id: string) {
        return this.model.findOne({ _id: id, })
    }

    async create(payload: Object, options?: CreateOptions) {
        return this.model.create(payload, options)
    }

    async updateById(id: string, payload: Object) {
        return this.model.findByIdAndUpdate(id, payload, { new: true, runValidators: true })
    }

    async deleteById(id: string) {
        return this.model.findByIdAndDelete(id)
    }
}