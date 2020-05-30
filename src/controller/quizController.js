const { HttpError, QuizError } = require("../error");
const QuizModel = require("../models/quizModel");

exports.postCreate = async (req, res, next) => {
	try {
		const quiz = await QuizModel.createNew({
			question: req.body.quiz[0].question,
			rightAnswerId: req.body.quiz[0].rightAnswerId,
			answers: req.body.quiz[0].answers,
		});

		res.send(quiz);
	} catch (e) {
		if (e instanceof QuizError) {
			return next(new HttpError(403, e.message));
		} else {
			return next(e);
		}
	}
};
