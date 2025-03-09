import mongoose from "mongoose";

const roles = ["customer", "admin"];

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
    role: { type: String, enum: roles, default: "customer" },

    resetToken: String,
    resetTokenExpiry: Date,
  },
  { timestamps: true }
);
export { UserSchema };

export default mongoose.models.User || mongoose.model("User", UserSchema);
