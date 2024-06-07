const Product = require("../models/productModel");
const User = require("../models/userModel");
const upload = require('../configs/multerConfig');
const cloudinary = require('cloudinary').v2;
const configureCloudinary = require('../configs/cloudinaryConfig');


exports.addProduct = async (req, res) => {
  try {
    configureCloudinary();
    const { name, quantity, description, unitPrice, categories } = req.body;
    console.log(categories.split(",").map((category) => category.trim()));

    const uploadedImages = [];

    // if (req.files && req.files.length > 0) {
    //   console.log("I am Here Inside the If Statement");
    //   for (const file of req.files) {
    //     console.log("I am Here Inside the For Loop");
    //     const uploadResult = await cloudinary.uploader.upload(file.path, { folder: 'product-images' });
    //     uploadedImages.push(uploadResult.secure_url);
    //   }
    // }
    // console.log("I am Here Now");
    // console.log(uploadedImages);
    // console.log(req.user._id);
    if (req.file) {
      // console.log("I am Here Inside the If Statement");
      // console.log("I am Here Inside the For Loop");
      const uploadResult = await cloudinary.uploader.upload(req.file.path, { folder: 'product-images' });
      uploadedImages.push(uploadResult.secure_url);
    }    

    const product = new Product({
      name,
      img: uploadedImages,
      category: categories.split(",").map((category) => category.trim()),
      quantity,
      description,
      unitPrice,
      company: req.user._id,
    });
    // console.log(product);
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
  const { name, description, img, categories, quantity, unitPrice } = req.body;
  // console.log(req.body);
  // console.log("files");
  // console.log(req.file);
  try {
    // console.log(req.params.id);
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (name) product.name = name;
    if (description) product.description = description;
    if(categories || categories == []) product.category = categories.split(",").map((category) => category.trim());
    const uploadedImages = [];
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, { folder: 'product-images' });
      uploadedImages.push(uploadResult.secure_url);
      product.img = uploadedImages;
    }    

    if (quantity>=0){ 
      // console.log("Updating Quantity");
      product.quantity = quantity;
    }
    if (unitPrice>=0) product.unitPrice = unitPrice;

    await product.save();
    console.log("Updated Product Successfully");
    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

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
exports.getProducts = async (req, res) => {
  // works like search too
  try {
    console.log("Fetching Products");
    const { page = 1, pageSize = 5, keyword, category, company } = req.query;
    const query = {};
    if(req.user.role === "company"){
      query.company = req.user;
    }
    // console.log(page);
    // console.log( pageSize);

    if (keyword) {
      query.$or = [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ];
    }

    if (category) {
      query.category = { $elemMatch: { $regex: category, $options: "i" } };
    }

    if (company) {
      const userQuery = {
        name: { $regex: company, $options: "i" },
        role: "company",
      };
      const users = await User.find(userQuery);
      // console.log(users);
      const userId = users.map((user) => user._id);

      query.company = { $in: userId };
    }

    const products = await Product.find(query)
      .sort({ createdAt: -1 })
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


exports.getProductDetails = async (req, res) => {
  try {
    const productId = req.params.productId;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product details:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


exports.addRating = async (req, res) => {
  try {
    const { productId, ratingValue } = req.body;
    const { userId } = req.user; 

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const existingRating = product.ratings.find(rating => rating.user.toString() === userId);
    if (existingRating) {
      return res.status(400).json({ message: "You have already rated this product" });
    }

    product.ratings.push({ user: userId, value: ratingValue });

    const totalRating = product.ratings.reduce((acc, curr) => acc + curr.value, 0);
    product.averageRating = (totalRating / product.ratings.length).toFixed(2);

    await product.save();

    res.status(200).json({ message: "Rating added successfully" });
  } catch (error) {
    console.error("Error adding rating:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllProductDetails = async (req, res) => {
  try {
    console.log("Fetching All Products");
    const { keyword, category, company } = req.query;
    const query = {};
    if(req.user.role === "company"){
      query.company = req.user;
    }

    if (keyword) {
      query.$or = [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ];
    }

    if (category) {
      query.category = { $elemMatch: { $regex: category, $options: "i" } };
    }

    if (company) {
      const userQuery = {
        name: { $regex: company, $options: "i" },
        role: "company",
      };
      const users = await User.find(userQuery);
      // console.log(users);
      const userId = users.map((user) => user._id);

      query.company = { $in: userId };
    }


    const products = await Product.find(query).sort({ createdAt: -1 });
    if (!products) {
      return res.status(404).json({ message: "Products not found" });
    }
    console.log("All Products Returned");
    // console.log(products);
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching product details:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to search products based on query parameters
exports.searchProducts = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice, minRating } = req.query;
    const query = {};

    // Filter by name (case-insensitive)
    if (name) {
      query.name = { $regex: name, $options: "i" };
    }

    // Filter by category
    if (category) {
      query.category = { $in: category.split(",") };
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      query.unitPrice = {};
      if (minPrice) {
        query.unitPrice.$gte = Number(minPrice);
      }
      if (maxPrice) {
        query.unitPrice.$lte = Number(maxPrice);
      }
    }

    // Filter by minimum rating
    if (minRating) {
      query.averageRating = { $gte: Number(minRating) };
    }

    const products = await Product.find(query);

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};