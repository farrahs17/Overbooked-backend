const models = require("../models");
const Admin = models.Admin;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  let loadedAdmin;

  Admin.findOne({
    where: { email }
  }).then(admin => {
    if (!admin) {
      return res.status(401).json({ message: "User not authorized" });
    }
    console.log(admin);
    loadedAdmin = admin;

    bcrypt.compare(password, loadedAdmin.password).then(isEqual => {
      if (!isEqual) {
        return res.status(401).json({ message: "Incorrect password" });
      }

      console.log("loggedin!");
      const token = jwt.sign(
        {
          email: loadedAdmin.email,
          adminId: loadedAdmin.id.toString(),
          isAdmin: true
        },
        "6vz2qBLRAQ4EyQS",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        adminId: loadedAdmin.id.toString(),
        username: loadedAdmin.username
      });
    });
  });
};
