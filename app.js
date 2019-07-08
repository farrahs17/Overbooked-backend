const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const sequelize = require("./util/database");
const user = require("./models/User");
const ticket = require("./models/Ticket");
const userRoutes = require("./routes/user");
const ticketRoutes = require("./routes/ticket");

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());

app.use("/api/", userRoutes);
app.use("/api/", ticketRoutes);

sequelize
  .sync()
  .then(result => {
    // console.log(result);
    app.listen(5000);
  })
  .catch(err => console.log(err));
