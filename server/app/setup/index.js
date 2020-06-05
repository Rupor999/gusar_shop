const mongoose = require("mongoose"),
  UserModel = require("@Models/user"),
  ProductModel = require("@Models/product");
OrdersModel = require("@Models/orders");
const models = {
  User: mongoose.model("User"),
  Product: mongoose.model("Product"),
  Orders: mongoose.model("Orders")
};
module.exports = models;
