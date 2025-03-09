import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {

    console.log("hn ye")
  console.log("Received request to create PaymentIntent");

  try {
    // Parse the request body
    const { amount } = await req.json();
    console.log("Request Body:", { amount });

    // Validate the amount
    if (!amount || typeof amount !== "number" || amount <= 0) {
      console.error("Invalid amount:", amount);
      return new Response(
        JSON.stringify({ error: "Invalid amount provided" }),
        { status: 400 }
      );
    }

    // Create a PaymentIntent
    console.log("Creating PaymentIntent with amount:", amount);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // Ensure the amount is in cents
      currency: "eur", // Use EUR for euros
      automatic_payment_methods: {
        enabled: true,
      },
    });

    console.log("PaymentIntent created successfully:", paymentIntent.id);

    // Return the client secret
    return new Response(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating PaymentIntent:", error);

    // Log the full error object for debugging
    console.error("Full error details:", {
      message: error.message,
      stack: error.stack,
      raw: error.raw,
    });

    return new Response(
      JSON.stringify({
        error: "An error occurred while creating the PaymentIntent",
        details: error.message,
      }),
      { status: 500 }
    );
  }
}