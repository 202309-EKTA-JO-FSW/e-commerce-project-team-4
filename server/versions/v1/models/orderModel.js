const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
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

const orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  items: [orderItemSchema],
  totalAmount: {
    type: Number,
    required: true,
    min: 0,
  },

});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;