const express = require("express");
const {
  ordersCreate,
  ordersUserAll,
  ordersUpdate,
  ordersDelete,
} = require("../controllers/oders.controllers");
const { protectSession } = require("../middlewares/auth.middlewares");

const Ordersrouters = express.Router();

Ordersrouters.use(protectSession);
Ordersrouters.post("/", ordersCreate);
Ordersrouters.get("/me", ordersUserAll);
Ordersrouters.patch("/:id", ordersUpdate);
Ordersrouters.delete("/:id", ordersDelete);

module.exports = { Ordersrouters };
