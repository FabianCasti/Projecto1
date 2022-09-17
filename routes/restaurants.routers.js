const express = require("express");
const {
  restaurantCreate,
  restaurantsAll,
  restaurantFind,
  restaurantsUpdate,
  restaurantsDelete,
} = require("../controllers/restaurants.controllers");
const {
  protectSession,
  protectAdmin,
} = require("../middlewares/auth.middlewares");

const Restaurantsrouters = express.Router();

Restaurantsrouters.use(protectSession);
Restaurantsrouters.post("/", restaurantCreate);
Restaurantsrouters.get("/", restaurantsAll);
Restaurantsrouters.get("/:id", restaurantFind);
Restaurantsrouters.patch("/:id", protectAdmin, restaurantsUpdate);
Restaurantsrouters.delete("/:id", protectAdmin, restaurantsDelete);

module.exports = { Restaurantsrouters };
