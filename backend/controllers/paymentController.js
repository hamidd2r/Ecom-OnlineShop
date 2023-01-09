const catchAsyncErrors = require("../middleware/catchAsyncError");
const Payment = require("../models/PaymentModel");
const orders = require("../models/OrderModel");
//const instance = require("../server");
const crypto = require("crypto");
const shortid = require('shortid')
const fs = require('fs')
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


//
// exports.webmessage = catchAsyncErrors(async (req, res) => {

//   const postData = req.query;
//   const userData = {
//     "name":postData.name,
//     "email":postData.email
//   }
//   console.log(userData);
//   res.status(200).json({
//     userData
//   })
// })



//

//


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
    res.redirect(`https://drab-crow-boot.cyclic.app/success?reference=${razorpay_payment_id}`)
  } else {
    res.status(200).json({
      success: true,



    })
  }
})


//......................
exports.razorpay = catchAsyncErrors(async (req, res) => {
  const payment_capture = 1
  const amount = 499
  const currency = 'INR'

  const options = {
    amount: amount * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture
  }


  try {
    const response = await instance.orders.create(options)
    console.log(response)
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount
    })

  } catch (error) {
    console.log(error)
  }


})
//..........................................



exports.getwebhookdata = catchAsyncErrors(async (req, res) => {
  // do a validation
  const secret = 'allah123'

  console.log(req.body)

  const crypto = require('crypto')

  const shasum = crypto.createHmac('sha256', secret)
  shasum.update(JSON.stringify(req.body))
  const digest = shasum.digest('hex')


  console.log(digest, req.headers['x-razorpay-signature'])

  if (digest === req.headers['x-razorpay-signature']) {
    console.log('request is legit')
    // process it
    require('fs').writeFileSync('juli.json', JSON.stringify(req.body, null, 4))
  } else {
    // pass it
  }
  res.json({
    status: 'ok'
  })

})


exports.responseweb = catchAsyncErrors(async (req, res) => {
  // STEP 1:
  const {
    amount,
    currency,
    receipt,
    notes
  } = req.body;

  // STEP 2:    
  options.instance.create({
      amount,
      currency,
      receipt,
      notes
    },
    (err, order) => {

      //STEP 3 & 4: 
      if (!err)
        res.json(order)
      else
        res.send(err);
    }
  )

})