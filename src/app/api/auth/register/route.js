import connectToDatabase from "../../../../lib/mongodb";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";
import { signToken } from "../../../../lib/auth/jwt";

export async function POST(req) {
  await connectToDatabase();
  const { email, name, password } = await req.json();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return new Response(JSON.stringify({ error: "User already exists" }), {
      status: 400,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, name, password: hashedPassword });
  await user.save();

  const token = signToken({ id: user._id, email: user.email, role: user.role });
  return new Response(JSON.stringify({ token }), { status: 201 });
}
