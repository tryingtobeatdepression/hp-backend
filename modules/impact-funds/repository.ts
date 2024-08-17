import CrudRepository from "../../mongo/repositories/crud.repo";
import ImpactFunds , {IImpactFunds} from "./model";


class ImpactFundsRepository extends CrudRepository<IImpactFunds> {
    constructor() {
        super(ImpactFunds);
    }

    async getEconomicImpact() {
        return await ImpactFunds.getEconomicImpact()
    }

    async getPeopleImpacted() {
        return await ImpactFunds.getPeopleImpacted()
    }

    async getLiveProjectsCount() {
        return await ImpactFunds.countDocuments({ status: 'live', })
    }

    async getCompletedProjectsCount() {
        return await ImpactFunds.countDocuments({ status: 'completed', })
    }
}

export const impactFundsRepository = new ImpactFundsRepository()
