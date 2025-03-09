import connectToDatabase from "../../../lib/mongodb";
import Product from "../../../models/Product";
// Optionally, import { authenticate } from "../../../lib/auth/middleware";

export async function GET(req) {
  try {
    await connectToDatabase();
    const products = await Product.find({});
    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  try {
    await connectToDatabase();
    // Optionally, add authentication for admin-only actions
    const data = await req.json();
    const product = new Product(data);
    await product.save();
    return new Response(JSON.stringify(product), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
