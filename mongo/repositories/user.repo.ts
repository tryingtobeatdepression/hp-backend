import { UserModel, UserType } from "../models/user.schema";
import CrudRepository from "./crud.repo";

export default class UserRepo extends CrudRepository<UserType> {
    constructor() {
        super(UserModel)
    }

    /**
     * 
     * @param username 
     * @returns 
     */
    async findByUsername(username: string): Promise<any> {
        return await this.model.findOne({ username, })
    }
}