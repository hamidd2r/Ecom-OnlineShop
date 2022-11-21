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
  verifyToken
} = require("../middleware/auth");

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/logout").get(isAuthenticatedUser, logout);

router.route("/password/reset/:token").put(resetPassword);

router.route("/me").get(getUserDetails); //    isAuthenticatedUser,

router.route("/password/update").put(updatePassword); //.isAuthenticatedUser,

router.route("/me/update").put(updateProfile);

router.route("/admin/users").get(getAllUser); //.

router.route("/admin/user/:id").get(isAuthenticatedUser, getSingleUser); //.

router.route("/admin/user/:id").put(isAuthenticatedUser, updateUserRole); //.isAuthenticatedUser, authorizedRoles("admin") ,

router.route("/admin/user/:id").delete(isAuthenticatedUser ,deleteUser); //.

// function verifyToken(req, res, next) {
//   let token = req.headers["authorization"];

//   if (token) {
//     token = token.split(" ")[1];
//     Jwt.verify(token, jwtKey, (err, valid) => {
//       if (err) {
//         res.status(401).send({
//           result: "pls provide valid token",
//         });
//       } else {
//         next();
//       }
//     });
//   } else {
//     res.status(403).send({
//       result: "pls add token with header",
//     });
//   }
// }

module.exports = router;