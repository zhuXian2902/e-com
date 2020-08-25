/** @format */

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
	{
		review: {
			type: String,
			required: [true, 'Review can not be empty!'],
		},
		rating: {
			type: Number,
			min: [1, 'rating should be greater than or equal to 1'],
			max: [5, 'rating should be  smaller than or equal to 5'],
		},
		product: {
			type: mongoose.Schema.ObjectId,
			ref: 'Product',
			required: [true, 'Review must belong to a Product.'],
		},
		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			required: [true, 'Review must belong to a user'],
		},
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

reviewSchema.index({ product: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function (next) {
	this.populate({
		path: 'user',
		select: 'name _id image',
	});
	next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
