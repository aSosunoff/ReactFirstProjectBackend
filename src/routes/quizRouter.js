const express = require('express');
const quizController = require('../controller/quizController');
const quizRouter = express.Router();

quizRouter.post('/create', quizController.postCreate);
quizRouter.get('/list', quizController.getList);
quizRouter.get('/item/:id', quizController.getItem);

module.exports = quizRouter;