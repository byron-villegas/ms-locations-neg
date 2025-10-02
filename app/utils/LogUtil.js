const namespace = require('../utils/requestContext');

const debug = (message) => {
    console.debug(`${new Date().toISOString()} [${process.pid}] [\x1b[34mDEBUG\x1b[0m] [${namespace.get('trackingId')}] ${message}`);
};

const info = (message) => {
    console.info(`${new Date().toISOString()} [${process.pid}] [\x1b[32mINFO\x1b[0m] [${namespace.get('trackingId')}] ${message}`);
};

const error = (message) => {
    console.error(`${new Date().toISOString()} [${process.pid}] [\x1b[31mERROR\x1b[0m] [${namespace.get('trackingId')}] ${message}`);
};

module.exports = {
    debug,
    info,
    error
};