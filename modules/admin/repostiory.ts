import CrudRepository from "../../mongo/repositories/crud.repo";
import { UserModel } from "../../mongo/models/user.schema";

export default class AdminRepo extends CrudRepository {
    constructor() {
        super(UserModel)
    }
}