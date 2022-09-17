const { db, DataTypes } = require("../utils/database.utils");

const Users = db.define("Users", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "active",
  },
  role: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "normal",
  },
});

module.exports = { Users };
