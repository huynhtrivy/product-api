const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    pid: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    pname: {
      type: String,
      required: true,
      trim: false,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: false,
    },
  },
  { timestamps: false },
);

module.exports = mongoose.model("Product", productSchema);
