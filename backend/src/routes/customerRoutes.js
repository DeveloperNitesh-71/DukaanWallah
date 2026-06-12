const express = require('express');
const { getCustomers, addCustomer, removeCustomer } = require('../controllers/customerController');
const { protect, sellerOnly } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, sellerOnly, getCustomers)
  .post(protect, sellerOnly, addCustomer);

router.route('/:id')
  .delete(protect, sellerOnly, removeCustomer);

module.exports = router;
