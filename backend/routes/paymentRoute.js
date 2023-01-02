const express = require("express");
const { checkout, paymentVerification, createEvent } = require("../controllers/paymentController");
const router = express.Router();

router.route('/checkout').post(checkout)
router.route('/paymentverification').post(paymentVerification)
router.route('https://drab-crow-boot.cyclic.app/event').post(createEvent)
module.exports = router;