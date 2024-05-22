import CrudRepository from "../../mongo/repositories/crud.repo";
import { IUserExpBooking, UserExpBooking } from "./model";


class UserExpBookingRepo extends CrudRepository<IUserExpBooking> {
    constructor() {
        super(UserExpBooking)
    }
}

export const userExpBookingRepo = new UserExpBookingRepo()