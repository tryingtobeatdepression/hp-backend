import CrudRepository from "../../mongo/repositories/crud.repo";
import Project , { IProject } from "./model";


class ProjectRepository extends CrudRepository<IProject> {
    constructor() {
        super(Project);
    }

    async getEducationalsCount() {
        return await Project.countDocuments({ isEducational: true, })
    }
}

export const projectRepository = new ProjectRepository()
