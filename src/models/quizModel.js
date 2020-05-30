const mongoose = require("../libs/mongoose");
const { QuizError } = require("../error");

var Answer = new mongoose.Schema({
	text: String,
	value: Number,
});

const quizSchema = new mongoose.Schema({
	question: {
		type: String,
		required: true,
		unique: true,
	},
	rightAnswerId: {
		type: Number,
		required: true,
	},
	answers: [Answer],
	created: {
		type: Date,
		default: Date.now,
	},
});

quizSchema.statics.createNew = async function ({
	question,
	rightAnswerId,
	answers,
}) {
	const QuizModel = this;

	const quiz = new QuizModel({
		question,
		rightAnswerId,
		answers,
	});

	await quiz.save();

	return quiz;
};


module.exports = mongoose.model('Quiz', quizSchema);