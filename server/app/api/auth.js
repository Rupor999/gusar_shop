const mongoose = require("mongoose"),
  jwt = require("jsonwebtoken"),
  config = require("@config");

const api = {};

api.login = User => (req, res) => {
  User.findOne({ number: req.body.number }, (error, user) => {
    console.log(req.body);
    if (error) throw error;

    if (!user)
      res.status(401).send({
        success: false,
        message: "Authentication failed. User not found."
      });
    else {
      user.comparePassword(req.body.password, (error, matches) => {
        if (matches && !error) {
          const token = jwt.sign({ user: user._id }, config.secret);
          res.status(202).json({
            success: true,
            message: "Token granted",
            token,
            user: { id: user._id, fio: user.fio, role: user.role }
          });
        } else {
          res.status(401).send({
            success: false,
            message: "Authentication failed. Wrong number/password."
          });
        }
      });
    }
  });
};

api.verify = headers => {
  if (headers && headers.authorization) {
    const split = headers.authorization.split(" ");
    if (split.length === 2) return split[1];
    else return null;
  } else return null;
};

api.getaccountinfo = (User, Secret) => ({ headers }, res) => {
  const secret = Secret;
  if (headers && headers.authorization) {
    const split = headers.authorization.split(" ");
    if (split.length === 2) {
      const token = split[1];
      jwt.verify(token, secret, function(err, decoded) {
        if (err) {
          console.log(err);
          return res.status(403).send({
            success: false,
            message: "Неавторизоавн или просроченный токен!"
          });
        }
        User.findById(decoded.user, (error, user_info) => {
          if (error) throw error;
          res.status(200).json({
            success: true,
            message: "Отправка данных пользователя - ОК",
            user: {
              id: decoded.user,
              number: user_info.number,
              surname: user_info.surname,
              name: user_info.name,
              midname: user_info.midname,
              role: user_info.role,
              email: user_info.email,
              cart: user_info.cart,
              orders: user_info.orders
            }
          });
          // console.log(user);
        });
      });
    } else {
      return res.status(403).send({
        success: false,
        message: "Неавторизоавн или просроченный токен!"
      });
    }
  } else {
    return res.status(403).send({
      success: false,
      message: "Неавторизоавн или просроченный токен!"
    });
  }
};

module.exports = api;
