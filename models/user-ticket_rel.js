module.exports = (sequelize, DataTypes) => {
  const userTicket_rel = sequelize.define("user-ticket_rel", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return userTicket_rel;
};
