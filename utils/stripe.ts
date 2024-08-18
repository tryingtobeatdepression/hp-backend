import Stripe from "stripe";
import { v4 } from "uuid";

class StripeService {
    #s = new Stripe('sk_test_4eC39HqLyjWDarjtT1zdp7dc')
    
    async createCardPaymentMethod(): Promise<any> {
        return await this.#s.paymentMethods.create({
            type: 'card',
            card: {
                number: '4242424242424242',
                exp_month: 12,
                exp_year: 2024,
                cvc: '123',
            },
        });
    }

    async createCustomer(email: string, description: string, token: any): Promise<any> {
        return await this.#s.customers.create(
            {
                email,
                description,
                source: token.id,
            },
            { idempotencyKey: v4(), }
        );
    }

    async createPaymentIntent(amount: number, token: any, cid: any) {
        return await this.#s.paymentIntents.create({
            amount,
            currency: 'usd',
            customer: cid, 
            payment_method: token, 
            confirm: true, 
            off_session: true, 
        })
    }

    getInstance() {
        return this.#s;
    }
}

export const stripe = new StripeService()