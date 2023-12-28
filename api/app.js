const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./db/connect");
const morgan = require("morgan");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const KPI = require("../api/models/kpiModel");
const Product = require("../api/models/productModel");
const Transaction = require("../api/models/transactionModel");
const { kpis, products,transactions } = require("./data/data");
dotenv.config();
const route = require("../api/routes/kpi");
const productRoute = require("./routes/products");
const transactionRoute = require("./routes/transaction");
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("common"));
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/kpi", route);
app.use("/product", productRoute);
app.use("/transaction", transactionRoute);

const port = process.env.PORT || 4000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listeing on port ${port}`));
  } catch (error) {
    console.log(error.message);
  }
};
start();
