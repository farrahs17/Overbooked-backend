module.exports = (sequelize, DataTypes) => {
  const Agenda = sequelize.define("agenda", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    Desc: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Time: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });
  Agenda.associate = models => {
    Agenda.belongsTo(models.Event, {
      as: "Event",
      foreignKey: "event_id"
    });
  };
  return Agenda;
};
