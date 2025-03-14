"use client";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useRouter } from "next/navigation";

const PaymentForm = ({ totalAmount , cartItems , FormData, }) => {
    console.log(totalAmount)
      const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Create a PaymentIntent on the server
      const response = await fetch("/api/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalAmount * 100 }), // Convert to cents
      });

      console.log(response , "my stripe")

      const { clientSecret } = await response.json();

      // Confirm the payment on the client side
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        });

      if (stripeError) {
        setError(stripeError.message);
        setLoading(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        // Payment succeeded
        // alert("Payment successful!");
        router.push("/order-confirmation");
        // Redirect or show a success message
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      {error && <div className="text-red-500">{error}</div>}
      {/* <button
        type="submit"
        disabled={!stripe || loading}
        className="bg-[#D3183D] text-white px-6 py-2 rounded-full font-semibold hover:bg-red-700 transition disabled:opacity-50"
      onClick={handleSubmit}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button> */}
    </form>
  );
};

export default PaymentForm;