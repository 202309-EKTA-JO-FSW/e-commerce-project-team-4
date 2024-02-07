const mongoose = require("mongoose");

const ShopItemSchema = new mongoose.Schema(
  {
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
      default: 1,
    },
    category: {
      type: [String],
      default: [],
    },
    images: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ShopItem", ShopItemSchema);
