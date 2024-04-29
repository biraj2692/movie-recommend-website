import nodemailer from "nodemailer";

const sendEmail = async (email, subject, url) => {
	try {
		console.log("sendMail");
		// const transporter = nodemailer.createTransport({
		// 	host: process.env.HOST,
		// 	service: process.env.SERVICE,
		// 	port: Number(process.env.EMAIL_PORT),
		// 	secureConnection: Boolean(process.env.SECURE),
		// 	auth: {
		// 		user: process.env.USEREMAILID + process.env.DOMAIN,
		// 		pass: process.env.PASS,
		// 	},
		// });
		const transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
			service: "gmails",
			port: Number(587),
			secureConnection: Boolean(true),
			auth: {
				user: "birajdesai9" + "@gmail.com",
				pass: "Shruti@2192$",
			},
		});

		await transporter.sendMail({
			from: process.env.USEREMAILID + process.env.DOMAIN,
			to: email,
			subject: subject,
			text: `Hellow folk! \n  for Activate your Account click here :- ${url}`,
		});
	} catch (error) {
		throw error;
	}
};

export default sendEmail;
