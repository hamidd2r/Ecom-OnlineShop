const catchAsyncErrors = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const getJWTToken = require("../models/userModel");
const getResetPasswordToken = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const Jwt = require('jsonwebtoken')
const jwtKey = 'e-comm'
const ErrorHander = require("../utils/errorhandler");
const crypto = require('crypto');


// register.........................................................
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  // const user = new User(req.body)

  User.findOne({
    email: req.body.email,
  }).exec((error, user) => {
    if (user)
      return res.status(400).json({
        message: "user already registered",
      });
  })
  const {
    name,
    email,
    password
  } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is simple id ",
      url: "profilePicUrl",
    },
  });

  const result = await user.save();

  Jwt.sign({
    result
  }, jwtKey, {
    expiresIn: "2h"
  }, (err, token) => {
    if (err) {
      res.send({
        result: 'something went wrong pls try after sometime'
      })
    }
    res.send({
      result,
      auth: token
    })
  })
});

// login user....................................................

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  // const user = new User(req.body);
  const {
    email,
    password
  } = req.body;
  if ((!email || !password)) {
    return next(new ErrorHander("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({
    email
  }).select("+password");

  if (!user) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Invalid email or password", 401));
  }


  if (user) {
    Jwt.sign({
      user
    }, jwtKey, {
      expiresIn: "2h"
    }, (err, token) => {
      if (err) {
        res.send({
          result: 'something went wrong pls try after sometime'
        })
      }
      res.send({
        user,
        auth: token
      })
    })
  } else {
    res.send({
      result: 'No User '
    })
  }
})

// logout..................................................

exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "logged out",
  });
});

// forgot password....................................

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({
    email: req.body.email
  });

  if (!user) {
    return next(new ErrorHander("user not found ", 404));
  }

  // reset password password token..........................................

  const resetToken = user.getResetPasswordToken()


  await user.save({
    validateBeforeSave: false
  });

  const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
  // const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;

  const message = `your password reset token is : - \n \n ${resetPasswordUrl} \n \nIf you have not requested then ignore it ! `;

  try {
    await sendEmail({
      email: user.email,
      subject: `ecommerce web password recovery`,
      message: message,
    });
    res.status(200).json({
      success: true,
      message: `email send to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({
      validateBeforeSave: false
    });
    return next(new ErrorHander(error.message, 500));
  }
});

 


// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: {
      $gt: Date.now()
    },
  });

  if (!user) {
    return next(
      new ErrorHander(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHander("Password does not password", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  

  await user.save();
  sendToken(user, 200, res);
});

// get user details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {


  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});



// update user passwod...

exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");


  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHander("password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();
  sendToken(user, 201, res);
});


// update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };
  //user.id
  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
});



// get all users -Admin

exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  if (!users) {
    return next(
      new ErrorHander(`user dont exit with id ${req.params.id}`)
    )
  }

  res.status(200).json({
    success: true,
    users,
  });
});


// get single users -Admin

exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHander(`user dont exit with id ${req.params.id}`)
    )
  }

  res.status(200).json({
    success: true,
    user
  })
})


// update User Role -- Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };



  await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});


// Delete User --Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }
  await user.remove();

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});