const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const { sequelize } = require("./models");
const Admin = require("./models");
const userRoutes = require("./routes/user");
const eventRoutes = require("./routes/event");
const adminRoutes = require("./routes/admin");
const ticketRoutes = require("./routes/ticket");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function(req, file, cb) {
    cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
  }
});

app.use("/public", express.static(path.join(__dirname, "public")));

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(multer({ storage: storage }).single("image"));

// app.use("/images", express.static(path.join(__dirname, "images")));
app.use(cors());

app.use("/api/", userRoutes);
app.use("/api/", eventRoutes);
app.use("/api/", adminRoutes);
app.use("/api/", ticketRoutes);
sequelize
  .sync({ force: false })
  .then(result => {
    // console.log(result);

    app.listen(8080);
  })
  .catch(err => console.log(err));
