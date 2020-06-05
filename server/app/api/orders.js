const mongoose = require("mongoose");
const api = {};

//Получить все заказы
api.getAllOrders = Orders => (req, res) => {
  Orders.find({}, (error, orders) => {
    if (error) {
      res.status(500).json({
        success: false,
        message: "Ошибка при получении данных о заказах!"
      });
    } else {
      res.status(200).json({ success: true, orders: orders });
    }
  });
};
//получить все заказы конкретного id пользователя
api.getIdOrders = Orders => (req, res) => {
  Orders.find({ customerId: req.body.userId }, (error, orders) => {
    if (error) {
      res.status(500).json({
        success: false,
        message: "Ошибка при получении данных о заказах!"
      });
    } else {
      res.status(200).json({ success: true, orders: orders });
    }
  });
};
//Добавить заказ
api.addOrder = Orders => (req, res) => {
  // console.log(req.body);
  const newOrder = new Orders({
    ordersNumber: req.body.ordersNumber,
    customerId: req.body.customerId,
    productsArray: req.body.productsArray,
    deliveryAddress: req.body.deliveryAddress,
    paymentStatus: req.body.paymentStatus,
    orderStatus: req.body.orderStatus,
    totalPrice: req.body.totalPrice
  });
  newOrder.save(err => {
    // console.log(err);
    if (err)
      return res
        .status(400)
        .json({ success: false, message: "Ошибка сохранения." });
    else
      return res
        .status(201)
        .json({ success: true, message: "Заказ успешно сохранен." });
  });
};
//Изменить статус заказа
api.modifyChangeStatus = Orders => (req, res) => {
  let newOrdersData = req.body;
  let ordersNumber = { ordersNumber: newOrdersData.ordersNumber };
  let orderStatus = { orderStatus: newOrdersData.orderStatus };

  Orders.findOneAndUpdate(ordersNumber, orderStatus, (err, user) => {
    if (err) {
      res.status(400).json({
        success: false,
        message: "Ошибка изменения статуса заказа."
      });
    } else {
      res.status(201).json({
        success: true,
        message: "Изменение статуса заказа прошло успешно."
      });
    }
  });
};
//Изменить статус оплаты заказа
api.modifyChangeStatusPayment = Orders => (req, res) => {
  let newOrdersData = req.body;
  let id = { _id: newUserData._id };
  delete newUserData._id;

  Orders.findByIdAndUpdate(id, newOrdersData, (err, user) => {
    if (err) {
      res.status(400).json({
        success: false,
        message: "Ошибка изменения данных пользователя."
      });
    } else {
      res.status(201).json({
        success: true,
        message: "Изменение данных пользователя прошло успешно."
      });
    }
  });
};

module.exports = api;
