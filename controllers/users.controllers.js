const { Users } = require("../models/users.models");
const { Orders } = require("../models/orders.models");
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");

const signupUser = async (req, res) => {
  try {
   
    const {name,email,password,role}=req.body
    const salt= await bcrypt.genSalt(12)
    hashedPass= await bcrypt.hash(password,salt)
    const newUser=await Users.create({
      name,
      email,
      password:hashedPass,
      role
    });
    newUser.password=undefined

    res.status(201).json({
      status: "success",
      data: newUser
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

    if (!(await bcrypt.compare(req.body.password,user.password))) {
      return res.status(401).json({
        status: "password do not match",
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
    const userUpdated= await user.update({ name: req.body.name, email: req.body.email });
    userUpdated.password=undefined

    res.status(200).json({
      status: "success",
      data: userUpdated
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
    const userDeleted=await user.update({ status: "delete" });
    userDeleted.password=undefined

    res.status(200).json({
      status: "success",
      data: userDeleted
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
