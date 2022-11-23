const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const router = express.Router();
const {
  isAuthenticatedUser,
  authorizedRoles,
  verifyToken
} = require("../middleware/auth");

router.route("/order/new").post(verifyToken, newOrder); //isAuthenticatedUser
router.route("/order/:id").get(verifyToken,getSingleOrder); //isAuthenticatedUser , authorizedRoles("admin") ,

router.route("/orders/me").get(verifyToken,myOrders); //isAuthenticatedUser

router.route("/admin/orders").get(verifyToken,getAllOrder); //isAuthenticatedUser , authorizedRoles("admin") ,
router.route("/admin/order/:id").put(verifyToken,updateOrder); //isAuthenticatedUser , authorizedRoles("admin") ,
router.route("/admin/order/:id").delete(verifyToken,deleteOrder); //isAuthenticatedUser , authorizedRoles("admin") ,

module.exports = router;