const ParametersError = require('../errors/ParametersError');
const BusinessError = require('../errors/BusinessError');
const ServerError = require('../errors/ServerError');

const errorMiddleware = (err, req, res, next) => {
    let statusCode = 500;
    let responseBody = { codigo: '500', mensaje: 'Ha ocurrido un error interno' };
    let errorName = 'UnknownError';

    console.info(`${new Date().toISOString()} [${req.trackingId}] [ErrorMiddleware] [handleError] [START] Handle Error`);

    switch (err.constructor) {
        case ParametersError:
            statusCode = 400;
            errorName = 'ParametersError';
            responseBody = err.detalles;
            break;
        case BusinessError:
            statusCode = 409;
            errorName = 'BusinessError';
            responseBody = { codigo: err.codigo, mensaje: err.mensaje };
            break;
        case ServerError:
            errorName = 'ServerError';
            responseBody = { codigo: err.codigo, mensaje: err.mensaje };
            break;
    }

    console.error(`${new Date().toISOString()} [${req.trackingId}] [ErrorMiddleware] [handleError] [ERROR] ${errorName} [${JSON.stringify(responseBody)}]`);

    console.info(`${new Date().toISOString()} [${req.trackingId}] [ErrorMiddleware] [handleError] [END] Handle Error`);

    res.status(statusCode).json(responseBody);
};

module.exports = errorMiddleware;