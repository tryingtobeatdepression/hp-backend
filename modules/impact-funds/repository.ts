import CrudRepository from "../../mongo/repositories/crud.repo";
import ImpactFunds , {IImpactFunds} from "./model";


class ImpactFundsRepository extends CrudRepository<IImpactFunds> {
    constructor() {
        super(ImpactFunds);
    }
}

export const impactFundsRepository = new ImpactFundsRepository()
