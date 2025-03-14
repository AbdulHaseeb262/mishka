import connectToDatabase from "../../../../lib/mongodb";
import Order from "../../../../models/order";
import { authenticate } from "../../../../lib/auth/middleware";

// PUT /api/orders/:id - Update an existing order (e.g., update status or other details)
export async function PUT(req, { params }) {
  console.log("going to be update");

  try {
    await connectToDatabase();
    await authenticate(req); // Protect route for admin access

    const { id } = await params;
    // Extract order ID from URL
    // const data = await req.json(); // Get the updated data from the request body

    // Find the order and update with new data
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { paymentStatus: "Paid" }, // Update paymentStatus
      {
        new: true, // Return the updated document
        runValidators: true, // Run schema validators
      }
    );

    if (!updatedOrder) {
      return new Response(JSON.stringify({ error: "Order not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(updatedOrder), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
