"use client";

import { useState, useEffect } from "react";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../CheckoutForm/CheckoutForm";
import CompletePage from "../CompletePage/CompletePage";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.

const StripeElement = ({
  clientSecret,
  setClientSecret,
}: {
  clientSecret: string;
  setClientSecret: (val: string) => void;
}) => {
  return <div className="App"></div>;
};

export default StripeElement;
