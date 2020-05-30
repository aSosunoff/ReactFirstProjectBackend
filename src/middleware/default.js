const express = require("express");
const path = require("path");
const morganMiddleware = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const coocieParserMiddleware = require("cookie-parser");
const expressSession = require("express-session");
const sessionStore = require('../libs/sessionStore');

const config = require("../config");
const skip = (req, res) => res.statusCode < config.get("morgan:statusCode");

module.exports = (app, module) => {
	const rootDirName = path.parse(module.filename).dir;

	if (app.get("env") == "development") {
		app.use(
			morganMiddleware(
				":remote-addr :method :url :status :response-time ms - :res[content-length]",
				{ skip }
			)
		);
	} else {
		app.use(morganMiddleware("tiny", { skip }));
	}

	app
		.use(
			cors({
				origin: "http://localhost:3001",
				methods: "GET,PUT,POST,DELETE",
				credentials: true,
			})
		)
		.use(bodyParser.json()) // req.body parse application/json
		.use(bodyParser.urlencoded({ extended: false })) // req.body parse application/x-www-form-urlencoded
		.use(coocieParserMiddleware()) // req.cookies
		.use(
			expressSession({
				secret: config.get("session:secret"),
				key: config.get("session:key"),
				cookie: config.get("session:cookie"),
				store: sessionStore,
				resave: true,
				saveUninitialized: true,
			})
		)
		.use(express.static(path.join(rootDirName, "public")))
		.use(require("./sendHttpError"))
		.use(require("./loadUserFromSession"));
};
