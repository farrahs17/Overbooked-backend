module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define("ticket", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  });

  Ticket.associate = models => {
    Ticket.belongsTo(models.TicketType, {
      as: "TicketType",
      foreignKey: "ticket-type_id"
    });
  };

  Ticket.associate = models => {
    Ticket.belongsTo(models.Event, {
      as: "Event",
      foreignKey: "event_id"
    });
  };

  Ticket.associate = models => {
    Ticket.belongsToMany(models.User, {
      through: models.userTicket_rel,
      as: "User",
      foreignKey: "ticket_id"
    });
  };
  return Ticket;
};
