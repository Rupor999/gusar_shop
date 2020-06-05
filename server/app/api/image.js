const fs = require("fs"),
  path = require("path");

const api = {};

//Получить изображение
api.getImage = () => (req, res) => {
  let ImageName = req.body.ImageName;
  let ImageNameLength = ImageName.length;
  let imagePath = path.join(__dirname, "../../", "/uploads/", ImageName);
  fs.access(imagePath, fs.constants.R_OK, err => {
    if (err) {
      res.status(404).json({
        success: false,
        message: "Файл не найден"
      });
    } else {
      fs.readFile(imagePath, "base64", (err, result) => {
        res.status(201).json({
          success: true,
          message: "Файл в base64 успешно передан!",
          ImageName: ImageName,
          imagebase64:
            "data:image/" +
            ImageName.slice(ImageNameLength - 3) +
            ";base64," +
            result
        });
      });
    }
  });
};
//Загрузить изображение
api.newImage = () => (req, res) => {
  if (req.file.filename) {
    // console.log(req);
    res.status(201).json({
      success: true,
      message: "Файл успешно загружен.",
      imageName: req.file.filename
    });
  } else {
    res.status(404).json({
      success: true,
      message: "Ошибка загрузки файла!"
    });
  }
};
//Удалить изображение
api.deleteImage = () => (req, res) => {
  let ImageName = req.body.ImageName;
  let imagePath = path.join(__dirname, "../../", "/uploads/", ImageName);

  fs.unlink(imagePath, err => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Ошибка при удалении файла!"
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Файл успешно удален!"
      });
    }
  });
};

module.exports = api;
