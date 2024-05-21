import CrudRepository from "../../mongo/repositories/crud.repo";
import { UserRepo } from "../../mongo/repositories/user.repo";
import { IOrganziation, Organization } from "./model";

class OrganizationRepo extends CrudRepository<IOrganziation> {
    constructor() {
        super(Organization)
    }

    async findByEmail(email: string) {
        return this.model.findOne({ email, })
    }
}

export const organizationRepo = new OrganizationRepo()