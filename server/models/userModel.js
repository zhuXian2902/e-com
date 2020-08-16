/** @format */

const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please fill your name.'],
			trim: true,
			minlength: [1, 'A user name must have at least 1 characters'],
			maxlength: [30, 'A user name must have at most 30 characters'],
		},
		email: {
			type: String,
			required: [true, 'Please provide a email.'],
			trim: true,
			unique: true,
			lowercase: true,
			validate: [validator.isEmail, 'please provide a valid email.'],
		},
		password: {
			type: String,
			required: [true, 'Please provide a password'],
			trim: true,
			minlength: [8, 'A password should contain at least 8 characters'],
			maxlength: [16, 'A password should contain at most 16 characters'],
			select: false,
		},
		passwordConfirm: {
			type: String,
			required: [true, 'Please confirm your password.'],
			trim: true,
			validate: {
				validator: function (value) {
					return value === this.password;
				},
				message: 'Passwords are not matching in both fields.',
			},
		},
		role: {
			type: String,
			enum: ['user', 'admin', 'seller'],
			default: 'user',
		},
		image: {
			type: String,
			default: 'default.jpg',
		},
		address: {
			type: String,
		},
		history: [],
	},
	{
		timestamps: true,
	}
);

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();

	this.password = await bcrypt.hash(this.password, 12);
	this.passwordConfirm = undefined;
	next();
});

userSchema.methods.comparePassword = async (
	incomingPassword,
	serverPassword
) => {
	return await bcrypt.compare(incomingPassword, serverPassword);
};

userSchema.methods.isPasswordChanged = function (issueTime) {
	const updateTime = parseInt(this.updatedAt.getTime() / 1000);
	console.log(updateTime);
	return updateTime > issueTime;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
