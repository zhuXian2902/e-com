/** @format */
const { cartSchema } = require('./cartModel');
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
	{
		transactionId: {
			type: String,
		},
		amount: {
			type: Number,
		},
		address: {
			type: String,
		},
		status: {
			type: String,
			default: 'Not processed',
			enum: ['Not processed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
		},
		updatedOn: Date,
		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
		},
		products: [cartSchema],
	},
	{ timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
