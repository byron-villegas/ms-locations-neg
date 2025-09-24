const swaggerUi = require('swagger-ui-express');
const server = require('./configs/server');
const config = require('./configs/config');

const requestLoggerMiddleware = require('./middlewares/request-logger.middleware');
const errorMiddleware = require('./middlewares/error.middleware');

server.use(config.server.context + config.swagger.endpoint, swaggerUi.serve, swaggerUi.setup(config.swagger.document));

server.use(requestLoggerMiddleware);

// Locations routes
// ms-locations-neg/locations --> LocationRoute.js
server.use(config.server.context + config.routes.locations, require('./routes/LocationRoute'));

server.use(errorMiddleware);

module.exports = server;