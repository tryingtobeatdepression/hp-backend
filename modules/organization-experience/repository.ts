import CrudRepository from "../../mongo/repositories/crud.repo";
import OrganizationExperience,{IOrganizationExperience} from "./model";

class OrganziationExperienceRepository extends CrudRepository<IOrganizationExperience> {
    constructor() {
        super(OrganizationExperience)
    }
}

export const organizationExperienceRepository = new OrganziationExperienceRepository()