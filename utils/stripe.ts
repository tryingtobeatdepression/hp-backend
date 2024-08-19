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

    async createCustomer(email: string, description: string): Promise<any> {
        return await this.#s.customers.create(
            {
                email,
                description,
                // source: token.id,
            },
            { idempotencyKey: v4(), }
        );
    }

    async createPaymentIntent(amount: number, pmid: any, cid: any) {
        return await this.#s.paymentIntents.create({
            amount,
            currency: 'usd',
            payment_method: pmid,
            customer: cid,
            confirm: true,
            automatic_payment_methods: {
                enabled: true, 
                allow_redirects: 'never',
            } 
        })
    }

    getInstance() {
        return this.#s;
    }
}

export const stripe = new StripeService()