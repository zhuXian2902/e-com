/** @format */

const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const authController = require('./../controllers/authController');
const orderController = require('./../controllers/orderController');
const userController = require('./../controllers/userController');
const productController = require('./../controllers/productController');

router.use(catchAsync(authController.protect));
router.get('/braintree/gettoken', catchAsync(orderController.checkout));
router.post('/braintree/payment', catchAsync(orderController.payment));

router
	.route('/')
	.get(authController.isAllowed, catchAsync(orderController.getOrder))
	.post(
		catchAsync(userController.addHistory),
		catchAsync(productController.updateDetails),
		catchAsync(orderController.createOrder)
	);

module.exports = router;
