const quizRouter = require("./quizRouter");
const authRouter = require("./authRouter");

module.exports = (app) => {
    app.use('/api/quiz', quizRouter);
    app.use('/api/auth', authRouter);
};
