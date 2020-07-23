/** @format */

const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: [true, 'please provide a category for a product.'],
			minlength: [2, 'A category must have at least 2 characters'],
			maxlength: [40, 'A category must have at most 40 characters'],
			unique: true,
		},
	},
	{ timestamps: true }
);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
