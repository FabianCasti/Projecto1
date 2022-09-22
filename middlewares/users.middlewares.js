// Models
const { Users } = require("../models/users.models");

const userExists = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await Users.findOne({ where: { id } });
    req.user = user;
    // If user doesn't exist, send error message
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    // req.anyPropName = 'anyValue'
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};
const validateTokenAndId = (req, res, next) => {
  const { id } = req.params;

// ! agrege el return
  if (!(parseInt(id) === req.sessionUser.id)) {
    return res.status(402).json({
      status: "id from token does not match with id from end point",
    });
  }
  next();
};

module.exports = {
  userExists,validateTokenAndId
};
