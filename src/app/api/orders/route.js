import connectToDatabase from "../../../lib/mongodb";
import Order from "../../../models/order";
import { authenticate } from "../../../lib/auth/middleware";

// GET /api/orders - List all orders (admin protected)
export async function GET(req) {
  try {
    await connectToDatabase();
    await authenticate(req); // Protect route for admin access
    const orders = await Order.find({}).sort({ createdAt: -1 });
    return new Response(JSON.stringify(orders), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 401,
    });
  }
}

// POST /api/orders - Create a new order
export async function POST(req) {
  try {
    await connectToDatabase();
    const data = await req.json();

    console.log("Received Data:", JSON.stringify(data, null, 2)); // Debugging

    // Check if imageUrl exists in all items
    data.items.forEach((item) => {
      if (!item.imageUrl) {
        console.warn(`Missing imageUrl for item: ${item.name}`);
      }
    });

    const order = new Order(data);
    await order.save();

    return new Response(JSON.stringify(order), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
