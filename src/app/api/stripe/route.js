// import stripe from "../../../lib/stripeClient";

// export async function POST(req) {
//   console.log("yes this stripe will run")
//   console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_KEY);
//   console.log("public key:", process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
//   try {
//     const { items } = await req.json();
//     const line_items = items.map((item) => ({
//       price_data: {
//         currency: "eur",
//         product_data: { name: item.name },
//         unit_amount: Math.round(item.price * 100),
//       },
//       quantity: item.quantity,
//     }));
//     // console.log(line_items[0].currency)

//     console.log("Line Items:", JSON.stringify(line_items, null, 2));


//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items,
//       mode: "payment",
//       success_url: `${req.headers.get("origin")}/checkout/success`,
//       cancel_url: `${req.headers.get("origin")}/checkout/cancel`,
//     });
//     console.log("Stripe Checkout Session Created:", session.id);

//     return new Response(JSON.stringify({ url: session.url }), { status: 200 });
//   } catch (error) {
//     console.error("Stripe Error:", error);
//     return new Response(JSON.stringify({ error: error.message }), {
//       status: 500,
//     });
//   }
// }



//new route
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export async function POST(req) {

//     console.log("hn ye")
//   console.log("Received request to create PaymentIntent");

//   try {
//     // Parse the request body
//     const { amount } = await req.json();
//     console.log("Request Body:", { amount });

//     // Validate the amount
//     if (!amount || typeof amount !== "number" || amount <= 0) {
//       console.error("Invalid amount:", amount);
//       return new Response(
//         JSON.stringify({ error: "Invalid amount provided" }),
//         { status: 400 }
//       );
//     }

//     // Create a PaymentIntent
//     console.log("Creating PaymentIntent with amount:", amount);
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: Math.round(amount), // Ensure the amount is in cents
//       currency: "eur", // Use EUR for euros
//       automatic_payment_methods: {
//         enabled: true,
//       },
//     });

//     console.log("PaymentIntent created successfully:", paymentIntent.id);

//     // Return the client secret
//     return new Response(
//       JSON.stringify({ clientSecret: paymentIntent.client_secret }),
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error creating PaymentIntent:", error);

//     // Log the full error object for debugging
//     console.error("Full error details:", {
//       message: error.message,
//       stack: error.stack,
//       raw: error.raw,
//     });

//     return new Response(
//       JSON.stringify({
//         error: "An error occurred while creating the PaymentIntent",
//         details: error.message,
//       }),
//       { status: 500 }
//     );
//   }
// }


import stripe from "../../../lib/stripeClient";

export async function POST(req) {
  console.log("yes this stripe will run");
  console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_KEY);
  console.log("public key:", process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
  try {
    const { items, orderId } = await req.json();
    const line_items = items.map((item) => ({
      price_data: {
        currency: "eur",
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    console.log("Line Items:", JSON.stringify(line_items, null, 2));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${req.headers.get("origin")}/checkout-successful/${orderId}`, // Include orderId in success URL
      cancel_url: `${req.headers.get("origin")}/checkout/cancel`,
    });

    console.log("Stripe Checkout Session Created:", session.id);

    return new Response(JSON.stringify({ url: session.url }), { status: 200 });
  } catch (error) {
    console.error("Stripe Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}