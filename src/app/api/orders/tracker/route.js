// /app/api/orders/tracker/route.js
import connectToDatabase from "../../../../lib/mongodb";
import Order from "../../../../models/order";

export async function GET(req) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("orderId");
    const customerEmail = searchParams.get("email"); // optional, for verification

    if (!orderId) {
      return new Response(JSON.stringify({ error: "Order ID is required" }), {
        status: 400,
      });
    }

    // Find the order by ID. Optionally, filter by email.
    const query = customerEmail
      ? { _id: orderId, customerEmail }
      : { _id: orderId };
    const order = await Order.findOne(query);

    if (!order) {
      return new Response(JSON.stringify({ error: "Order not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(order), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
