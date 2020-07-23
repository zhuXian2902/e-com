/** @format */
const Product = require('./../models/productModel');
const Filter = require('./../utils/filter');
const AllError = require('./../utils/error');
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
	// console.log(req.file);
	req.file.filename = `product-${req.user.id}-${Date.now()}.jpeg`;
	await sharp(req.file.buffer)
		.resize(500, 500)
		.toFormat('jpeg')
		.jpeg({ quality: 80 })
		.toFile(`public/users/${req.file.filename}`);
	req.body.image = req.file.filename;
	next();
};

exports.uploadImage = upload.single('image');

exports.productInfo = async (req, res, next, val) => {
	try {
		const product = await Product.findById(val);
		req.product = product;
		// console.log(product);
		next();
	} catch (err) {
		next(err);
	}
};

exports.similarProducts = async (req, res, next) => {
	req.query.category = req.params.pid;
	console.log(req.query, req.params);
	next();
};

exports.getAllProducts = async (req, res, next) => {
	// console.log(req.query);
	const filterProducts = new Filter(Product.find(), req.query)
		.filter()
		.sort()
		.limit()
		.pagination();
	const data = await filterProducts.query
		.populate('category', '_id name')
		.populate('reviews');
	res.status(201).json({
		status: 'success',
		size: data.length ? data.length : 0,
		data: {
			data,
		},
	});
};

exports.createProduct = async (req, res, next) => {
	// console.log(req.file, req.body);
	// console.log(req.headers);
	req.body.user = req.user.id;
	const data = await Product.create(req.body);
	res.status(201).json({
		status: 'success',
		data: {
			data,
		},
	});
};

exports.getProduct = async (req, res, next) => {
	const data = await Product.findById(req.params.pid).populate('reviews');
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

exports.updateProduct = async (req, res, next) => {
	const data = await Product.findByIdAndUpdate(req.params.pid, req.body, {
		new: true,
		runValidators: true,
	});
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

exports.deleteProduct = async (req, res, next) => {
	const data = await Product.findByIdAndRemove(req.params.pid);
	if (!data) {
		return next(new AllError('Product not found', 404));
	}

	res.status(204).json({
		status: 'success',
		data: null,
	});
};

exports.availableCategories = async (req, res, next) => {
	const data = await Product.aggregate([
		{
			$group: {
				_id: 'null',
				category: { $addToSet: '$category' },
			},
		},
		{
			$project: { _id: 0 },
		},
	]);
	res.status(200).json({
		status: 'success',
		data: {
			data,
		},
	});
};

exports.productStats = async (req, res, next) => {
	const data = await Product.aggregate([
		{
			$match: { ratingsAverage: { $gte: 4 } },
		},
		{
			$group: {
				_id: null,
				avgRating: { $avg: '$ratingsAverage' },
				avgPrince: { $avg: '$price' },
				minPrice: { $min: '$price' },
				maxPrice: { $max: '$price' },
			},
		},
	]);
	res.status(200).json({
		status: 'success',
		data: {
			data,
		},
	});
};
