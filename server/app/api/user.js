const mongoose = require("mongoose"),
  jwt = require("jsonwebtoken"),
  bcrypt = require("bcrypt");
const api = {};

api.getUsers = (User, Token) => (req, res) => {
  User.find({}, (error, users) => {
    if (error) {
      res.status(500).json({
        success: false,
        message: "Ошибка при получении данных о пользователях!"
      });
    } else {
      res.status(200).json({ success: true, users: users });
    }
  });
};

// Добавление нового(-ых) пользователей
api.newUser = User => (req, res) => {
  if (
    !req.body.number ||
    !req.body.password ||
    !req.body.surname ||
    !req.body.name ||
    !req.body.midname
  )
    res.status(400).json({
      success: false,
      message: "Пожалуйста, заполните все поля!"
    });
  else {
    User.findOne({ number: req.body.number }, (err, user) => {
      if (err || user) {
        res.status(400).json({
          success: false,
          message:
            "Произошла ошибка или данный телефонный номер уже зарегистрирован!"
        });
      } else {
        const newUser = new User({
          number: req.body.number,
          password: req.body.password,
          surname: req.body.surname,
          name: req.body.name,
          midname: req.body.midname,
          email: req.body.email
        });
        newUser.save(err => {
          if (err)
            return res
              .status(400)
              .json({ success: false, message: "Ошибка сохранения." });
          else
            return res
              .status(201)
              .json({ success: true, message: "Аккаунт успешно сохранен." });
        });
      }
    });
  }
};
// Модификация пользователя
api.modifyUser = User => (req, res) => {
  let newUserData = req.body;
  // console.log("Arrive: ");
  // console.log(newUserData);
  let id = { _id: newUserData._id };
  delete newUserData._id;

  for (key in newUserData) {
    if (newUserData[key].length === 0) delete newUserData[key];
  }

  if ("password" in newUserData) {
    bcrypt.genSalt(10, (error, salt) => {
      if (error) return next(error);
      bcrypt.hash(newUserData["password"], salt, (error, encrypted) => {
        if (error) return next(error);
        newUserData["password"] = encrypted;

        User.findByIdAndUpdate(id, newUserData, (err, user) => {
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
      });
    });
  } else {
    User.findByIdAndUpdate(id, newUserData, (err, user) => {
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
  }
};
////////////////////////////////////////////////////////////////////////////////

module.exports = api;
