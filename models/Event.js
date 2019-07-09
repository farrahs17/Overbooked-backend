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
        "Arts & Theater",
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
      type: DataTypes.DATE,
      allowNull: false
    },
    endsAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });
  Event.associate = models => {
    Event.hasMany(models.Agenda, {
      as: "Agenda",
      foreignKey: "event_id"
    });
  };

  Event.associate = models => {
    Event.hasMany(models.Ticket, {
      as: "Ticket",
      foreignKey: "event_id"
    });
  };

  Event.associate = models => {
    Event.belongsTo(models.Admin, {
      as: "Admin",
      foreignKey: "admin_id"
    });
  };
  return Event;
};
