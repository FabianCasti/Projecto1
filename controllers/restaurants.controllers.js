const { Restaurants } = require("../models/restaurants.models");

const restaurantCreate = async (req, res) => {
  try {
    await Restaurants.create({
      name: req.body.name,
      address: req.body.address,
      rating: req.body.rating,
      status: "active",
    });

    res.status(201).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
};

const restaurantsAll = async (req, res) => {
  try {
    const restaurants = await Restaurants.findAll({
      where: { status: "active" },
    });

    res.status(200).json({
      status: "success",
      data: {
        restaurants,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
const restaurantFind = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurants.findOne({ where: { id } });
    if (!restaurant) {
      return res.status(404).json({
        status: "not Found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        restaurant,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const restaurantsUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurants.findOne({ where: { id } });

    if (!restaurant) {
      return res.status(404).json({
        status: "Not found",
      });
    }

    restaurant.update({ name: req.body.name, address: req.body.address });

    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
};

const restaurantsDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurants.findOne({ where: { id } });
    restaurant.update({ status: "delete" });

    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  restaurantCreate,
  restaurantsAll,
  restaurantFind,
  restaurantsUpdate,
  restaurantsDelete,
};
