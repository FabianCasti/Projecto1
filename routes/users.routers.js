const express = require("express");
const {
  loginUser,
  signupUser,
  updateUser,
  deleteUser,
  ordersUserAll,
  orderUserFind,
} = require("../controllers/users.controllers");
const { protectSession } = require("../middlewares/auth.middlewares");

const Usersrouters = express.Router();

Usersrouters.post("/signup", signupUser);
Usersrouters.post("/login", loginUser);
Usersrouters.use(protectSession);
Usersrouters.patch("/:id", updateUser);
Usersrouters.delete("/:id", deleteUser);
Usersrouters.get("/orders", ordersUserAll);
Usersrouters.get("/orders/:id", orderUserFind);

module.exports = { Usersrouters };
