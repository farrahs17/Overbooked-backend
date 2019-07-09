const Sequelize = require("sequelize");

const sequelize = new Sequelize("postgres", "postgres", "010elemnop", {
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
