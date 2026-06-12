const Customer = require('../models/Customer');
const User = require('../models/User');
const mongoose = require('mongoose');

/**
 * @desc    Get all customers for a seller
 * @route   GET /api/customers
 * @access  Private/Seller
 */
const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({ sellerId: req.user._id })
      .populate('buyerId', 'name email phone address profileImage shopName')
      .sort({ createdAt: -1 });
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch customers', error: error.message });
  }
};

/**
 * @desc    Add a new customer
 * @route   POST /api/customers
 * @access  Private/Seller
 */
const addCustomer = async (req, res) => {
  try {
    const { id, name, shopName, phone, address } = req.body;

    if (!id || !name || !shopName || !phone) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check if already exists for this seller
    const existingCustomer = await Customer.findOne({ sellerId: req.user._id, customId: id });
    if (existingCustomer) {
      return res.status(400).json({ message: 'This customer is already connected to your network' });
    }

    // Try to find if this customer is a registered buyer
    let buyerId = null;
    let finalName = name;
    let finalPhone = phone;
    let finalAddress = address;
    let finalShopName = shopName;

    // Validate if the ID belongs to a real User
    if (mongoose.Types.ObjectId.isValid(id)) {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'Customer not found. Please check the ID.' });
      }
      
      if (user.role === 'buyer') {
        buyerId = user._id;
        finalName = user.name;
        finalPhone = user.phone || phone;
        finalAddress = user.address || address;
        finalShopName = user.shopName || shopName;
      } else {
        return res.status(400).json({ message: 'The provided ID belongs to a seller, not a customer.' });
      }
    } else {
       return res.status(400).json({ message: 'Invalid Customer ID format.' });
    }

    const customer = new Customer({
      sellerId: req.user._id,
      buyerId,
      customId: id,
      name: finalName,
      shopName: finalShopName,
      phone: finalPhone,
      address: finalAddress,
    });

    const savedCustomer = await customer.save();
    
    res.status(201).json(savedCustomer);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add customer', error: error.message });
  }
};

/**
 * @desc    Remove a customer
 * @route   DELETE /api/customers/:id
 * @access  Private/Seller
 */
const removeCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id, sellerId: req.user._id });

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found in your network' });
    }

    await customer.deleteOne();
    
    res.status(200).json({ message: 'Customer successfully removed' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove customer', error: error.message });
  }
};

module.exports = {
  getCustomers,
  addCustomer,
  removeCustomer,
};
