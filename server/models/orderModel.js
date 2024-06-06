const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cart: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
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
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "delivered", "completed", "cancelled"],
      default: "pending",
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending",
      },
    paymentMethod: {
        type: String,
        enum: ["credit_card", "bank_transfer", "bkash", "cash_on_delivery"],
        required: true,
        default: "cash_on_delivery",
      },
    paymentDate:{
        type: Date,
    },
    deliveryAddress: {
      type: String,
      required: true,
    },
    createdAt: {  // Define the createdAt field explicitly
      type: Date,
      default: Date.now, // Use the current timestamp as the default value
    },
  },
  {
    timestamps: true,
  }
);

OrderSchema.pre("save", function (next) {
  let total = 0;
  this.products.forEach(item => {
    total += item.quantity * item.price;
  });
  this.totalPrice = total;
  next();
});

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
