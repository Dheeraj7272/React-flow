"use client";
import LoginForm from "@/components/LoginForm";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { CheckoutProvider } from "@stripe/react-stripe-js/checkout";

import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
const stripe = loadStripe(process.env.STRIPE_PUBLIC_KEY as string);

export default function Page() {
  const [clientSecret, setClientSecret] = useState("");
  useEffect(() => {
    const getClientData = async () => {
      const clientSecret = await fetch(
        "http://localhost:8000/payments/create-intent",
        { method: "POST" }
      )
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          return json.client_secret;
        });
      setClientSecret(clientSecret);
    };
    getClientData();
  }, []);

  return (
    <div className="flex min-h-svh w-full items-center justify-center ">
      <div className="w-full max-w-sm">
        {clientSecret && (
          <Elements stripe={stripe} options={{ clientSecret }}>
            <LoginForm />
          </Elements>
        )}
      </div>
    </div>
  );
}
