const { HttpError, QuizError } = require("../error");
const QuizModel = require("../models/quizModel");
const mapRecord = require("../libs/mapRecord");
const mapRecordAnswer = mapRecord((rec) => ({
	_id: rec._id,
	text: rec.text,
	value: rec.value,
}));
const mapRecordQuiz = mapRecord((rec) => ({
	_id: rec._id,
	question: rec.question,
	rightAnswerId: rec.rightAnswerId,
	answers: rec.answers.map(mapRecordAnswer),
	created: rec.created,
}));
const mapRecordQuizes = mapRecord((rec) => ({
	_id: rec._id,
	quizes: rec.quizes.map(mapRecordQuiz),
}));

exports.postCreate = async (req, res, next) => {
	try {
		await QuizModel.createNew(req.body.quizes);

		res.sendStatus(200);
	} catch (e) {
		if (e instanceof QuizError) {
			return next(new HttpError(403, e.message));
		} else {
			return next(e);
		}
	}
};

exports.deleteById = async (req, res, next) => {
	try {
		await QuizModel.deleteById(req.body.id);

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
		res.send(quizes.map(mapRecordQuizes));
	} catch (e) {
		return next(e);
	}
};

exports.getItem = async (req, res, next) => {
	try {
		const quiz = await QuizModel.getItem(req.params.id);
		res.send(mapRecordQuizes(quiz));
	} catch (e) {
		return next(e);
	}
};
