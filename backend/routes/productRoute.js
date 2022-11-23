const express = require('express')
const {
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview
} = require('../controllers/productController')
const {
  isAuthenticatedUser,
  authorizedRoles,
  verifyToken,

} = require('../middleware/auth')

const router = express.Router()



router.route('/products').get(getAllProduct)

router
  .route("/admin/product/new")
  .post( createProduct);

router.route('/admin/product/:id').put(verifyToken, updateProduct) //isAuthenticatedUser ,authorizedRoles("admin"),

router.route('/admin/product/:id').delete(verifyToken, deleteProduct) //isAuthenticatedUser ,authorizedRoles("admin"),

router.route('/product/:id').get(getProductDetails)

router.route('/review').put(verifyToken, createProductReview) //isAuthenticatedUser,

router.route('/reviews').get(verifyToken, getProductReviews)

router.route('/reviews/:id').delete(verifyToken, deleteReview) //isAuthenticatedUser ,







module.exports = router