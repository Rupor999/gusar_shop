const passport = require("passport"),
  config = require("@config");
// models = require("@root/app/setup");
const multer = require("multer");
//Параметры сохранения
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
//Фильтр на файлы
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage: storageConfig, fileFilter: fileFilter });

module.exports = app => {
  const api = app.app.api.image;
  //Получить изображение
  app.post(config.API_VERSION + "image_get", api.getImage());
  //Загрузить изображение
  app.post(
    config.API_VERSION + "image",
    passport.authenticate("jwt", config.session),
    upload.single("file"),
    api.newImage()
  );
  //Удалить изображение
  app.post(
    config.API_VERSION + "image_delete",
    passport.authenticate("jwt", config.session),
    api.deleteImage()
  );
};
