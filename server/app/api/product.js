const mongoose = require("mongoose");
const api = {};

//Получить все товары
api.getProduct = Product => (req, res) => {
  Product.find({}, (error, products) => {
    if (error) {
      res.status(403).send({
        success: false,
        message: "Ошибка сервера, невозможно получить данные!"
      });
    } else {
      res.status(200).json({ success: true, products: products });
    }
  });
};
//Добавить новый товар
api.newProduct = Product => (req, res) => {
  // console.log(req.body);
  if (
    !req.body.Category ||
    !req.body.ProductName ||
    !req.body.DN ||
    !req.body.PN ||
    !req.body.TempWorkEnv ||
    !req.body.WorkEnv ||
    !req.body.Material ||
    !req.body.ClassGermetich ||
    !req.body.TypeIspolneniya ||
    !req.body.BuildLength ||
    !req.body.Description ||
    !req.body.Price ||
    !req.body.ImageName
  )
    res.status(400).json({
      success: false,
      message: "Пожалуйста, заполните все поля!"
    });
  else {
    const newProduct = new Product({
      Category: req.body.Category,
      ProductName: req.body.ProductName,
      DN: req.body.DN,
      PN: req.body.PN,
      TempWorkEnv: req.body.TempWorkEnv,
      WorkEnv: req.body.WorkEnv,
      Material: req.body.Material,
      ClassGermetich: req.body.ClassGermetich,
      TypeIspolneniya: req.body.TypeIspolneniya,
      BuildLength: req.body.BuildLength,
      Description: req.body.Description,
      Price: req.body.Price,
      ImageName: req.body.ImageName
    });
    newProduct.save(err => {
      if (err) {
        console.log(err);
        return res
          .status(400)
          .json({ success: false, message: "Ошибка сохранения." });
      } else {
        return res
          .status(201)
          .json({ success: true, message: "Новый продукт успешно сохранен." });
      }
    });
  }
};
//Изменить существующий товар
api.modifyProduct = Product => (req, res) => {
  let refreshProductData = req.body;
  let id = { _id: refreshProductData.id };
  delete refreshProductData.id;

  Product.findByIdAndUpdate(id, refreshProductData, (err, product) => {
    if (err) {
      res.status(400).json({
        success: false,
        message: "Ошибка изменения данных продукта!"
      });
    } else {
      res.status(201).json({
        success: true,
        message: "Изменение данных продукта прошло успешно!"
      });
    }
  });
};
//Удалить товар
api.deleteProduct = Product => (req, res) => {
  let product_id = req.body.product_id;
  Product.findOneAndRemove({ _id: product_id }, err => {
    if (err) {
      res.status(500).json({
        success: true,
        message: "Произвошла ошибка при удалении продукта!"
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Удаление продукта прошло успешно!"
      });
    }
  });
};

module.exports = api;
