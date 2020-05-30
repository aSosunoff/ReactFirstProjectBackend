const logger = require("../libs/logger")(module);

module.exports = (req, res, next) => {
	res.sendHttpError = (error) => {
		logger.error(error);
		res.status(error.status).send(error.message);
	};

	next();
};
