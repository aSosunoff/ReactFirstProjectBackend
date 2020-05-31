const mongoose = require("../libs/mongoose");
const { QuizError } = require("../error");

const Answer = new mongoose.Schema({
	text: String,
	value: Number,
});

const quizItem = new mongoose.Schema({
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
});

const quizSchema = new mongoose.Schema({
	quizes: [quizItem],
	created: {
		type: Date,
		default: Date.now,
	},
});

quizSchema.statics.createNew = async function (quizes) {
	const QuizModel = this;

	const quiz = new QuizModel({
		quizes,
	});

	await quiz.save();

	return quiz;
};

quizSchema.statics.getList = async function () {
	return await this.find();
};

quizSchema.statics.getItem = async function (_id) {
	return await this.findById(_id);
};

module.exports = mongoose.model("Quiz", quizSchema);
