const app = require("express")();
const server = require("http").createServer(app);
const config = require("./config/");
const logger = require('./libs/logger')(module);

require('./middleware/default')(app, module);
require('./routes')(app);
require('./middleware/error')(app);

app.use('/', (req, res) => {
	res.send('<a href="http://localhost:3001/">Войти на сайт</a>');
});

server.listen(config.get("port"), () => {
	// logger.silly(`Сервер запущен на порту ${config.get('port')}`);
	// logger.debug(`Сервер запущен на порту ${config.get('port')}`);
	// logger.verbose(`Сервер запущен на порту ${config.get('port')}`);
	// logger.http(`Сервер запущен на порту ${config.get('port')}`);
	logger.info(`Сервер запущен на порту ${config.get("port")}`);
	// logger.warn(`Сервер запущен на порту ${config.get('port')}`);
	// logger.error(`Сервер запущен на порту ${config.get('port')}`);
});
