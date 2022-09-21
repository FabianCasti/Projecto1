// Models
const { Restaurants } = require("../models/restaurants.models")

const restaurantExists = async (req, res, next) => {
  try {
    const { id } = req.params;

    const restaurant = await Restaurants.findOne({ where: { id } });
    req.restaurant = restaurant;
    // If restaurant doesn't exist, send error message
    if (!restaurant) {
      return res.status(404).json({
        status: "error",
        message: "restaurant not found",
      });
    }

    // req.anyPropName = 'anyValue'
    req.restaurant = restaurant;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
    restaurantExists,
  };