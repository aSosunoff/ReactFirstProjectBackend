const { HttpError } = require("../error");
const logger = require("../libs/logger")(module);

module.exports = (app) => {
	app.use((err, req, res, next) => {
		if (typeof err == "number") {
			err = new HttpError(err);
		}

		if (err instanceof HttpError) {
			res.sendHttpError(err);
		} else {
			logger.error(err);
			res.sendHttpError(new HttpError(500));
		}
	});
};
