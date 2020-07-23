/** @format */

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'A product must have a name'],
			unique: true,
			trim: true,
			minlength: [3, 'A product name must have at least 3 characters'],
			maxlength: [100, 'A product name must have at most 100 characters'],
		},
		description: {
			type: String,
			required: [true, 'A product must have a description'],
			trim: true,
			minlength: [10, 'A product description must have at least 10 characters'],
			maxlength: [1000, 'A product description must have at most 100 characters'],
		},
		price: {
			type: Number,
			required: [true, 'A product must have a price'],
		},
		quantity: {
			type: Number,
			required: [true, 'A product must have a quantity'],
		},
		ratingsAverage: {
			type: Number,
			default: 4.0,
		},
		ratingsQuantity: {
			type: Number,
			default: 0,
		},
		image: {
			type: String,
			required: [true, 'A product must have an image'],
		},
		discount: {
			type: Number,
			default: 0,
		},
		sold: {
			type: Number,
			default: 0,
		},
		category: {
			type: mongoose.Schema.ObjectId,
			ref: 'Category',
			required: true,
		},
		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
		},
		// reviews: [
		// 	{
		// 		type: mongoose.Schema.ObjectId,
		// 		ref: 'Review',
		// 	},
		// ],
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

productSchema.virtual('reviews', {
	ref: 'Review',
	foreignField: 'product',
	localField: '_id',
});

// productSchema.pre(/^find/, function (next) {
// 	console.log('populate product schema');
// 	this.populate({
// 		path: 'reviews',
// 		select: 'review rating _id',
// 	});
// 	next();
// });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
