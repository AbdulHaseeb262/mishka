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

// import stripe from "../../../lib/stripeClient";

// export async function POST(req) {
//   console.log("yes this stripe will run");
//   console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_KEY);
//   console.log("public key:", process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
//   try {
//     const { items, orderId , tobepaid } = await req.json();
//     console.log(tobepaid)
//     console.log(typeof(tobepaid))
//     const unitAmount = Math.round(tobepaid * 100);
//     const line_items = items.map((item) => ({
//       price_data: {
//         currency: "eur",
//         product_data: { name: item.name },
//

//       },
//       quantity: item.quantity,
//     }));

//     console.log("Line Items:", JSON.stringify(line_items, null, 2));

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items,
//       mode: "payment",
//       success_url: `${req.headers.get("origin")}/checkout-successful/${orderId}`, // Include orderId in success URL
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

// import stripe from "../../../lib/stripeClient";

// export async function POST(req) {
//   console.log("yes this stripe will run");
//   console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_KEY);
//   console.log("public key:", process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

//   try {
//     const { items, orderId, tobepaid } = await req.json();
//     console.log(items);
//     console.log("Total Amount to be Paid:", tobepaid);
//     console.log("Type of tobepaid:", typeof tobepaid);

//     const totalAmount = Math.round(tobepaid * 100); // Convert total amount to cents

//     const myitems = items.map((item) => ({
//       //
//       product_data: { name: item.name },
//             quantity: item.quantity,
//           }));

//     const line_items = [
//       {
//         price_data: {
//           currency: "eur",
//           product_data: { name: "Total Order Payment" }, // Generic name for full order
//           unit_amount: totalAmount, // Charge total cost here
//         },
//         quantity: 1, // Single charge for total order
//       },
//     ];

//     console.log("Line Items:", JSON.stringify(line_items, null, 2));

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items,

//       mode: "payment",
//       success_url: `${req.headers.get("origin")}/checkout-successful/${orderId}`, // Include orderId in success URL
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

import stripe from "../../../lib/stripeClient";

export async function POST(req) {
  console.log("yes this stripe will run");
  console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_KEY);
  console.log("public key:", process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

  try {
    const { items, orderId, tobepaid, shipping, twenty } = await req.json();
    console.log("shipping cost", shipping);
    console.log("cost MESD", twenty);

    console.log(items);
    console.log("Total Amount to be Paid:", tobepaid);
    console.log("Type of tobepaid:", typeof tobepaid);

    const totalAmount = Math.round(tobepaid * 100); // Convert to cents
    const totalshipping = Math.round(shipping * 100); // Convert to cents
    const twentypercent = Math.round(twenty * 100); // Convert to cents

    // Create line items for display (names & quantities only, no price)
    const line_items = items.map((item) => ({
      price_data: {
        currency: "eur",
        product_data: {
          name: item.name, // Display product name
        },
        unit_amount: Math.round(item.price * 100), // Dummy amount (Stripe requires a value, but it won't matter)
      },
      quantity: item.quantity,
      // Display quantity correctly
    }));

    // Add a single "Total Order Payment" item with the actual total amount
    line_items.push({
      price_data: {
        currency: "eur",
        product_data: {
          name: "Versandkosten", // Shows the final total
        },
        unit_amount: totalshipping, // Correct total charge
      },
      quantity: 1, // Charge as a single total order
    });
    line_items.push({
      price_data: {
        currency: "eur",
        product_data: {
          name: "20% MwSt", // Shows the final total
        },
        unit_amount: twentypercent, // Correct total charge
      },
      quantity: 1, // Charge as a single total order
    });

    console.log("Line Items:", JSON.stringify(line_items, null, 2));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${req.headers.get(
        "origin"
      )}/checkout-successful/${orderId}`,
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
