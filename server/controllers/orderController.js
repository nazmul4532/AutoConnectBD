const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");

exports.createOrderFromCart = async (req,res) => {
  try {
    const { cartId, paymentMethod, deliveryAddress} = req.body;
    // Fetch the cart
    const cart = await Cart.findById(cartId).populate("products.product");
    if (!cart) {
      throw new Error("Cart not found");
    }

    // Prepare products array
    const products = cart.products.map(item => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price, // Assuming price is a field in the Product schema
    }));

    // Create the order
    const order = new Order({
      user: req.user._id,
      cart: cart._id, // Optional cart reference
      products: products,
      paymentMethod: paymentMethod,
      paymentStatus: paymentMethod === "cash_on_delivery" ? "pending" : "completed",
      deliveryAddress: deliveryAddress,
    });

    await order.save();
    console.log("Order created successfully:", order);

    // Optionally, clear the cart after order creation
    cart.products = [];
    await cart.save();
    console.log("Cart cleared after order creation");

    return order;
  } catch (error) {
    console.error("Error creating order from cart:", error);
  }
};


exports.updateOrderStatus = async (req, res) => {
    try {
      const { orderId, status } = req.body;
  
      // Find the order
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      // Update the order status
      order.status = status;
      await order.save();
      console.log("Order status updated successfully:", order);
  
      return res.status(200).json(order);
    } catch (error) {
      console.error("Error updating order status:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };


exports.getOrderDetails = async (req, res) => {
  try {
    const orderId = req.params.orderId;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order details:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const { page = 1, pageSize = 5 } = req.query;

    const query = { user: req.user._id };

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(parseInt(pageSize))
      .populate("products.product");

    const totalOrders = await Order.countDocuments(query);
    const totalPages = Math.ceil(totalOrders / pageSize);

    res.status(200).json({
      orders,
      pagination: {
        totalOrders,
        totalPages,
        currentPage: parseInt(page),
        pageSize: parseInt(pageSize),
      },
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


