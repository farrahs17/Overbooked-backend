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

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(multer().single("image"));
app.use(cors());

app.use("/api/", userRoutes);
app.use("/api/", eventRoutes);
app.use("/api/", adminRoutes);
app.use("/api/", ticketRoutes);
sequelize
  .sync({ force: true })
  .then(result => {
    // console.log(result);

    app.listen(8080);
  })
  .catch(err => console.log(err));
