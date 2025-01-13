"use client";

import { useState, useEffect } from "react";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../CheckoutForm/CheckoutForm";
import CompletePage from "../CompletePage/CompletePage";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

export default function Page() {
  const [clientSecret, setClientSecret] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const isConfirmed = !!new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    )
    setConfirmed(isConfirmed);
    if (isConfirmed) {
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: [{ id: "xl-tshirt" }], amount: 50, destination: 'acct_1QgKLNPIoRanMZ05' }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));

    }
  });




  const handleTest = async () => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }], amount: 50, destination: 'acct_1QfeqOPGS9DAR4wx' }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }
  const options: StripeElementsOptions = {
    clientSecret,
  };

  return (
    <div className="App">
      <button onClick={handleTest}>test</button>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>

          {confirmed ? <CompletePage /> : <CheckoutForm />}
        </Elements>
      )}
    </div>
  );

}