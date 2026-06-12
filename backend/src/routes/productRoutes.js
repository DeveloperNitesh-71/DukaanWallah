const express = require('express');
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
} = require('../controllers/productController');
const { protect, sellerOnly } = require('../middlewares/authMiddleware');

const router = express.Router();

// Initialize Multer with Cloudinary Storage
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

/**
 * Public Routes
 */
router.get('/', getProducts);
router.get('/:id', getProductById);

/**
 * Private Seller Routes
 */
// Create Product - allow up to 5 images
router.post(
  '/', 
  protect, 
  sellerOnly, 
  upload.array('images', 5), 
  createProduct
);

// Update Product - allow up to 5 images
router.put(
  '/:id', 
  protect, 
  sellerOnly, 
  upload.array('images', 5), 
  updateProduct
);

// Delete Product
router.delete(
  '/:id', 
  protect, 
  sellerOnly, 
  deleteProduct
);

/**
 * Review Routes
 */
router.post('/:id/reviews', protect, createProductReview);

module.exports = router;
