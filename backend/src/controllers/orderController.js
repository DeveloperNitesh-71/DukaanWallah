const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private/Buyer (or Public with optional user)
const addOrderItems = async (req, res) => {
  const { items, shippingAddress } = req.body;

  if (items && items.length === 0) {
    res.status(400).json({ message: 'No order items' });
    return;
  }

  try {
    // 1. Group items by their sellerId
    const itemsWithSellers = await Promise.all(items.map(async (item) => {
      const product = await Product.findById(item.productId);
      if (!product) {
        throw new Error(`Product ${item.name} not found`);
      }
      return {
        ...item,
        sellerId: product.sellerId.toString(),
        price: product.price // Re-verify price from DB
      };
    }));

    const sellersMap = {};
    itemsWithSellers.forEach(item => {
      if (!sellersMap[item.sellerId]) {
        sellersMap[item.sellerId] = {
          items: [],
          totalAmount: 0
        };
      }
      sellersMap[item.sellerId].items.push({
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      });
      sellersMap[item.sellerId].totalAmount += item.price * item.quantity;
    });

    // 2. Create separate orders for each seller
    const createdOrders = [];
    const sellerIds = Object.keys(sellersMap);

    for (const sellerId of sellerIds) {
      const order = new Order({
        buyerId: req.user ? req.user._id : undefined,
        sellerId,
        items: sellersMap[sellerId].items,
        totalAmount: sellersMap[sellerId].totalAmount,
        shippingAddress,
      });

      const createdOrder = await order.save();
      createdOrders.push(createdOrder);
    }

    res.status(201).json(createdOrders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('buyerId', 'name email phone address profileImage shopName');

    if (order) {
      // Check authorization (if buyer or seller associated)
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get seller orders
// @route   GET /api/orders/seller
// @access  Private/Seller
const getSellerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ sellerId: req.user._id })
      .populate('buyerId', 'name email phone address profileImage shopName')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Seller
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      if (order.sellerId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to update this order' });
      }

      order.status = req.body.status || order.status;
      const updatedOrder = await order.save();
      
      // Populate buyerId before returning
      const populatedOrder = await Order.findById(updatedOrder._id)
        .populate('buyerId', 'name email phone address profileImage shopName');
        
      res.json(populatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyerId: req.user._id })
      .populate('sellerId', 'name shopName email')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addOrderItems,
  getOrderById,
  getSellerOrders,
  getMyOrders,
  updateOrderStatus,
};
