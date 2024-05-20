import { UserModel, UserDocument } from "../models/user.schema";
import CrudRepository from "./crud.repo";

export class UserRepo extends CrudRepository<UserDocument> {
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

export const userRepo = new UserRepo()