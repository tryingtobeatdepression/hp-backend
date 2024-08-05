import Stripe from "stripe";
import { v4 } from "uuid";

class StripeService {
    #s = new Stripe('sk_test_Gx4mWEgHtCMr4DYMUIqfIrsz')

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

    async createCustomer(description: string): Promise<any> {
        return await this.#s.customers.create(
            { description },
            { idempotencyKey: v4(), }
        );
    }

    async createPaymentIntent(amount: number, pmid: any, cid: any) {
        return await this.#s.paymentIntents.create({
            amount,
            currency: 'usd',
            payment_method: pmid,
            customer: cid,
            // receipt_email: 'xxx@mail.com'
        })
    }

    getInstance() {
        return this.#s;
    }
}

export const stripe = new StripeService()