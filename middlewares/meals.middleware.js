// Models
const { Meals } = require("../models/meals.models");

const mealExists = async (req, res, next) => {
  try {
    const { id } = req.params;

    const meal = await Meals.findOne({ where: { id } });
    req.meal = meal;
    // If meal doesn't exist, send error message
    if (!meal) {
      return res.status(404).json({
        status: "error",
        message: "meal not found",
      });
    }

    // req.anyPropName = 'anyValue'
    req.meal = meal;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
    mealExists,
  };