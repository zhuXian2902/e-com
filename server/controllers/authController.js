/** @format */
const { promisify } = require('util');
const AllError = require('./../utils/error');
const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

var transport = nodemailer.createTransport({
	host: 'smtp-relay.sendinblue.com',
	port: process.env.EMAIL_PORT,
	auth: {
		user: process.env.SENDINBLUE_USERNAME,
		pass: process.env.SENDINBLUE_PASSWORD,
	},
});

// var transport = nodemailer.createTransport({
// 	service: 'SendGrid',
// 	auth: {
// 		user: process.env.SENDGRID_USERNAME,
// 		pass: process.env.SENDGRID_PASSWORD,
// 	},
// });

const createToken = (id) => {
	return jwt.sign({ id }, process.env.SECRET_JWT, {
		expiresIn: process.env.EXPIRES_IN,
	});
};

exports.signup = async (req, res, next) => {
	const { name, email, password, passwordConfirm } = req.body;

	const user = await User.findOne({ email });
	if (user)
		return next(new AllError('account with that email already exists', 401));

	const token = jwt.sign(
		{ name, email, password, passwordConfirm },
		process.env.SECRET_JWT,
		{ expiresIn: '10m' }
	);

	const url = `${process.env.CLIENT_URL}/auth/activate/${token}`;

	const emailData = {
		to: {
			address: email,
			name,
		},
		from: {
			address: process.env.EMAIL_FROM,
			name: 'sandy',
		},
		subject: `activation account mail`,
		html: `
     <div>
      <h1>please click on the link to activate your password</h1>
      <a href="${url}" target="_blank" >${url}</a>
      <p>this mail contain the sensitive information</p>
     </div>
    `,
	};
	// console.log(emailData);
	await transport.sendMail(emailData);

	res.status(200).json({
		status: 'success',
		message: 'an email is send to your email address',
	});
};

exports.authenticate = async (req, res, next) => {
	// console.log(req.body, 12);
	const { token } = req.body;

	if (!token) {
		return next(new AllError('Invalid token.', 401));
	}

	const decode = await promisify(jwt.verify)(token, process.env.SECRET_JWT);

	const { name, email, password, passwordConfirm } = decode;

	const newUser = await User.create({ name, email, password, passwordConfirm });
	newUser.password = undefined;
	newUser.passwordConfirm = undefined;
	const newToken = createToken(newUser.id);
	res.status(201).json({
		status: 'success',
		message: `Welcome to our app ${name}`,
		token: newToken,
		data: newUser,
	});
};

exports.login = async (req, res, next) => {
	const { email, password } = req.body;
	if (!email || !password)
		return next(new AllError('Please provide email and password', 400));

	const user = await User.findOne({ email }).select('+password');

	if (!user || !(await user.comparePassword(password, user.password)))
		return next(new AllError('wrong email or password', 401));

	const token = createToken(user._id);

	res.status(200).json({
		status: 'success',
		message: `Welcome back ${user.name}`,
		token,
		data: user,
	});
};

exports.protect = async (req, res, next) => {
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		token = req.headers.authorization.split(' ')[1];
	} else if (req.cookie.jwt) {
		token = req.cookie.jwt;
	}
	// console.log(token);
	if (!token) {
		return next(new AllError('Please login to get access.', 401));
	}

	const payload = await promisify(jwt.verify)(token, process.env.SECRET_JWT);
	// console.log(payload);
	// checking if user still exists
	const userExists = await User.findById(payload.id);
	if (!userExists) {
		return next(new AllError('user does not exist', 401));
	}
	// console.log(payload, userExists);
	// if (userExists.isPasswordChanged(payload.iat)) {
	// 	return next(new AllError('please fill correct credentials to login', 401));
	// }

	req.user = userExists;
	// console.log(req.user);
	next();
};

exports.isAdmin = (req, res, next) => {
	if (req.user.role !== 'admin') {
		return next(new AllError('you are not allowed to perform this action', 403));
	}
	next();
};

exports.isAllowed = async (req, res, next) => {
	// console.log(req.user, req.body);
	if (req.user.role !== 'admin' && req.user.role !== 'seller') {
		return next(new AllError('you are not allowed to perform this action', 403));
	}

	// if(req.user.role === 'seller')
	//   req.query.id = req.user.id;
	next();
};

exports.forgotPassword = async (req, res, next) => {
	// console.log(1);
	const { email } = req.body;
	const user = await User.findOne({ email });
	if (!user) {
		return next(new AllError('user does not exist', 400));
	}
	// console.log(user);
	const { _id, name } = user;

	const token = jwt.sign({ _id }, process.env.SECRET_JWT, {
		expiresIn: '10m',
	});

	const url = `${process.env.CLIENT_URL}/auth/resetPassword/${token}`;

	const emailData = {
		to: [
			{
				address: email,
				name,
			},
		],
		from: {
			address: process.env.EMAIL_FROM,
			name: 'sandy',
		},
		subject: `reset password mail`,
		html: `
     <div>
      <h1>please click on the link to reset your password</h1>
      <a href="${url}" target="_blank" >${url}</a>
      <p>this mail contain the sensitive information</p>
     </div>
    `,
	};

	await transport.sendMail(emailData);
	res.status(200).json({
		message: 'a email  was sent successfully to your account',
	});
};

exports.resetPassword = async (req, res, next) => {
	const { token, password, passwordConfirm } = req.body;
	if (!token) {
		return next(new AllError('invalid token', 400));
	}
	const decode = await promisify(jwt.verify)(token, process.env.SECRET_JWT);

	const user = await User.findById(decode._id);
	if (!user) {
		return next(new AllError('token is expired or invalid', 401));
	}

	user.password = password;
	user.passwordConfirm = passwordConfirm;
	await user.save();
	res.status(200).json({
		message: 'password changed successfully',
	});
};

exports.updatePassword = async (req, res, next) => {
	const { currentPassword, password, passwordConfirm } = req.body;

	const user = await User.findById(req.user.id).select('+password');
	if (!(await user.comparePassword(currentPassword, user.password))) {
		return next(new AllError('Your current password is wrong.', 401));
	}

	user.password = password;
	user.passwordConfirm = passwordConfirm;
	const data = await user.save();
	const token = createToken(user._id);
	res.status(200).json({
		status: 'success',
		data,
		token,
	});
};
