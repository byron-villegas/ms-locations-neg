const LogUtil = require('../utils/LogUtil');

const ParametersError = require('../errors/ParametersError');
const BusinessError = require('../errors/BusinessError');
const ServerError = require('../errors/ServerError');

const errorMiddleware = (err, req, res, next) => {
    let statusCode = 500;
    let responseBody = { codigo: '500', mensaje: 'Ha ocurrido un error interno' };
    let errorName = err.name || 'UnknownError';

    LogUtil.info(`[ErrorMiddleware] [handleError] [START] Handle Error`);

    LogUtil.error(`[ErrorMiddleware] [handleError] [ERROR] [${errorName}, ${err.stack || err.message}]`);

    switch (err.constructor) {
        case ParametersError:
            statusCode = 400;
            responseBody = err.detalles;
            break;
        case BusinessError:
            statusCode = 409;
            responseBody = { codigo: err.codigo, mensaje: err.mensaje };
            break;
        case ServerError:
            responseBody = { codigo: err.codigo, mensaje: err.mensaje };
            break;
    }

    LogUtil.info(`[ErrorMiddleware] [handleError] [END] Handle Error [${errorName}, ${JSON.stringify(responseBody)}]`);

    res.status(statusCode).json(responseBody);
};

module.exports = errorMiddleware;