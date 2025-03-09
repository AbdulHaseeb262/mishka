// /app/api/admin/login/route.js
import jwt from "jsonwebtoken";

export async function POST(req) {
  const { email, password } = await req.json();

  // Compare credentials with environment variables
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD; // In production, store a hash

  if (email !== adminEmail || password !== adminPassword) {
    return new Response(
      JSON.stringify({ error: "Invalid admin credentials" }),
      { status: 401 }
    );
  }

  // If credentials match, generate a JWT
  const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });

  return new Response(JSON.stringify({ token }), { status: 200 });
}
