const Order = require('../models/OrderModel')
const errorHandler = require("../utils/errorhandler");
const Product = require("../models/productModel");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const { default: mongoose } = require('mongoose');



// create order 
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const order = new Order({
    _id:mongoose.Types.ObjectId(),
    city:req.body.city,
    shippingInfo:req.body.shippingInfo,
    orderItems:req.body.orderItems,
    paymentInfo:req.body.paymentInfo,
    itemsPrice:req.body.itemsPrice,
    taxPrice:req.body.taxPrice,
    shippingPrice:req.body.shippingPrice,
    totalPrice:req.body.totalPrice,
    orderStatus:req.body.orderStatus, 
    deliveredAt:req.body.deliveredAt,
  
  });
 
  if (!order) {
    return next(new errorHandler("Order not found with this Id", 404));
  }

  order.save().then(result=>{
    
   res.status(201).json(result)
  })
  .catch(err =>{
    console.log(err)
    res.status(500).json({
      error:err
    })
  })


  

}) 



// get Single Order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
  
    if (!order) {
      return next(new errorHandler("Order not found with this Id", 404));
    }
  
    res.status(200).json({
      success: true,
      order,
    });
  });
  


  // get logged in user  Orders
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.body.id });
  
    res.status(200).json({
      success: true,
      orders,
    });
  });





    // get all Orders
exports.getAllOrder = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;
  orders.forEach((order)=>{
    totalAmount += order.totalPrice;
  })

  res.status(200).json({
    success: true,
    orders,
    totalAmount,
  });
});



   // update Order Status -- Admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new errorHandler("Order not found with this Id", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new errorHandler("You have already delivered this order", 400));
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
  }
  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });  
  res.status(200).json({
    success: true,
    order,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.Stock -= quantity;

  await product.save({ validateBeforeSave: false });
}


// delete Order -- Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new errorHandler("Order not found with this Id", 404));
  }

  await order.deleteOne();

  res.status(200).json({
    success: true,
  });
});