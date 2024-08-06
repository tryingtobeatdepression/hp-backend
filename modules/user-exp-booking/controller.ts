import { Request, Response } from "express";
import catchAsync from "../../utils/catch-async";
import { factory } from "../common/handler-factory";
import { userExpBookingRepo } from "./repository";
import { stripe } from "../../utils/stripe";
import { userRepo } from "../../mongo/repositories/user.repo";
import { AppError } from "../common/errors";
import { experienceRepository } from "../experience/repository";

export const create = catchAsync(async (req: Request, res: Response, next: any) => {
    const { user, experience } = req.body;
    if (! await userRepo.findById(user))
        return next(new AppError("User doesn't exist.", 400))

    const e = await experienceRepository.findById
        (experience)
    if (!e)
        return next(new AppError("Org experience doesn't exist.", 400))

    const paymentMethod = await stripe.createCardPaymentMethod()
    const customer = await stripe.createCustomer("User-Booking")
    const paymentIntent = await stripe.createPaymentIntent(
        e.cost, paymentMethod.id, customer.id
    )

    if(paymentIntent.status !== 'succeeded') 
        return next(new AppError("Payment failed", 500))
    
    await userExpBookingRepo.create({ user, experience })

    return res.status(201).json({
        status: 'success',
    })
})

export const list = factory.getAll(userExpBookingRepo)

export const update = factory.update(userExpBookingRepo)

export const destroy = factory.destroy(userExpBookingRepo)

export const findOne = factory.getOne(userExpBookingRepo)