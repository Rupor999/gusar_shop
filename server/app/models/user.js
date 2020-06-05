const mongoose = require("mongoose"),
  bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    number: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    surname: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    midname: {
      type: String,
      required: true
    },
    email: {
      type: String
    },
    role: {
      type: String,
      required: true,
      default: "User"
    },
    cart: {
      type: Array,
      default: []
    }
  },
  { versionKey: false }
);

userSchema.pre("save", function(next) {
  const user = this;
  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, (error, salt) => {
      if (error) return next(error);
      bcrypt.hash(user.password, salt, (error, encrypted) => {
        if (error) return next(error);
        user.password = encrypted;
        next();
      });
    });
  } else {
    return next();
  }
});

userSchema.methods.comparePassword = function(password, callback) {
  bcrypt.compare(password, this.password, (error, matches) => {
    if (error) return callback(error);
    callback(null, matches);
  });
};

mongoose.model("User", userSchema);
