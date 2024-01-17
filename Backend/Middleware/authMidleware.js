const JWT = require("jsonwebtoken");
const userModel = require("../Models/userModel");

const requiresignIn = (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    //esta parte para que pueda pasar al isadmin den
    //necesita el _id por eso rq.user=decode para
    //que tenga ese valor
    req.user = decode;
    //req.user=_id
    // req.user={
    //   _id:"xxx",
    //   name:"xxxx"
    // }
    next();
  } catch (error) {
    console.log(error);
  }
};
const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "No autorizado",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in Admin",
    });
  }
};
module.exports = {
  requiresignIn,
  isAdmin,
};
