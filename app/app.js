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
        console.log('Connecting to MongoDB at startup...');
        
        await mongoClient.connect();
        
        console.info('MongoDB connected successfully at startup');

        // Arranca el servidor solo después de conectar a MongoDB
        server.listen(config.server.port, () => {
            console.log(`Server is listening on http://localhost:${config.server.port}${config.server.context}`);
        });
    } catch (err) {
        console.error('Failed to connect to MongoDB at startup:', err);
        process.exit(1);
    }
};