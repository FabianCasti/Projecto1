const express = require("express");

//Controllers
const {
  restaurantCreate,
  restaurantsAll,
  restaurantFind,
  restaurantsUpdate,
  restaurantsDelete,
} = require("../controllers/restaurants.controllers");
const{
  createReview,
  updateReview,
  deleteReview
}=require('../controllers/reviews.controller')


//Middlewares
const {
  protectSession,
  protectAdmin,
} = require("../middlewares/auth.middlewares");
const {createRestaurantValidators,createReviewValidators}=require('../middlewares/validators.middleware')

const Restaurantsrouters = express.Router();

Restaurantsrouters.use(protectSession);
Restaurantsrouters.post("/",createRestaurantValidators,restaurantCreate);
Restaurantsrouters.get("/", restaurantsAll);
Restaurantsrouters.get("/:id", restaurantFind);
Restaurantsrouters.patch("/:id", protectAdmin, restaurantsUpdate);
Restaurantsrouters.delete("/:id", protectAdmin, restaurantsDelete);

//Reviews routes
Restaurantsrouters.post("/reviews/:restaurantId",createReviewValidators,createReview);
Restaurantsrouters.patch("/reviews/:id",updateReview);
Restaurantsrouters.delete("/reviews/:id",deleteReview);

module.exports = { Restaurantsrouters };
