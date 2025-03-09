import connectToDatabase from "../../../../lib/mongodb";
import Product from "../../../../models/Product";
// Optionally, import { authenticate } from "../../../../lib/auth/middleware";

// PUT /api/products/:id - Update a specific product
export async function PUT(req, { params }) {
  try {
    await connectToDatabase();
    // Optionally, add authentication for admin-only actions
    const { id } = await params;
    const data = await req.json();

    const updatedProduct = await Product.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return new Response(JSON.stringify({ error: "Product not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(updatedProduct), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

// DELETE /api/products/:id - Delete a specific product
export async function DELETE(req, { params }) {
  try {
    await connectToDatabase();
    // Optionally, add authentication for admin-only actions
    const { id } = await params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return new Response(JSON.stringify({ error: "Product not found" }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({ message: "Product deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function PATCH(req, { params }) {
  try {
    await connectToDatabase();
    // Optionally, add authentication for admin-only actions
    const { id } = await params;
    const { bestseller } = await req.json();

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { bestseller },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return new Response(JSON.stringify({ error: "Product not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(updatedProduct), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
