/** @format */

const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const catchAsync = require('../utils/catchAsync');

const router = express.Router();

router.post('/signup', catchAsync(authController.signup));
router.post('/authenticate', catchAsync(authController.authenticate));
router.post('/login', catchAsync(authController.login));
router.post('/forgotPassword', catchAsync(authController.forgotPassword));
router.post('/resetPassword', catchAsync(authController.resetPassword));

router.use(catchAsync(authController.protect));

router.get(
	'/profile',
	userController.getMe,
	catchAsync(userController.getUser)
);

router.patch(
	'/updateProfile',
	userController.uploadImage,
	catchAsync(userController.manageImage),
	catchAsync(userController.updateProfile)
);

router.patch('/updatePassword', catchAsync(authController.updatePassword));
router.get('/history', catchAsync(userController.getHistory));

router.use(catchAsync(authController.isAdmin));

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
