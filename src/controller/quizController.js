const { HttpError, QuizError } = require("../error");
const QuizModel = require("../models/quizModel");
const mapRecord = require("../libs/mapRecord");
const mapRecordAnswer = mapRecord(rec => ({
	_id: rec._id,
	text: rec.text,
	value: rec.value,
}));
const mapRecordQuiz = mapRecord(rec => ({
	_id: rec._id,
	question: rec.question,
	rightAnswerId: rec.rightAnswerId,
	answers: rec.answers.map(mapRecordAnswer),
	created: rec.created,
}))

exports.postCreate = async (req, res, next) => {
	try {
		req.body.quiz.forEach(async (quiz) => {
			await QuizModel.createNew({
				question: quiz.question,
				rightAnswerId: quiz.rightAnswerId,
				answers: quiz.answers,
			});
		});

		res.sendStatus(200);
	} catch (e) {
		if (e instanceof QuizError) {
			return next(new HttpError(403, e.message));
		} else {
			return next(e);
		}
	}
};

exports.getList = async (req, res, next) => {
	try {
		const quizes = await QuizModel.getList();
		res.send(quizes.map(mapRecordQuiz));
	} catch (e) {
		return next(e);
	}
};

exports.getItem = async (req, res, next) => {
	try {
		const quiz = await QuizModel.getItem(req.params.id);
		res.send(mapRecordQuiz(quiz));
	} catch (e) {
		return next(e);
	}
};