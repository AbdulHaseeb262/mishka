import connectToDatabase from "../../../../lib/mongodb";
import Order from "../../../../models/order";
import { authenticate } from "../../../../lib/auth/middleware";

// PUT /api/orders/:id - Update an existing order (e.g., update status or other details)
export async function PUT(req, { params }) {
  try {
    await connectToDatabase();
    await authenticate(req); // Protect route for admin access

    const { id } = params; // Make sure params is used correctly—no need to await here.
    const data = await req.json();

    // Find the order and update with new data
    const updatedOrder = await Order.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

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

// DELETE /api/orders/:id - Delete an existing order
export async function DELETE(req, { params }) {
  try {
    await connectToDatabase();
    await authenticate(req); // Protect route for admin access

    const { id } = params;
    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return new Response(JSON.stringify({ error: "Order not found" }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({ message: "Order deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}



export async function POST(req, { params }) {
  try {
    // await connectToDatabase();
    // await authenticate(req); 
    
    console.log("hn ye chala")// Protect route for admin access

    const { id } = params; // Extract order ID from URL
    const data = await req.json(); // Get the updated data from the request body

    console.log("Updating order:", id, data); // Log the order ID and data

    // Find the order and update with new data
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { paymentStatus: data.paymentStatus }, // Update paymentStatus
      {
        new: true, // Return the updated document
        runValidators: true, // Run schema validators
      }
    );

    if (!updatedOrder) {
      console.error("Order not found:", id); // Log if order is not found
      return new Response(JSON.stringify({ error: "Order not found" }), {
        status: 404,
      });
    }

    console.log("Order updated successfully:", updatedOrder); // Log success
    return new Response(JSON.stringify(updatedOrder), { status: 200 });
  } catch (error) {
    console.error("Error updating order:", error); // Log the error
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}