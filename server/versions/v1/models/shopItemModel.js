const mongoose = require("mongoose");

const ShopItem = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image:{
    type:String,
    required:true
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
  genre:{
    type:String,
    required:true
  }
});

module.exports = mongoose.model("shopitem", ShopItem);
