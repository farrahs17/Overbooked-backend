module.exports = (sequelize, DataTypes) => {
  const TicketType = sequelize.define("ticketType", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.ENUM("Early bird", "Regular", "Vip"),
      allowNull: false
    }
  });

  TicketType.associate = models => {
    TicketType.hasOne(models.Ticket, {
      as: "Ticket",
      foreignKey: "ticket-type_id"
    });
  };
  return TicketType;
};
