import { Request, Response } from "express";
import catchAsync from "../../utils/catch-async";
import { factory } from "../common/handler-factory";
import { userExpBookingRepo } from "./repository";
import { stripe } from "../../utils/stripe";
import { organizationExperienceRepository } from "../organization-experience/repository";
import { userRepo } from "../../mongo/repositories/user.repo";
import { AppError } from "../common/errors";

export const create = catchAsync(async (req: Request, res: Response, next: any) => {
    const { user, orgExperience } = req.body;
    if (! await userRepo.findById(user))
        return next(new AppError("User doesn't exist.", 400))

    const oe = await organizationExperienceRepository.findById
        (orgExperience)
    if (!oe)
        return next(new AppError("Org experience doesn't exist.", 400))

    const paymentMethod = await stripe.createCardPaymentMethod()
    const customer = await stripe.createCustomer("User-Booking")
    const paymentIntent = await stripe.createPaymentIntent(
        oe.pricePerIndividual, paymentMethod.id, customer.id
    )
    await userExpBookingRepo.create({ user, orgExperience })

    res.send({
        clientSecret: paymentIntent.client_secret,
    })
})

export const list = factory.getAll(userExpBookingRepo)

export const update = factory.update(userExpBookingRepo)

export const destroy = factory.destroy(userExpBookingRepo)

export const findOne = factory.getOne(userExpBookingRepo)