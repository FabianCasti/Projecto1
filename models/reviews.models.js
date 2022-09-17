const { db, DataTypes } = require("../utils/database.utils");

const Reviews = db.define("Reviews", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
 
  userId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  restaurantid: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  rating: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "active",
  },
});

module.exports = { Reviews };
