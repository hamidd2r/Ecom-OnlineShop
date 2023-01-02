const catchAsyncErrors = require("../middleware/catchAsyncError");
const Payment = require("../models/PaymentModel");
//const instance = require("../server");
const crypto = require("crypto");
const Razorpay = require('razorpay');


var instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})



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



//................................................................................................


exports.createEvent = catchAsyncErrors(async (req, res) => {
  
  const { event_type, provider_message, provider_name, status } = req.body.event;


  const orderId = req.params.order_id;

  const order = { 
    order_id: orderId,
    user_id: 'fc741db0a2968c39d9c2a5cc75b05370',
    product_id: 'b31d032cfdcf47a399990a71e43c5d2a',
    price: '20.99',
    amount: '2',
    tax: '3.8',
    total: '45.78',
  };

  
 
  const data = {
    event_type,           // ex: 'fulfilled'
    provider_message,     // ex: 'your order may take two days on the way'
    provider_name,        // ex: 'FedEx'
    status,               // ex: 'safe'
    order,                // the order data
  };


  try {
    const result = await sendWebhookMessage(`order.${event_type}`, data)
    res.status(201).json({ message: 'Event has been created successfully', result })
  } catch (error) {
    console.log(error);
    res.status(error.status).json({ message: error.message });
  }


})
