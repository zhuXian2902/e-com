/** @format */

const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const catchAsync = require('./../utils/catchAsync');

const router = express.Router();

router.get(
	'/profile',
	catchAsync(authController.protect),
	userController.getMe,
	catchAsync(userController.getUser)
);

router.post('/signup', catchAsync(authController.signup));
router.post('/authenticate', catchAsync(authController.authenticate));
router.post('/login', catchAsync(authController.login));
router.post('/forgotPassword', catchAsync(authController.forgotPassword));
router.post('/resetPassword', catchAsync(authController.resetPassword));

router.patch(
	'/update-profile',
	catchAsync(authController.protect),
	userController.uploadImage,
	catchAsync(userController.manageImage),
	catchAsync(userController.updateProfile)
);

router.use(
	catchAsync(authController.protect),
	catchAsync(authController.isAdmin)
);

router
	.route('/')
	.get(catchAsync(userController.getAllUsers))
	.post(catchAsync(userController.createUser));

router
	.route('/:id')
	.get(catchAsync(userController.getUser))
	.patch(catchAsync(userController.updateUser))
	.delete(catchAsync(userController.deleteUser));

module.exports = router;
