import { FilterQuery, Model, ObjectId } from "mongoose";

export default class CrudRepository {
    model: Model<any>
    constructor(model: Model<any>) {
        this.model = model
    }

    async find(filter: FilterQuery<any>) {
        return this.model.find(filter,)
    }

    async findOne(filter: FilterQuery<any>) {
        return this.model.findOne(filter,)
    }

    async findById(id: ObjectId) {
        return this.model.findOne({ _id: id, })
    }
}