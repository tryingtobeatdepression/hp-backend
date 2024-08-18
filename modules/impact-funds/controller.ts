import { Request, Response } from "express";
import catchAsync from "../../utils/catch-async";
import { stripe } from "../../utils/stripe";
import { factory } from "../common/handler-factory"
import { impactFundsRepository } from "./repository";
import { projectRepository } from "../project/repository";
import { AppError } from "../common/errors";
import { userRepo } from "../../mongo/repositories/user.repo";

export const getStatistics = catchAsync(async (req: Request, res: Response, next: any) => {
    const economicImpact = await impactFundsRepository.getEconomicImpact()
    const peopleImpacted = await impactFundsRepository.getPeopleImpacted()
    const liveProjects = await impactFundsRepository.getLiveProjectsCount()
    const completedProjects = await impactFundsRepository.getCompletedProjectsCount()
    const educationals = await projectRepository.getEducationalsCount()

    return res.status(200).json({
        economicImpact, peopleImpacted, liveProjects,
        completedProjects, educationals,
    })
})

export const makeDonation = catchAsync(async (req: Request, res: Response, next: any) => {
    const { amount, user, token } = req.body
    const { id } = req.params;

    const u = await userRepo.findById(user)
    if (!u)
        return next(new AppError("User doesn't exist.", 400))

    const doc = await impactFundsRepository.findById(id)
    if(!doc)
        return next(new AppError("Fund doesn't exist.", 403))
    
    if(doc.hasExceeded(amount))
        return next(new AppError("Amount excceds total amount.", 400))

    const customer = await stripe.createCustomer(
        u.email, "Donor", token
    )
    const paymentIntent = await stripe.createPaymentIntent(
        amount, token, customer.id
    )

    if(paymentIntent.status !== 'succeeded')
        return next(new AppError("Payment failed.", 500))

    doc.addDonor({ user, donation: amount, })
    
    res.status(201).json({
        status: 'success',
    })
})

export const getAll = factory.getAll(impactFundsRepository)

export const getOne = factory.getOne(impactFundsRepository)

export const create = factory.create(impactFundsRepository)

export const update = factory.update(impactFundsRepository)

export const destroy = factory.destroy(impactFundsRepository)

