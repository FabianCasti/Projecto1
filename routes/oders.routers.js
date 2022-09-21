const express = require("express");
const {
  ordersCreate,
  ordersUserAll,
  ordersUpdate,
  ordersDelete,
} = require("../controllers/oders.controllers");

//Middlewares
const { protectSession } = require("../middlewares/auth.middlewares");
const {createOrdersValidators}=require('../middlewares/validators.middleware');

const Ordersrouters = express.Router();

Ordersrouters.use(protectSession);
Ordersrouters.post("/", createOrdersValidators,ordersCreate);
Ordersrouters.get("/me", ordersUserAll);
Ordersrouters.patch("/:id", ordersUpdate);
Ordersrouters.delete("/:id", ordersDelete);

module.exports = { Ordersrouters };
