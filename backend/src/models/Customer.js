const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to a registered User (buyer)
  customId: { type: String, required: true },
  name: { type: String, required: true },
  shopName: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String },
  joinedDate: { type: Date, default: Date.now },
}, { timestamps: true });

// Ensure a seller doesn't add the same customer ID twice
customerSchema.index({ sellerId: 1, customId: 1 }, { unique: true });

module.exports = mongoose.model('Customer', customerSchema);
