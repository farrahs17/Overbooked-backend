const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const models = require("../models");
const User = models.User;
const Admin = models.Admin;

exports.signUp = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed.");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const { email, password, username } = req.body;
  User.findOne({ where: { email } }).then(user => {
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    bcrypt
      .hash(password, 12)
      .then(hashedPassword => {
        const user = new User({
          username,
          email,
          password: hashedPassword
        });
        return user.save();
      })
      .then(result => {
        res
          .status(200)
          .json({ message: "User created!", userId: result.userId });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  });
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  let loadedUser;

  User.findOne({ where: { email } })
    .then(user => {
      if (!user) {
        return res.status(401).json({ message: "User doesn't exist" });
      }

      bcrypt.compare(password, user.password).then(isEqual => {
        if (!isEqual) {
          return res.status(401).json({ message: "Incorrect password" });
        }

        const token = jwt.sign(
          {
            email: user.email,
            userId: user.id
          },
          "salmawalidhefnawy94",
          { expiresIn: "1h" }
        );
        res.status(200).json({
          token: token,
          userId: user.id
        });
      });
    })

    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
exports.getUsers = (req, res, next) => {
  User.findAll()
    .then(users => {
      console.log(users);
      res.status(200).json({
        users
      });
    })
    .catch(err => {
      res.status(400).json({ message: "no users found" });
      console.log(err);
    });
};
