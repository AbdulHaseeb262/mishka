// /app/api/orders/tracker/route.js
import connectToDatabase from "../../../../lib/mongodb";
import Order from "../../../../models/order";

// export async function GET(req) {
//   try {
//     await connectToDatabase();
//     const { searchParams } = new URL(req.url);
//     const orderId = searchParams.get("orderId");
//     const customerEmail = searchParams.get("email"); // optional, for verification

//     if (!orderId) {
//       return new Response(JSON.stringify({ error: "Order ID is required" }), {
//         status: 400,
//       });
//     }

//     // Find the order by ID. Optionally, filter by email.
//     const query = customerEmail
//       ? { _id: orderId, customerEmail }
//       : { _id: orderId };
//     const order = await Order.findOne(query);

//     if (!order) {
//       return new Response(JSON.stringify({ error: "Order not found" }), {
//         status: 404,
//       });
//     }

//     return new Response(JSON.stringify(order), { status: 200 });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: error.message }), {
//       status: 500,
//     });
//   }
// }


// /app/api/orders/tracker/route.js


export async function PUT(req) {
  console.log("yes i will cancel");
  try {
    await connectToDatabase();

    // Extract data from the request body
    const { orderId, email } = await req.json();

    if (!orderId) {
      return new Response(JSON.stringify({ error: "Order ID is required" }), {
        status: 400,
      });
    }

    // Find the order by ID. Optionally, filter by email.
    const query = email
      ? { _id: orderId, customerEmail: email }
      : { _id: orderId };
    const order = await Order.findOne(query);

    if (!order) {
      return new Response(JSON.stringify({ error: "Order not found" }), {
        status: 404,
      });
    }

    // Update the order status to "cancelled"
    order.status = "cancelled";
    await order.save();

    return new Response(
      JSON.stringify({ message: "Order cancelled successfully", order }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}



// Fetch all orders for a user (excluding cancelled orders)
export async function GET(req) {
  console.log("yes this will run")
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const customerEmail = searchParams.get("email"); // Get email from query params

    if (!customerEmail) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
      });
    }

    // Find all orders for the user, excluding cancelled orders
    const orders = await Order.find({
      customerEmail,
      status: { $ne: "cancelled" }, // Exclude cancelled orders
    });

    return new Response(JSON.stringify(orders), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}