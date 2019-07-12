const Sequelize = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();
const sequelize = new Sequelize("postgres", process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
  dialect: "postgres",
  host: "localhost"
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Success!");
  })
  .catch(err => {
    console.log("Unable to connect to the database:", err);
  });

module.exports = sequelize;
