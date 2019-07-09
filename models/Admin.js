module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define("admin", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Admin.associate = models => {
    Admin.hasMany(models.Event, {
      as: "Event",
      foreignKey: "admin_id"
    });
  };

  return Admin;
};
