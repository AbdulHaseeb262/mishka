import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: String,
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    bestseller: { type: Boolean, default: false }, // Add bestseller field
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
