import CrudRepository from "../../mongo/repositories/crud.repo";
import { Artifact, IArtifact } from "./model";


class ArtifactRepo extends CrudRepository<IArtifact> {
    constructor() {
        super(Artifact)
    }
}

export const artifactRepo = new ArtifactRepo()