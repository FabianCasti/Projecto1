// Models

const { Meals } = require("../models/meals.models");
const { Orders } = require("../models/orders.models");
const { Restaurants } = require("../models/restaurants.models");
const { Reviews } = require("../models/reviews.models");
const { Users } = require("../models/users.models");

const initModels = () => {
	
  // 1 Restaurant <----> M Reviews
  Restaurants.hasMany(Reviews, { foreignKey: "restaurantId" });
  Reviews.belongsTo(Restaurants);

  // 1 Restaurant <----> M Meals
  Restaurants.hasMany(Meals, { foreignKey: "restaurantId" });
  Meals.belongsTo(Restaurants);

  // 1 Meal <----> 1 Order
  Meals.hasOne(Orders, { foreignKey: "mealId" });
  Orders.belongsTo(Meals);

  // 1 User <----> M Order
  Users.hasMany(Orders, { foreignKey: "userId" });
  Orders.belongsTo(Users);

  // 1 User <----> M Reviews
  Users.hasMany(Reviews, { foreignKey: "userId" });
  Reviews.belongsTo(Users);
  

};

module.exports = { initModels };
