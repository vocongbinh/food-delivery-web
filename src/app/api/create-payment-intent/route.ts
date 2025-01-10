import { NextRequest, NextResponse } from "next/server";
// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: NextRequest) {
    try {
        const { amount, destination } = await request.json();
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "usd",
            // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
            automatic_payment_methods: {
                enabled: true,
            },
            transfer_data: {
                destination: destination,
            },
            application_fee_amount: 500,
        })
        return NextResponse.json({ clientSecret: paymentIntent.client_secret });

    }
    catch (e) {
        console.error(e);
        return NextResponse.json({ error: e, status: 500 })
    }


}
