const { HttpError , AuthError } = require('../error');
const UserModel = require('../models/user');
const logger = require('../libs/logger')(module);

exports.postLogin = async (req, res, next) => {
	try {
		let email = req.body.email;
		let password = req.body.password;

		const user = await UserModel.login(email, password);

		req.session.user = user._id;

		res.end();
	} catch (e) {
		if (e instanceof AuthError) {
			return next(new HttpError(403, e.message));
		} else {
			return next(e);
		}
	}
};

exports.postRegister = async (req, res, next) => {
	try {
		let email = req.body.email;
		let password = req.body.password;
		let name = req.body.name;

		const user = await UserModel.register(name, email, password);

		req.session.user = user._id;

		res.end();
	} catch (e) {
		if (e instanceof AuthError) {
			return next(new HttpError(401, e.message));
		} else {
			return next(e);
		}
	}
};

exports.postLogout = (req, res, next) => {
	const sid = req.session.id;

	const io = req.app.get('io');

	req.session.destroy(err => {
		/* io.sockets._events['session:reload'](sid); */

		if (err) {
			return next(err);
		}

		res.end();
	});
};
