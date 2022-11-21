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
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");

router.route("/order/new").post(newOrder); //isAuthenticatedUser
router.route("/order/:id").get(getSingleOrder); //isAuthenticatedUser , authorizedRoles("admin") ,

router.route("/orders/me").get(myOrders); //isAuthenticatedUser

router.route("/admin/orders").get(getAllOrder); //isAuthenticatedUser , authorizedRoles("admin") ,
router.route("/admin/order/:id").put(updateOrder); //isAuthenticatedUser , authorizedRoles("admin") ,
router.route("/admin/order/:id").delete(deleteOrder); //isAuthenticatedUser , authorizedRoles("admin") ,

module.exports = router;
