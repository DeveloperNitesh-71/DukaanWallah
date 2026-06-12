const express = require('express');
const {
  addOrderItems,
  getOrderById,
  getSellerOrders,
  getMyOrders,
  updateOrderStatus,
} = require('../controllers/orderController');
const { protect, sellerOnly } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', protect, addOrderItems);
router.get('/myorders', protect, getMyOrders);
router.get('/seller', protect, sellerOnly, getSellerOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/status', protect, sellerOnly, updateOrderStatus);

module.exports = router;
