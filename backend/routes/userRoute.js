const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");
const router = express.Router();
const {
  isAuthenticatedUser,
  authorizedRoles,
  verifyToken,
  
} = require("../middleware/auth");

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(verifyToken, forgotPassword);

router.route("/logout").get(verifyToken,isAuthenticatedUser, logout);

router.route("/password/reset/:token").put(verifyToken,resetPassword);

router.route("/me").get(verifyToken,getUserDetails); //    isAuthenticatedUser,

router.route("/password/update").put(verifyToken,updatePassword); //.isAuthenticatedUser,

router.route("/me/update").put(verifyToken,updateProfile);

router.route("/admin/users").get(verifyToken,getAllUser); //.

router.route("/admin/user/:id").get(verifyToken,isAuthenticatedUser, getSingleUser); //.

router.route("/admin/user/:id").put(verifyToken,isAuthenticatedUser, updateUserRole); //.isAuthenticatedUser, authorizedRoles("admin") ,

router.route("/admin/user/:id").delete(verifyToken,isAuthenticatedUser ,deleteUser); //.


module.exports = router;