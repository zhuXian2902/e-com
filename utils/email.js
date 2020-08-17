/** @format */

const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
	var transport = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: process.env.EMAIL_PORT,
		auth: {
			user: process.env.EMAIL_USERNAME,
			pass: process.env.EMAIL_PASSWORD,
		},
	});

	const mailOptions = {
		from: 'sandy <2902sandeepkumar@gmail.com>',
		to: options.email,
		subject: options.subject,
		text: options.message,
	};
	await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
