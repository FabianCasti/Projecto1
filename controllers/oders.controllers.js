const { Orders } = require("../models/orders.models");
const { Meals } = require("../models/meals.models");
const { Restaurants } = require("../models/restaurants.models");

const ordersCreate = async (req, res) => {
  try {
    const meal = await Meals.findOne({
      where: { id: req.body.mealId, status: "active" },
    });
    if (!meal) {
      return res.status(404).json({
        status: "not Found meal",
      });
    }
    const totalPrice = meal.price * req.body.quantity;
    const userId = req.sessionUser.id;

    await Orders.create({
      quantity: req.body.quantity,
      mealId: req.body.mealId,
      userId,
      totalPrice,
      status: "active",
    });

    res.status(201).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
};
const ordersUserAll = async (req, res) => {
  try {
    const ordersUser = await Orders.findAll({
      where: { userId: req.sessionUser.id },
      include: { model: Meals, include: { model: Restaurants } },
    });

    res.status(200).json({
      status: "success",
      data: {
        ordersUser,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
const ordersUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Orders.findOne({ where: { id, status: "active" } });

    if (!order) {
      return res.status(404).json({
        status: "Not found",
      });
    }

    order.update({ status: "completed" });

    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
};
const ordersDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Orders.findOne({ where: { id, status: "active" } });

    if (!order) {
      return res.status(404).json({
        status: "Not found",
      });
    }

    order.update({ status: "cancelled" });

    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  ordersCreate,
  ordersUserAll,
  ordersUpdate,
  ordersDelete,
};
