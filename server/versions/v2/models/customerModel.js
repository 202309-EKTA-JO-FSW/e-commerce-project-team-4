const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: "customer",
    },
    card: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Customer", customerSchema);
