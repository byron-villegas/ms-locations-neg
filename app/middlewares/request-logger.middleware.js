const namespace = require('../utils/requestContext');

const LogUtil = require('../utils/LogUtil');

const { v4: uuidv4 } = require('uuid');
const config = require('../configs/config');

const requestLoggerMiddleware = (req, res, next) => {
    namespace.run(() => {
        const startTime = Date.now();

        const url = req.originalUrl.replace(config.server.context, '');
        const trackingId = req.get('X-Tracking-Id') || uuidv4();
        const contentType = req.get('Content-Type') || 'application/json';

        // Save trackingId in global context
        namespace.set('trackingId', trackingId);

        req.trackingId = trackingId;
        
        LogUtil.info(`[RequestLoggerMiddleware] [START] [${req.method}] [${url}] [${contentType}]`);

        const originalSend = res.send;
        
        res.send = function(data) {
            const duration = Date.now() - startTime;

            LogUtil.info(`[RequestLoggerMiddleware] [END] [${req.method}] [${url}] [${res.statusCode}] [${duration}ms]`);
          
            res.send = originalSend;
            return originalSend.call(this, data);
        };

        next();
    });
};

module.exports = requestLoggerMiddleware;