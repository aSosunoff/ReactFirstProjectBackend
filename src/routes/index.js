const quizRouter = require("./quizRouter");

module.exports = (app) => {
    app.use('/api/quiz', quizRouter);
};
