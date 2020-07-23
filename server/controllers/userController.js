/** @format */
const AllError = require('./../utils/error');
const User = require('./../models/userModel');
const multer = require('multer');
const sharp = require('sharp');

// const storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		cb(null, 'public/users');
// 	},
// 	filename: (req, file, cb) => {
// 		cb(null, `user-${req.user.id}-${Date.now()}-${file.originalname}`);
// 	},
// });
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
	if (file.mimetype.startsWith('image')) {
		cb(null, true);
	} else {
		cb(new AllError('this is not a image file. please upload only image'), false);
	}
};

const upload = multer({
	storage,
	fileFilter,
});

exports.manageImage = async (req, res, next) => {
	if (!req.file) return next();
	req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
	await sharp(req.file.buffer)
		.resize(500, 500)
		.toFormat('jpeg')
		.jpeg({ quality: 80 })
		.toFile(`public/users/${req.file.filename}`);
	next();
};

exports.uploadImage = upload.single('image');

exports.getMe = (req, res, next) => {
	req.params.id = req.user.id;
	next();
};

exports.updateProfile = async (req, res, next) => {
	console.log(req.file, req.body);
	if (req.body.password || req.body.confirmPassword) {
		return new AllError('Password updates are not allowed from this route.', 400);
	}
	if (req.file) {
		req.body.image = req.file.filename;
	}
	const data = await User.findByIdAndUpdate(req.user.id, req.body, {
		new: true,
		runValidators: true,
	});
	res.status(200).json({
		status: 'success',
		data: {
			data,
		},
	});
};

exports.getAllUsers = async (req, res) => {
	const users = await User.find();
	res.status(201).json({
		status: 'success',
		size: users.length ? users.length : 0,
		data: {
			users,
		},
	});
};

exports.getUser = async (req, res, next) => {
	const data = await User.findById(req.user._id);
	if (!data) {
		return next(new AllError('Product not found', 404));
	}
	res.status(200).json({
		status: 'success',
		data: {
			data,
		},
	});
};

exports.createUser = (req, res) => {
	res.status(201).json({
		status: 'success',
		data: {
			message: 'work in progress',
		},
	});
};

exports.updateUser = (req, res) => {
	res.status(200).json({
		status: 'success',
		data: {
			message: 'work in progress',
		},
	});
};

exports.deleteUser = (req, res) => {
	res.status(200).json({
		status: 'success',
		data: {
			message: 'work in progress',
		},
	});
};
