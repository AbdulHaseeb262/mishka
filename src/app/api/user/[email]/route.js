import connectToDatabase from "../../../../lib/mongodb";
import User from "../../../../models/User";

export async function GET(req, { params }) {
  try {
    await connectToDatabase();
    // Await params before destructuring (per Next.js recommendations)
    const { email } = await params;

    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    // Exclude sensitive fields; include profilePic if available
    const { name, email: userEmail, role, profilePic } = user;
    const userData = { name, email: userEmail, role, profilePic };

    return new Response(JSON.stringify(userData), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
