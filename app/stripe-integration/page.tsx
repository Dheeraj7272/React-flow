"use client";
import {SignupForm} from "@/components/CreateCustomerForm";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { CheckoutProvider } from "@stripe/react-stripe-js/checkout";

import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);
console.log(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
export default function Page() {
  const [clientSecret, setClientSecret] = useState("");
  useEffect(() => {
    const getClientData = async () => {
      const clientSecret = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_ENDPINT + "/payments/create-intent",
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
        {/* {clientSecret && (
          <Elements stripe={stripe} options={{ clientSecret }}>
            <PaymentElement options={{ layout: "accordion" }} />
          </Elements>
        )} */}
        <SignupForm />
      </div>
    </div>
  );
}
