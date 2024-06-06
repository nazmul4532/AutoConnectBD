const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { verifyToken, isCompany } = require("../middleware/authMiddleware"); // Assumed to be implemented
const upload = require('../configs/multerConfig');

// Add a product
router.post("/add", verifyToken, isCompany, upload.single('image'), productController.addProduct);

// Update a product
router.patch(
  "/update/:id",
  verifyToken,
  isCompany,
  upload.single('image'),
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
router.get("/", verifyToken, productController.getCompanyProducts);

router.get("/product-details/:id", productController.getProductDetails);

router.post('/add-rating', productController.addRating);


module.exports = router;
