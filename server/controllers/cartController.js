const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

// Add product to cart
exports.addToCart = async (req, res) => {
  // works as increase quantity route as well
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: userId });

    // create cart if it doesnt exist
    if (!cart) {
      cart = new Cart({ user: userId, products: [] });
    }

    const productIndex = cart.products.findIndex(
      (p) => p.product.toString() === productId
    );

    // find if the product exists in the cart
    if (productIndex > -1) {
      if (cart.products[productIndex].quantity + quantity > product.quantity) {
        return res
          .status(400)
          .json({ message: "Exceeds available product quantity" });
      }
      cart.products[productIndex].quantity += quantity;
    } else {
      if (quantity > product.quantity) {
        return res
          .status(400)
          .json({ message: "Exceeds available product quantity" });
      }
      cart.products.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user's cart
exports.getCart = async (req, res) => {
  const userId = req.user._id;

  try {
    console.log("Fetching cart for user:", userId);
    let cart = await Cart.findOne({ user: userId }).populate(
      "products.product"
    );

    if (!cart) {
      cart = new Cart({ user: userId, products: [] });
      await cart.save();
    }

    console.log("Cart fetched successfully");
    res.status(200).json({ cart, hasCart: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Decrease product quantity
exports.decreaseQuantity = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(200).json({
        cart: [],
        hasCart: false,
        message: "Operation failed sucessfully, Cart was not found",
      });
    }

    const productIndex = cart.products.findIndex(
      (p) => p.product.toString() === productId
    );

    if (productIndex > -1) {
      // Determine the amount to subtract
      const amountToSubtract = quantity !== undefined ? quantity : 1;
      cart.products[productIndex].quantity -= amountToSubtract;

      // Remove product if quantity is 0 or less
      if (cart.products[productIndex].quantity <= 0) {
        cart.products.splice(productIndex, 1);
      }

      await cart.save();
      return res.status(200).json({ cart, hasCart: true });
    } else {
      return res.status(200).json({
        cart: [],
        hasCart: false,
        message: "Operation failed sucessfully, Product was not found in cart",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove product from cart
exports.removeFromCart = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(200).json({
        cart: [],
        hasCart: false,
        message: "Operation failed sucessfully, Cart was not found",
      });
    }

    const productIndex = cart.products.findIndex(
      (p) => p.product.toString() === productId
    );

    if (productIndex > -1) {
      cart.products.splice(productIndex, 1);
      await cart.save();
      return res.status(200).json({ cart, hasCart: true });
    } else {
      return res.status(200).json({
        cart,
        hasCart: false,
        message: "Operation failed sucessfully, Product was not found in cart",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
