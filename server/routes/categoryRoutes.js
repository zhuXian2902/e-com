/** @format */

const express = require('express');
const categoryController = require('./../controllers/categoryController');
const authController = require('../controllers/authController');
const catchAsync = require('../utils/catchAsync');

const router = express.Router();

router.get('/', catchAsync(categoryController.getAllCategory));

router.post(
	'/',
	catchAsync(authController.protect),
	catchAsync(authController.isAllowed),
	catchAsync(categoryController.createCategory)
);

router.get('/:cid', catchAsync(categoryController.getCategory));

router
	.route('/:cid/:id')
	.patch(
		catchAsync(authController.protect),
		catchAsync(authController.isAllowed),
		catchAsync(categoryController.updateCategory)
	)
	.delete(
		catchAsync(authController.protect),
		catchAsync(authController.isAllowed),
		catchAsync(categoryController.deleteCategory)
	);

module.exports = router;
