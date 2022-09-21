const express = require("express");
const {
  mealsCreate,
  mealsAll,
  mealsFind,
  mealsUpdate,
  mealsDelete,
} = require("../controllers/meals.controllers");

//Middlewares
const {
  protectSession,
  protectAdmin,
} = require("../middlewares/auth.middlewares");
const {createMealsValidators}=require('../middlewares/validators.middleware');

const Mealsrouters = express.Router();

Mealsrouters.use(protectSession);
Mealsrouters.post("/:id", createMealsValidators,mealsCreate);
Mealsrouters.get("/", mealsAll);
Mealsrouters.get("/:id", mealsFind);
Mealsrouters.patch("/:id",protectAdmin, mealsUpdate);
Mealsrouters.delete("/:id",protectAdmin, mealsDelete);

module.exports = { Mealsrouters };
