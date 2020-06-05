const mongoose = require("mongoose");

const ordersSchema = mongoose.Schema(
  {
    ordersNumber: {
      type: String,
      required: true
    },
    customerId: {
      type: String,
      required: true
    },
    productsArray: {
      type: Array,
      required: true,
      default: []
    },
    deliveryAddress: {
      type: String,
      required: true
    },
    paymentStatus: {
      type: String,
      required: true
    },
    orderStatus: {
      type: String,
      required: true
    },
    totalPrice: {
      type: Number,
      required: true
    }
  },
  { versionKey: false }
);

mongoose.model("Orders", ordersSchema);
