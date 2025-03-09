import { verifyToken } from "./jwt";

export async function authenticate(req) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) throw new Error("No authorization header");
  const token = authHeader.split(" ")[1];
  if (!token) throw new Error("No token provided");
  try {
    const decoded = verifyToken(token);
    // Optionally check for admin role:
    if (decoded.role !== "admin") {
      throw new Error("Unauthorized");
    }
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
}
