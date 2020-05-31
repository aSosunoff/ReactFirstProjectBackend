const { HttpError } = require("../error");
const {
	mongo: { MongoError },
} = require("../libs/mongoose");

module.exports = (app) => {
	app.use((err, req, res, next) => {
		if (typeof err == "number") {
			err = new HttpError(err);
		}

		if (err instanceof HttpError) {
			res.sendHttpError(err);
		} else if (err instanceof MongoError) {
			res.sendHttpError(new HttpError(500, mongoErrorMessage(err)));
		} else {
			res.sendHttpError(new HttpError(500));
		}
	});
};

const mongoErrorMessage = (error) => {
	let errorMessage = "";
	switch (error.code) {
		case 11000:
			errorMessage = "Не уникальное значение";
			break;
		default:
			errorMessage = error.message;
	}
	return errorMessage;
};
