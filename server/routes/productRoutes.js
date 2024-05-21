const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { verifyToken, isCompany } = require("../middleware/authMiddleware"); // Assumed to be implemented

// Add a product
router.post("/add", verifyToken, isCompany, productController.addProduct);

// Update a product
router.patch(
  "/update/:id",
  verifyToken,
  isCompany,
  productController.updateProduct
);

// Delete an image from a product
router.patch(
  "/deleteImage/:id",
  verifyToken,
  isCompany,
  productController.deleteImage
);

// Delete a product
router.delete(
  "/delete/:id",
  verifyToken,
  isCompany,
  productController.deleteProduct
);

// Decrease the quantity of a product
router.patch(
  "/decrease_quantity/:id",
  verifyToken,
  isCompany,
  productController.decreaseQuantity
);

// Get products with pagination and optional search parameters
router.get("/", productController.getProducts);

module.exports = router;
