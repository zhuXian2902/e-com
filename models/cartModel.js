/** @format */

const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
		},
		price: {
			type: Number,
		},
		count: {
			type: Number,
		},
		product: {
			type: mongoose.Schema.ObjectId,
			ref: 'Product',
		},
	},
	{ timestamps: true }
);

const Cart = mongoose.model('Cart', cartSchema);

module.exports = { cartSchema, Cart };
