/** @format */
const braintree = require('braintree');
const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');
const nodemailer = require('nodemailer');

var transport = nodemailer.createTransport({
	host: 'smtp-relay.sendinblue.com',
	port: process.env.EMAIL_PORT,
	auth: {
		user: process.env.SENDINBLUE_USERNAME,
		pass: process.env.SENDINBLUE_PASSWORD,
	},
});

var gateway = braintree.connect({
	environment: braintree.Environment.Sandbox,
	merchantId: process.env.BRAINTREE_MERCHANT_KEY,
	publicKey: process.env.BRAINTREE_PUBLIC_KEY,
	privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

exports.checkout = async (req, res, next) => {
	const token = await gateway.clientToken.generate({});
	res.send(token);
};

exports.payment = async (req, res, next) => {
	const nonce = req.body.nonce;
	const amount = req.body.amount;
	gateway.transaction.sale(
		{
			amount,
			paymentMethodNonce: nonce,
			options: {
				submitForSettlement: true,
			},
		},
		function (err, result) {
			if (err) {
				return next(err);
			} else {
				res.json(result);
			}
		}
	);
};

exports.getOrder = async (req, res, next) => {
	const orders = await Order.find()
		.populate('user', '_id name address')
		.sort('-updatedAt');
	res.status(200).json({
		status: 'success',
		orders,
	});
};

exports.createOrder = async (req, res, next) => {
	req.body.user = req.user;
	// console.log(req.body);
	const order = await Order.create(req.body);
	// console.log(order);
	const url = `${process.env.CLIENT_URL}/userdashboard`;
	const emailData = {
		to: {
			address: req.user.email,
		},
		from: {
			address: process.env.EMAIL_FROM,
			name: 'sandy',
		},
		subject: `order recieved mail`,
		html: `
     <div>
      <h1>We have received your order. Please check details on your dashboard</h1>  
      <a href="${url}" target="_blank" >${url}</a>
     </div>
    `,
	};
	await transport.sendMail(emailData);
	res.status(201).json({
		status: 'success',
		order,
	});
};
