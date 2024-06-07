const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

exports.createOrderFromCart = async (req, res) => {
    try {
      console.log("Creating order from cart");
      console.log(req.body);
      let { cart, cashOnDelivery,firstName, lastName, email, phoneNumber, postalCode, paymentMethod, address } = req.body.formData;
      if(cashOnDelivery){
        paymentMethod = "cash_on_delivery";
      }
      console.log(cart);
      if (!cart) {
        // throw new Error("Cart not found");
        res.status(400).json({ message: "Cart not found" });
      }
      const productsByCompany = {};
      cart.forEach(item => {
        console.log(item);
        const companyId = item.company.toString();
        if (!productsByCompany[companyId]) {
          productsByCompany[companyId] = [];
        }
        productsByCompany[companyId].push({
          product: item._id,
          quantity: item.quantity,
          price: item.unitPrice,
        });
      });
  
      const orders = [];
      for (const companyId in productsByCompany) {
        const companyProducts = productsByCompany[companyId];
        console.log(companyId);
        const order = new Order({
          user: req.user._id,
          firstName: firstName,
          lastName: lastName,
          customerEmail: email,
          customerPhone: phoneNumber,
          company: companyId,
          products: companyProducts,
          paymentMethod: paymentMethod,
          paymentStatus: paymentMethod === "cash_on_delivery" ? "pending" : "completed",
          deliveryAddress: address,
          postalCode: postalCode,
        });
        await order.save();
        orders.push(order);
      }
      console.log("Orders created successfully:", orders);
  
      res.status(201).json({ message: "Orders created successfully", orders: orders });
    } catch (error) {
      console.error("Error creating orders from cart:", error);
      throw error; 
    }
  };
  

exports.createOrderBuyNow = async (req, res) => {
    try {
      const { productId, quantity, paymentMethod, deliveryAddress } = req.body;
  
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error("Product not found");
      }
  
      const order = new Order({
        user: req.user._id,
        company: product.company,
        products: [{
          product: productId,
          quantity: quantity,
          unitPrice: product.unitPrice,
        }],
        paymentMethod: paymentMethod,
        paymentStatus: paymentMethod === "cash_on_delivery" ? "pending" : "completed",
        deliveryAddress: deliveryAddress,
      });
  
      await order.save();
      console.log("Order created successfully:", order);
  
      res.status(201).json({ message: "Order created successfully", order: order });
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  


exports.updateOrderStatus = async (req, res) => {
    try {
      const { orderId, status } = req.body;
  
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      if(order.status === "cancelled" || order.status === "completed"){
        res.status(400).json({ message: "Order can't be updated" });
      }

      if(order.company.toString() !== req.user._id.toString() || order.user.toString() !== req.user._id.toString()){
        res.status(400).json({ message: "You are not authorized to update this order" });
      }
  
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

    if(order.company.toString() !== req.user._id.toString() || order.user.toString() !== req.user._id.toString()){
        res.status(400).json({ message: "You are not authorized to update this order" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order details:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getOrders = async (req, res) => {
  try {
    console.log("Trying to fetch user orders");
    const { page = 1, pageSize = 5 } = req.query;
    let query = {};

    if (req.user.role === "customer") {
      query.user = req.user._id;
    }
    if (req.user.role === "company") {
      query.company = req.user._id;
    }

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


