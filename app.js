const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const sequelize = require("./util/database");
const user = require("./models/User");
const userRoutes = require("./routes/user");

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());

app.use("/api/", userRoutes);

sequelize
  .sync()
  .then(result => {
    // console.log(result);
    app.listen(3000);
  })
  .catch(err => console.log(err));
