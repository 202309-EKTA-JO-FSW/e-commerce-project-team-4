const mongoose = require("mongoose");

const ShopItem = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  availableCount: {
    type: Number,
    require: true,
    default: 1,
    min: 0,
  },
  category: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("ShopItem", ShopItem);
