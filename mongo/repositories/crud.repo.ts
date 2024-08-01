import { CreateOptions, FilterQuery, Model, ObjectId, UpdateQuery } from "mongoose";
import { APIFeatures } from "../../utils/api-feature";

export default class CrudRepository<T> {
    model: Model<T>
    constructor(model: Model<T>) {
        this.model = model
    }

    async findAll(query?: any, filter?: FilterQuery<any>) {
        const apiFeatures = new APIFeatures(this.model.find(filter!), query)
        .filter().paginate().sort().limitFields()
        return apiFeatures.query
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