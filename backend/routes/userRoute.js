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

router.route("/login").post( loginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/logout").get(logout);

router.route("/password/reset/:token").put(resetPassword);

router.route("/me/:id").get(getUserDetails); //    isAuthenticatedUser,

router.route("/password/update").put(updatePassword); //.isAuthenticatedUser,

router.route("/me/update/:id").put(updateProfile);

router.route("/admin/users").get(getAllUser); //.

router.route("/admin/user/:id").get(getSingleUser); //.

router.route("/admin/user/:id").put(updateUserRole); //.isAuthenticatedUser, authorizedRoles("admin") ,

router.route("/admin/user/:id").delete(deleteUser); //.


module.exports = router;