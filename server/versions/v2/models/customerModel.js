const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ShopItem",
    required: true,
  },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: "customer",
    },
    gender: {
      type: String,
      require: true,
      enum: ["male", "female"],
    },
    card: cartItemSchema,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Customer", customerSchema);
