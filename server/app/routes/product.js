const passport = require("passport"),
  config = require("@config"),
  models = require("@root/app/setup");

module.exports = app => {
  const api = app.app.api.product;
  //Получить товары
  app.get(config.API_VERSION + "product", api.getProduct(models.Product));
  //Добавить новый товар
  app.post(
    config.API_VERSION + "product",
    passport.authenticate("jwt", config.session),
    api.newProduct(models.Product)
  );
  //Изменение данных товара
  app.post(
    config.API_VERSION + "product_refresh",
    passport.authenticate("jwt", config.session),
    api.modifyProduct(models.Product)
  );
  //Удалить товар
  app.post(
    config.API_VERSION + "product_delete",
    passport.authenticate("jwt", config.session),
    api.deleteProduct(models.Product)
  );
};
