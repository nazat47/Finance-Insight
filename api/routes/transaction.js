const express = require("express");
const router = express.Router();
const Transaction = require("../models/transactionModel");
router.get("/transactions", async (req, res) => {
  try {
    const transaction = await Transaction.find({}).limit(50).sort({createdAt:-1});
    res.status(200).json(transaction);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
});
module.exports = router;
