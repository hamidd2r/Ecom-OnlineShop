const express = require('express')
const {
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts
} = require('../controllers/productController')
const {
  isAuthenticatedUser,
  authorizedRoles,
  verifyToken,

} = require('../middleware/auth')

const router = express.Router()



router.route('/products').get(getAllProduct)

router.route('/admin/products').get(getAdminProducts)

router
  .route("/admin/product/new")
  .post( createProduct);

router.route('/admin/product/:id').put(updateProduct) //isAuthenticatedUser ,authorizedRoles("admin"),

router.route('/admin/product/:id').delete(deleteProduct) //isAuthenticatedUser ,authorizedRoles("admin"),

router.route('/product/:id').get(getProductDetails)

router.route('/review').put( createProductReview) //isAuthenticatedUser,

router.route('/reviews').get( getProductReviews)

router.route('/reviews/:id').delete( deleteReview) //isAuthenticatedUser ,







module.exports = router