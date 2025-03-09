import connectToDatabase from "../../../../lib/mongodb";
import User from "../../../../models/User";
import crypto from "crypto";
import mailgun from "mailgun-js";

// Initialize Mailgun with your API key and sandbox domain
const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

export async function POST(req) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Parse the JSON body from the request
    const { email } = await req.json();

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ error: "No user found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Generate a secure reset token and set its expiry (1 hour)
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
    await user.save();

    // Build the reset link for your frontend
    const resetLink = `${
      process.env.FRONTEND_URL
    }/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;

    // Create the email data to send via Mailgun
    const data = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Reset Your Password",
      text: `You requested a password reset. Use the link below to reset your password:\n\n${resetLink}`,
      html: `<p>You requested a password reset. Click the link below to reset your password:</p><p><a href="${resetLink}">Reset Password</a></p>`,
    };

    // Wrap the Mailgun send method in a promise to use await
    const mailgunResponse = await new Promise((resolve, reject) => {
      mg.messages().send(data, (error, body) => {
        if (error) {
          console.error("Mailgun error:", error);
          return reject(error);
        }
        console.log("Mailgun response:", body);
        resolve(body);
      });
    });

    // Return a success response
    return new Response(
      JSON.stringify({ message: "Password reset link sent" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in reset password API:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
