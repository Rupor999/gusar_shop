const passport = require("passport"),
  config = require("@config"),
  models = require("@root/app/setup");

module.exports = app => {
  const api = app.app.api.user;
  //Получить пользователей
  app.get(
    config.API_VERSION + "users",
    passport.authenticate("jwt", config.session),
    api.getUsers(models.User, app.get("ess-secret"))
  );
  //Регистрация нового пользователя
  app.post(config.API_VERSION + "users", api.newUser(models.User));
  //Изменение данных пользователей
  app.put(
    config.API_VERSION + "users",
    passport.authenticate("jwt", config.session),
    api.modifyUser(models.User)
  );
};
