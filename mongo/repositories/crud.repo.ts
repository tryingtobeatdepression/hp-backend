import { ClientSession, CreateOptions, FilterQuery, Model, ObjectId, UpdateQuery } from "mongoose";
import { APIFeatures } from "../../utils/api-feature";

export default class CrudRepository<T> {
    model: Model<T>
    constructor(model: Model<T>) {
        this.model = model
    }

    async findAll(query?: any) {
        const apiFeatures = new APIFeatures(this.model.find(), query, this.model.schema)
            .populate().filter().paginate().sort().limitFields()
        return apiFeatures.query
    }

    async findById(id: string,) {
        return this.model.findOne({ _id: id, })
    }

    async create(payload: object, options?: CreateOptions) {
        return await this.model.create(payload, options!)
    }

    async updateById(id: string, payload: UpdateQuery<T>) {
        return this.model.findByIdAndUpdate(id, payload, { new: true, runValidators: true })
    }

    async deleteById(id: string) {
        return this.model.findByIdAndDelete(id)
    }
}