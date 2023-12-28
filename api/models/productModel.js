const mongoose = require("mongoose");
const { loadType } = require("mongoose-currency");

loadType(mongoose);

const productSchema = new mongoose.Schema(
  {
    price: {
      type: mongoose.Types.Currency,
      currency: "BDT",
      get: (v) => v / 100,
    },
    expense: {
      type: mongoose.Types.Currency,
      currency: "BDT",
      get: (v) => v / 100,
    },
    transactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction",
      },
    ],
  },
  { timestamps: true, toJSON: { getters: true } }
);

module.exports = mongoose.model("Product", productSchema);
