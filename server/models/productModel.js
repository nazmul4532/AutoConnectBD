const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  img: {
    type: [String],
    default: [],
  },
  type: {
    type: [String],
  },
  quantity: {
    type: Number,
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "User",
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

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
