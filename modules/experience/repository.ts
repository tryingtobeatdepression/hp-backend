import CrudRepository from "../../mongo/repositories/crud.repo";
import Experience, {IExperience} from "./model";


class ExperienceRepository extends CrudRepository<IExperience> {
    constructor() {
        super(Experience);
    }
}

export const experienceRepository = new ExperienceRepository()
