/** @format */

const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');
const catchAsync = require('../utils/catchAsync');
const router = express.Router({ mergeParams: true });

router.get('/ratings', catchAsync(reviewController.ratingsAverage));

router
	.route('/')
	.get(catchAsync(reviewController.getAllReviews))
	.post(
		catchAsync(authController.protect),
		catchAsync(reviewController.createReview)
	);

router.use(authController.protect);
router
	.route('/:id')
	.get(reviewController.getReview)
	.patch(reviewController.updateReview)
	.delete(reviewController.deleteReview);

module.exports = router;
