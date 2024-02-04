const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  shopItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ShopItem',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

const cartSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  items: [cartItemSchema],
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;