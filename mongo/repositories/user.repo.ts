import { UserModel, IUser } from "../../modules/user/model";
import CrudRepository from "./crud.repo";

export class UserRepo extends CrudRepository<IUser> {
    constructor() {
        super(UserModel)
    }

    async findByEmail(email: string): Promise<any> {
        return await this.model.findOne({ email, })
    }

    async findByUsername(username: string): Promise<any> {
        return await this.model.findOne({ username, })
    }
}

export const userRepo = new UserRepo()