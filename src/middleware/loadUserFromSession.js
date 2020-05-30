const { HttpError } = require('../error');
/* const UserModel = require('../../models/user'); */
const logger = require('../libs/logger')(module);

module.exports = async (req, res, next) => {
	return next();
	/* req.user = res.locals.user = null;

	if (!req.session.user) {
		return next();
	}

	try {
		const user = await UserModel.findById(req.session.user);

		if (user) {
			req.user = res.locals.user = user.toObject();
		}

		next();
	} catch (e) {
		logger.error(e);
		return next(new HttpError(404, 'Пользователь не найден'));
	} */
};
