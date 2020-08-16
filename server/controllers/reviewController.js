/** @format */

const Review = require('./../models/reviewModel');
const AllError = require('./../utils/error');
const mongoose = require('mongoose');

exports.ratingsAverage = async (req, res, next) => {
	let pid = mongoose.Types.ObjectId(req.params.pid);
	console.log(pid);
	const stats = await Review.aggregate([
		{
			$match: { product: pid },
		},
		{
			$group: {
				_id: '$product',
				num: { $sum: 1 },
				avgRating: { $avg: '$rating' },
			},
		},
	]);
	console.log(stats);
	res.status(200).json({
		status: 'success',
		stats,
	});
};

exports.getAllReviews = async (req, res, next) => {
	let filter = {};
	if (req.params.pid) filter = { product: req.params.pid };
	const data = await Review.find(filter).populate('user'); //.populate('product');

	res.status(200).json({
		status: 'success',
		// size: data.length ? data.length : 0,
		data,
	});
};

exports.createReview = async (req, res, next) => {
	console.log(req.body);
	req.body.product = req.params.pid;
	req.body.user = req.user.id;
	const data = await Review.create(req.body);
	res.status(201).json({
		status: 'success',
		data,
	});
};

exports.getReview = async (req, res, next) => {
	const review = await Review.findById(req.params.rid);
	if (!review) {
		return next(new AllError('Review not found', 404));
	}

	res.status(200).json({
		status: 'success',
		data: {
			review,
		},
	});
};

exports.updateReview = async (req, res, next) => {
	const review = await Review.findByIdAndUpdate(req.params.rid, req.body, {
		new: true,
		runValidators: true,
	});
	if (!review) {
		return next(new AllError('Review not found', 404));
	}

	res.status(200).json({
		status: 'success',
		data: {
			review,
		},
	});
};

exports.deleteReview = async (req, res, next) => {
	const data = await Review.findByIdAndRemove(req.params.pid);
	if (!data) {
		return next(new AllError('Review not found', 404));
	}

	res.status(204).json({
		status: 'success',
		message: 'succesfully deleted.',
		data: null,
	});
};
