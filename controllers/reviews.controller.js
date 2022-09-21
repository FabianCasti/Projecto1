const { Reviews } = require("../models/reviews.models");

const createReview = async (req, res) => {
  const { restaurantId } = req.params;
  const { userId, rating, comment } = req.body;
  try {
    const newReview = await Reviews.create({
      userId, //Must to come from token
      restaurantId,
      rating,
      comment,
    });
    res.status(202).json({
      status: "Success",
      data: newReview,
    });
  } catch (error) {
    console.log(error);
  }
};
const updateReview = async (req, res) => {
  const { rating, comment } = req.body;
  try {
    const{id}=req.params
    const reviewToUpdate=await Reviews.findOne({where:{id}})
    const updatedReview = await reviewToUpdate.update({ rating, comment });
    res.status(202).json({
      status: "Success",
      data: updatedReview,
    });
  } catch (error) {
    console.log(error);
  }
};
const deleteReview = async (req, res) => {
  try {
    const {id}=req.params
    const ReviewToDelete=await Reviews.findOne({where:{id}})
    await ReviewToDelete.update({ status: "deleted" });
    res.status(202).json({
      status: "Review has been deleted",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createReview, updateReview, deleteReview };
