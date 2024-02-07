const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
      required: true,
    },
    itemId: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Card", cardSchema);
