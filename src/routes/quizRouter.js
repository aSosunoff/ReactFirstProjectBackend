const express = require('express');
const quizController = require('../controller/quizController');
const quizRouter = express.Router();

quizRouter.post('/create', quizController.postCreate);

module.exports = quizRouter;