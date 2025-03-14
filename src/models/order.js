import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    address: { type: String, required: true },
    deliveryDate: { type: Date, required: true },
    deliveryTime: { type: String, required: true },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: String,
        quantity: Number,
        price: Number,
        Url: { type: String, required: true },
      },
    ],
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["new", "processing", "shipped", "delivered", "cancelled"],
      default: "new",
    },
    paymentMethod:{
      type:String,
      enum:["Stripe" , "Cash"],
      default:"Cash"
    },
    paymentStatus:{
      type:String,
    },
    phonenumber:{
      type:String,
    }
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
