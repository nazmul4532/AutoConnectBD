const Product = require("../models/productModel");
const User = require("../models/userModel");
const upload = require('../configs/multerConfig');
const cloudinary = require('cloudinary').v2;
const configureCloudinary = require('../configs/cloudinaryConfig');


// Add a product
exports.addProduct = async (req, res) => {
  try {
    configureCloudinary();
    const { name, type, quantity, description, unitPrice } = req.body;

    const uploadedImages = [];

    if (req.files && req.files.length > 0) {
      console.log("I am Here Inside the If Statement");
      for (const file of req.files) {
        console.log("I am Here Inside the For Loop");
        const uploadResult = await cloudinary.uploader.upload(file.path, { folder: 'product-images' });
        uploadedImages.push(uploadResult.secure_url);
      }
    }
    console.log("I am Here Now");
    console.log(uploadedImages);
    console.log(req.user._id);

    const product = new Product({
      name,
      img: uploadedImages,
      type,
      quantity,
      description,
      unitPrice,
      company: req.user._id,
    });
    console.log(product);
    await product.save();
    console.log("Product Added Successfully");
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  console.log("Updating Product");
  const { name, description, img, type, quantity, unitPrice } = req.body;
  try {
    console.log(req.params.id);
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update product information if present in the request body
    if (name) product.name = name;
    if (description) product.description = description;

    // Append new image URLs to existing array if provided and not empty
    if (img && Array.isArray(img) && product.img.length > 0) {
      product.img = [...product.img, ...img];
    } else if (img && Array.isArray(img)) {
      product.img = img;
    }

    if (type) product.type = type;
    if (quantity>=0){ 
      console.log("Updating Quantity");
      product.quantity = quantity;
      console.log(quantity);
    }
    if (unitPrice>=0) product.unitPrice = unitPrice;

    await product.save();
    console.log("Updated Product Successfully");
    console.log(product);
    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};


//update product quantity
exports.updateProductQuantity = async (req, res) => {
  const {quantity} = req.body;

  try {
    console.log(req.params.id);
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (quantity) product.quantity = quantity;

    await product.save();

    res.status(200).json({ message: "Product quantity updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

// Delete an image from a product
exports.deleteImage = async (req, res) => {
  try {
    const productId = req.params.id;
    const { imageUrl } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const imageIndex = product.img.indexOf(imageUrl);
    if (imageIndex > -1) {
      product.img.splice(imageIndex, 1);
      await product.save();
    } else {
      return res.status(400).json({ error: "Image not found in product" });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Decrease the quantity of a product
exports.decreaseQuantity = async (req, res) => {
  try {
    const productId = req.params.id;
    const { quantity } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (product.quantity < quantity) {
      return res.status(400).json({ error: "Insufficient quantity" });
    }

    product.quantity -= quantity;
    await product.save();

    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get products with pagination and optional search parameters
exports.getCompanyProducts = async (req, res) => {
  // works like search too
  try {
    console.log("Fetching Products");
    const { page = 1, pageSize = 5, keyword, type, company } = req.query;
    const query = {};
    query.company = req.user;
    console.log(page);
    console.log( pageSize);

    if (keyword) {
      query.$or = [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ];
    }

    if (type) {
      query.type = { $elemMatch: { $regex: type, $options: "i" } };
    }

    if (company) {
      const userQuery = {
        name: { $regex: company, $options: "i" },
        role: "company",
      };
      const users = await User.find(userQuery);
      console.log(users);
      const userId = users.map((user) => user._id);

      query.company = { $in: userId };
    }

    const products = await Product.find(query)
      .skip((page - 1) * pageSize)
      .limit(parseInt(pageSize));

    const totalProducts = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / pageSize);

    res.status(200).json({
      products,
      pagination: {
        totalProducts,
        totalPages,
        currentPage: parseInt(page),
        pageSize: parseInt(pageSize),
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};
