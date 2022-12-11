const ErrorHander = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncError");
const Jwt = require('jsonwebtoken')
const jwtKey = 'e-comm'

const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;
  
    if (!token) {
    //   return next(new ErrorHander("Please Login to access this resource", 401));
    return next(new ErrorHander("Please Login to access this resource", 401));
    }
  
    const decodedData = Jwt.verify(token, process.env.JWT_SECRET);
  
    req.user = await User.findById(decodedData.id);
  
    next();
  });
  
  exports.authorizedRoles = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(
          new ErrorHander(
            `Role: ${req.user.role} is not allowed to access this resouce `,
            403
          )
        );
      }
  
      next();
    }; 
  }; 




  exports.verifyToken = (req, res, next) => {
    
    let token = req.headers["authorization"];
  
    if (token) {
      token = token.split(" ")[1];
      Jwt.verify(token, jwtKey, (err, valid) => {
        if (err) {
          res.status(401).send({
            result: "pls provide valid token",
          });
        } else {
          next();
        } 
      });
    } else {
      res.status(403).send({
        result: "pls add token with header",
      });
    }
  }