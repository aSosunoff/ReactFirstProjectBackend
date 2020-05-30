const winston = require("winston");
const path = require("path");
const config = require("../config/");

const LEVEL = Symbol.for("level");

class MakeLogger {
	constructor(namespace, level, levelFilter, skips) {
		this.namespace = namespace;
		this.skips = skips.map(
			(e) => new RegExp("^" + e.replace(/\*/g, ".*?") + "$")
		);
		this.level = level;
		this.levelFilter = levelFilter;
	}

	createLogger() {
		const colorizer = winston.format.colorize();

		if (this.enable(this.namespace)) {
			let transports = [new winston.transports.Console({})];

			if (this.levelFilter && this.levelFilter.length) {
				transports = [
					new winston.transports.Console({
						format: winston.format((info) => {
							if (this.levelFilter.includes(info[LEVEL])) {
								return info;
							}
						})(),
					}),
				];
			}

			return winston.createLogger({
				level: this.level,

				format: winston.format.combine(
					winston.format.timestamp({
						format: "DD.MM.YYYY HH:mm:ss",
					}),
					winston.format.simple(),
					winston.format.printf((me) => {
						return colorizer.colorize(
							me.level,
							`${me.timestamp} - [ ${this.namespace} ] - ${me.level}: ${me.message}`
						);
					})
				),

				transports,
			});
		} else {
			return winston.createLogger({
				silent: true,
			});
		}
	}

	enable(namespaces) {
		for (let i = 0; i < this.skips.length; i++) {
			if (this.skips[i].test(namespaces)) return false;
		}

		return true;
	}
}

module.exports = (module, level, levelFilter) => {
	level = level || config.get("logger:level") || "silly";

	levelFilter = levelFilter || config.get("logger:levelFilter");

	let namespace = module.filename.split(path.sep).slice(-2).join(path.sep);

	const makeLogger = new MakeLogger(
		namespace,
		level,
		levelFilter,
		config.get("logger:skips")
	);

	return makeLogger.createLogger();
};

/*
logger.silly();
logger.debug();
logger.verbose();
logger.http();
logger.info();
logger.warn();
logger.error();
 */
