// Models
const { Orders } = require("../models/orders.models");

const orderExists = async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await Orders.findOne({ where: { id } });
    req.order = order;
    // If order doesn't exist, send error message
    if (!order) {
      return res.status(404).json({
        status: "error",
        message: "order not found",
      });
    }

    // req.anyPropName = 'anyValue'
    req.order = order;
    next();
  } catch (error) {
    console.log(error);
  }
};

const validateTokenAndUser = (req, res, next) => {

  //Validar que el dueño del token sea el creador del review
  const {userId}=req.order

  if (!(parseInt(userId) === req.sessionUser.id)) {
    res.status(402).json({
      status: "You are not the owner of the order",
    });
  }
  next();
};

module.exports = {
    orderExists,validateTokenAndUser
  };