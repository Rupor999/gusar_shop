const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    Category: {
      type: String,
      required: true
    },
    ProductName: {
      type: String,
      required: true
    },
    DN: {
      type: String,
      required: true
    },
    PN: {
      type: String,
      required: true
    },
    TempWorkEnv: {
      type: String,
      required: true
    },
    WorkEnv: {
      type: String,
      required: true
    },
    Material: {
      type: String,
      required: true
    },
    ClassGermetich: {
      type: String,
      required: true
    },
    TypeIspolneniya: {
      type: String,
      required: true
    },
    BuildLength: {
      type: String,
      required: true
    },
    Description: {
      type: String,
      required: true
    },
    Price: {
      type: Number,
      required: true
    },
    ImageName: {
      type: String
    }
  },
  { versionKey: false }
);

mongoose.model("Product", productSchema);
