const { Users } = require("../models/users.models");
const { Orders } = require("../models/orders.models");
const jwt = require("jsonwebtoken");
const signupUser = async (req, res) => {
  try {
    await Users.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      status: "active",
      role: "normal",
    });

    res.status(201).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
};
const loginUser = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: { status: "active", email: req.body.email },
    });

    if (!user) {
      return res.status(401).json({
        status: "error",
      });
    }

    if (user.password !== req.body.password) {
      return res.status(401).json({
        status: "error",
      });
    }

    const token = jwt.sign({ id: user.id }, "fabiancp", {
      expiresIn: "30d",
    });

    res.status(200).json({
      status: "success",
      data: {
        token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({
        status: "not Found",
      });
    }
    user.update({ name: req.body.name, email: req.body.email });

    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
};
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({
        status: "not Found",
      });
    }
    user.update({ status: "delete" });

    res.status(200).json({
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
const orderUserFind = async (req, res) => {
  try {
    const { id } = req.params;
    const orderUser = await Orders.findOne({
      where: { id, userId: req.sessionUser.id },
    });
    if (!orderUser) {
      return res.status(404).json({
        status: "not Found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        orderUser,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  loginUser,
  signupUser,
  updateUser,
  deleteUser,
  ordersUserAll,
  orderUserFind
};
