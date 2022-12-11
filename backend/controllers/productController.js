const errorHandler = require("../utils/errorhandler");
const Product = require("../models/productModel");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ApiFreatures = require("../utils/apifeatures");
const cloudinary = require('cloudinary')

// 1.create product Admin..........................
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.body.id;
  const product = await Product.create(req.body);
  res.status(200).json({
    success: true,
    product,
  });
});

// 2.Get All Product...............................
exports.getAllProduct = catchAsyncErrors(async (req, res) => {
  

  const resultPerPage = 8
  const productsCount = await Product.countDocuments()

  const ApiFreature = new ApiFreatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage)

  const products = await ApiFreature.query
  if (!products) {
    return res.status(500).json({
      success: false,
      message: "product not found",
    });
  } else {
    return res.status(200).json({
      success: true,
      products,
      productsCount,
      resultPerPage,
    });
  }
});


// get all product admin...
exports.getAdminProducts = catchAsyncErrors(async (req, res) => {
  
const products = await Product.find()



  if (!products) {
    return res.status(500).json({
      success: false,
      message: "product not found",
    });
  } else {
    return res.status(200).json({
      success: true,
      products,
    
    });
  }
});
//

// 3.get single product.................................

exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new errorHandler("product not found", 404));
    // change total this line solve error
  }

  res.status(200).json({
    success: true,
    product,
    // productCount
  });
});

// Update Product.................................Admin

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new errorHandler("product not found", 404))
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// delete product......................................

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new errorHandler("product not found ", 404))
  }
  await product.deleteOne();
  res.status(201).json({
    success: true,
    message: "delete product",
  });

});

// ................................................


// Create New Review or Update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const {
    rating,
    comment,
    productId
  } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({
    validateBeforeSave: false
  });

  res.status(200).json({
    success: true,
  });
});


//......................................................

// Get All Reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new errorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});
//......................................

// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new errorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  // let ratings = 0;

  // if (reviews.length === 0) {
  //   ratings = 0;
  // } else {
  //   ratings = avg / reviews.length;
  // }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId, {
      reviews,
      ratings,
      numOfReviews,
    }, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});