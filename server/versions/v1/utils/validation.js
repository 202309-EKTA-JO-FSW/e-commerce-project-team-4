const mongoose = require('mongoose');

const shopItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  image: {
    type: String,
    required: [true, 'Image URL is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be a positive number'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  availableCount: {
    type: Number,
    required: [true, 'Available count is required'],
    min: [0, 'Available count must be a non-negative number'],
  },
  genre: {
    type: String,
    required: [true, 'Genre or category is required'],
  },
});

const ShopItem = mongoose.model('ShopItem', shopItemSchema);

module.exports = { ShopItem };
