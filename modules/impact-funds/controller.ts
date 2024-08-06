import { Request, Response } from "express";
import catchAsync from "../../utils/catch-async";
import { stripe } from "../../utils/stripe";
import { factory } from "../common/handler-factory"
import { impactFundsRepository } from "./repository";
import { AppError } from "../common/errors";

export const makeDonation = catchAsync(async (req: Request, res: Response, next: any) => {
    const { amount } = req.body
    const { id } = req.params;

    const doc = await impactFundsRepository.findById(id)
    if(!doc)
        return next(new AppError("Fund doesn't exist.", 403))
    
    if(!await doc.addDonor({ donation: amount, }))
        return next(new AppError("Amount excceds total amount.", 400))

    const paymentMethod = await stripe.createCardPaymentMethod()
    const customer = await stripe.createCustomer("Donor")
    const paymentIntent = await stripe.createPaymentIntent(
        amount, paymentMethod.id, customer.id
    )

    console.log(`payment sts: ${paymentIntent.status}`)
    if(paymentIntent.status !== 'succeeded')
        return next(new AppError("Payment failed.", 500))

    res.send('hi')
})

export const getAll = factory.getAll(impactFundsRepository)

export const getOne = factory.getOne(impactFundsRepository)

export const create = factory.create(impactFundsRepository)

export const update = factory.update(impactFundsRepository)

export const destroy = factory.destroy(impactFundsRepository)

