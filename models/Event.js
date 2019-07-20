module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define("event", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.ENUM(
        "Arts",
        "Business",
        "Fashion",
        "Music",
        "Sports",
        "Cinema"
      ),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    startsAt: {
      type: DataTypes.DATE
    },
    endsAt: {
      type: DataTypes.DATE
    }
  });
  Event.associate = models => {
    Event.hasMany(models.Agenda, {
      foreignKey: "event_id"
    });
    Event.hasMany(models.Ticket, {
      foreignKey: "event_id"
    });
    Event.belongsTo(models.Admin, {
      as: "Admin",
      foreignKey: "admin_id"
    });
  };
  return Event;
};
