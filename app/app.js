const swaggerUi = require('swagger-ui-express');
const server = require('./configs/server');
const config = require('./configs/config');

const requestLoggerMiddleware = require('./middlewares/request-logger.middleware');
const errorMiddleware = require('./middlewares/error.middleware');

const MongoDBClient = require('./clients/MongoDBClient');
const mongoClient = new MongoDBClient();

const LocationRoute = require('./routes/LocationRoute');

server.use(config.server.context + config.swagger.endpoint, swaggerUi.serve, swaggerUi.setup(config.swagger.document));

server.use(requestLoggerMiddleware);

// Locations routes
// ms-locations-neg/locations --> LocationRoute.js
server.use(config.server.context + config.routes.locations, LocationRoute(mongoClient));

server.use(errorMiddleware);

module.exports = async function startServer() {
    try {
        console.log('\x1b[36mConnecting to MongoDB at startup...\x1b[0m');

        await mongoClient.connect();

        console.info('\x1b[32mMongoDB connected successfully at startup\x1b[0m');

        // Arranca el servidor solo después de conectar a MongoDB
        server.listen(config.server.port, () => {
            console.log(`Server is listening on \x1b[32mhttp://localhost:${config.server.port}${config.server.context}\x1b[0m`);
        });
    } catch (err) {
        console.error('\x1b[31mFailed to start server:\x1b[0m', err);

        process.exit(1);
    }
};