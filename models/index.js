const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const models = {
  User: sequelize.import("./User.js"),
  Event: sequelize.import("./Event.js"),
  Admin: sequelize.import("./Admin.js"),
  Agenda: sequelize.import("./Agenda.js"),
  TicketType: sequelize.import("./TicketType.js"),
  Ticket: sequelize.import("./Ticket.js"),
  userTicket_rel: sequelize.import("./user-ticket_rel.js")
};

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
