// const mongoose = require("mongoose");

// const ShopItem = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   availableCount: {
//     type: Number,
//     default: 1,
//   },
//   category: {
//     type: [String],
//     default: [],
//   },
// });

module.exports = require("../../v1/models/shopItemModel");
