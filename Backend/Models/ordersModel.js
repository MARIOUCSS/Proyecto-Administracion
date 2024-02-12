const mongoose = require("mongoose");
const ModelOrders = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    products: [
      {
        id: { type: String },
        name: { type: String },
        desc: { type: String },
        price: { type: String },
        photo: { data: Buffer, contentType: String },
        cuantity: { type: Number },
      },
    ],
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    shipping: { type: Object },
    delivery_status: { type: String, default: "pending" },
    payment_status: { type: String, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Orders", ModelOrders);
