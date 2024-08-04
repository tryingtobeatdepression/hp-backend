import Stripe from "stripe";

class StripeService {
    #s = new Stripe('sk_test_Gx4mWEgHtCMr4DYMUIqfIrsz')

    getInstance() {
        return this.#s;
    }
}

export const stripe = new StripeService().getInstance()