const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const { sequelize } = require("./models");

const userRoutes = require("./routes/user");
const eventRoutes = require("./routes/event");

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());

app.use("/api/", userRoutes);
app.use("/api/", eventRoutes);

sequelize
  .sync({ force: true })
  .then(result => {
    // console.log(result);
    app.listen(3000);
  })
  .catch(err => console.log(err));
