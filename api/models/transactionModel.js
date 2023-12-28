const mongoose = require("mongoose");
const { loadType } = require("mongoose-currency");

loadType(mongoose);

const transactionSchema = new mongoose.Schema(
  {
    buyer: {
      type: String,
      required: true,
    },
    amount: {
      type: mongoose.Types.Currency,
      currency: "BDT",
      get: (v) => v / 100,
    },
    productIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true, toJSON: { getters: true } }
);

module.exports = mongoose.model("Transaction", transactionSchema);
