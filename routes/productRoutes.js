/** @format */

const express = require('express');
const productController = require('./../controllers/productController');
const userController = require('./../controllers/userController');
const reviewRouter = require('./reviewRoutes');
const authController = require('./../controllers/authController');
const catchAsync = require('./../utils/catchAsync');

const router = express.Router();

router.use('/:pid/reviews', reviewRouter);
router.param('pid', productController.productInfo);

router.route('/products-stats').get(catchAsync(productController.productStats));

router
	.route('/similar-products/:pid')
	.get(
		catchAsync(productController.similarProducts),
		catchAsync(productController.getAllProducts)
	);

router
	.route('/available-category')
	.get(catchAsync(productController.availableCategories));

router
	.route('/')
	.get(catchAsync(productController.getAllProducts))
	.post(
		catchAsync(authController.protect),
		authController.isAllowed,
		productController.uploadImage,
		catchAsync(productController.manageImage),
		catchAsync(productController.createProduct)
	);

// router.use('/:pid', catchAsync(productController.getProduct));

router
	.route('/:pid')
	.get(productController.getProduct)
	.patch(
		catchAsync(authController.protect),
		authController.isAllowed,
		productController.uploadImage,
		catchAsync(productController.manageImage),
		catchAsync(productController.updateProduct)
	)
	.delete(
		catchAsync(authController.protect),
		authController.isAllowed,
		catchAsync(productController.deleteProduct)
	);

module.exports = router;
