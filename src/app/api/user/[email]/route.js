import connectToDatabase from "../../../../lib/mongodb";
import User from "../../../../models/User";

export async function GET(req, { params }) {
  try {
    await connectToDatabase();
    const { email } = params;

    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    // Exclude password and include role in the response
    const { name, email: userEmail, role } = user;
    const userData = { name, email: userEmail, role };

    return new Response(JSON.stringify(userData), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
