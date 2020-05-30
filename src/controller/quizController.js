const { HttpError, QuizError } = require("../error");

exports.postCreate = async (req, res, next) => {
	try {
        console.log(req);
        res.send({name: 'i'});
	} catch (e) {
		if (e instanceof QuizError) {
			return next(new HttpError(403, e.message));
		} else {
			return next(e);
		}
	}
};
