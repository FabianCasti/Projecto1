// Models
const { Reviews } = require("../models/reviews.models");

const  reviewsExists= async (req, res, next) => {
  try {
    const { id } = req.params;

    const reviews = await Reviews.findOne({ where: { id } });
    req.reviews = reviews;
    // If reviews doesn't exist, send error message
    if (!reviews) {
      return res.status(404).json({
        status: "error",
        message: "reviews not found",
      });
    }

    // req.anyPropName = 'anyValue'
    req.reviews = reviews;
    next();
  } catch (error) {
    console.log(error);
  }
};

const validateTokenAndUser = (req, res, next) => {

  //Validar que el dueño del token sea el creador del review
  const {userId}=req.reviews

  if (!(parseInt(userId) === req.sessionUser.id)) {
    res.status(402).json({
      status: "You are not the owner of the review",
    });
  }
  next();
};

module.exports = {
    reviewsExists,validateTokenAndUser
  };