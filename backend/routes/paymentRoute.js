const express = require("express");
const {
    checkout,
    paymentVerification,
    createEvent,
    razorpay,
    webmessage,
    getwebhookdata,
    responseweb
} = require("../controllers/paymentController");
const router = express.Router();

router.route('/checkout').post(checkout)
router.route('/paymentverification').post(paymentVerification)
router.route('/razorpay').post(razorpay)
router.route('/getwebhookdata').post(getwebhookdata)
router.route('/responseweb').post(responseweb)
// router.route('https://drab-crow-boot.cyclic.app/event').post(createEvent)
module.exports = router;