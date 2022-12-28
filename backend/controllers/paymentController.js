const catchAsyncErrors = require("../middleware/catchAsyncError");
const Payment = require("../models/PaymentModel");
//const instance = require("../server");
const crypto = require("crypto");
const Razorpay = require('razorpay');
var instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})
console.log(instance)


exports.checkout = catchAsyncErrors(async (req, res) => {
  var options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
    receipt: "order_rcptid_11"
  };
  const order = await instance.orders.create(options, function (err, order) {
    res.status(200).json({
      success: true,
      order
    })
  });
})



exports.paymentVerification = catchAsyncErrors(async (req, res) => {

  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature
  } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto.createHmac('sha256', 'x4jYXrel58KdiSHNWudhbVyN')
    .update(body.toString())
    .digest('hex');


  const isAuthenticated = expectedSignature === razorpay_signature;

  if (isAuthenticated) {
    await Payment.create({
      razorpay_order_id,  
      razorpay_payment_id,
    razorpay_signature
      
    })
    res.redirect(`http://localhost:3000/success?reference=${razorpay_payment_id}`)
  } else {
    res.status(200).json({
      success: true,
      
     
      
    })
  }
})