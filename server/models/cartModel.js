const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Cart Schema
const CartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity cannot be less than 1."],
          default: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Create and export the Cart model
const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
