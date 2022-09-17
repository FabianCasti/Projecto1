const express = require("express");
const {
  mealsCreate,
  mealsAll,
  mealsFind,
  mealsUpdate,
  mealsDelete,
} = require("../controllers/meals.controllers");
const {
  protectSession,
  protectAdmin,
} = require("../middlewares/auth.middlewares");

const Mealsrouters = express.Router();

Mealsrouters.use(protectSession);
Mealsrouters.post("/:id", mealsCreate);
Mealsrouters.get("/", mealsAll);
Mealsrouters.get("/:id", mealsFind);
Mealsrouters.patch("/:id",protectAdmin, mealsUpdate);
Mealsrouters.delete("/:id",protectAdmin, mealsDelete);

module.exports = { Mealsrouters };
