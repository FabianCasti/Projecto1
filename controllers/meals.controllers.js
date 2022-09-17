const { Meals } = require("../models/meals.models");
const { Restaurants } = require("../models/restaurants.models");

const mealsCreate = async (req, res) => {
  try {
    const { id } = req.params;
    await Meals.create({
      restaurantId: id,
      name: req.body.name,
      price: req.body.price,
      status: "active",
    });

    res.status(201).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
};

const mealsAll = async (req, res) => {
  try {
    const meals = await Meals.findAll({
      where: { status: "active" },
      include: { model: Restaurants },
    });

    res.status(200).json({
      status: "success",
      data: {
        meals,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const mealsFind = async (req, res) => {
  try {
    const { id } = req.params;

    const meal = await Meals.findOne({
      where: { id },
      include: { model: Restaurants },
    });
    if (!meal) {
      return res.status(404).json({
        status: "not Found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        meal,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const mealsUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const meal = await Meals.findOne({ where: { id } });

    if (!meal) {
      return res.status(404).json({
        status: "Not found",
      });
    }

    meal.update({ name: req.body.name, price: req.body.price });

    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
};

const mealsDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const meal = await Meals.findOne({ where: { id } });
    meal.update({ status: "delete" });

    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  mealsCreate,
  mealsAll,
  mealsFind,
  mealsUpdate,
  mealsDelete,
};
