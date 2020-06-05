const passport = require("passport"),
  config = require("@config"),
  models = require("@root/app/setup");

module.exports = app => {
  const api = app.app.api.orders;
  //Получить все заказы
  app.get(
    config.API_VERSION + "orders-all",
    passport.authenticate("jwt", config.session),
    api.getAllOrders(models.Orders)
  );
  //получить все заказы конкретного id пользователя
  app.post(
    config.API_VERSION + "orders-id",
    passport.authenticate("jwt", config.session),
    api.getIdOrders(models.Orders)
  );
  //Добавить заказ
  app.post(
    config.API_VERSION + "orders-add",
    passport.authenticate("jwt", config.session),
    api.addOrder(models.Orders)
  );
  //Изменить статус заказа
  app.put(
    config.API_VERSION + "orders-change-status",
    passport.authenticate("jwt", config.session),
    api.modifyChangeStatus(models.Orders)
  );
  //Изменить статус оплаты заказа
  app.put(
    config.API_VERSION + "orders-change-status-payment",
    passport.authenticate("jwt", config.session),
    api.modifyChangeStatusPayment(models.Orders)
  );
};
