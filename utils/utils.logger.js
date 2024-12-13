let log4js = require('log4js');

log4js.configure({
    appenders: {
        console: { type: 'console' },
        info: {
            type: 'file',
            filename: 'logs/info.log'
        },
        error: {
            type: 'file',
            filename: 'logs/error.log'
        }
    },
    categories: {
        default: {
            appenders: [ 'console','info' ],
            level: 'debug'
        },
        info: {
            appenders: ['info'],
            level: 'info'
        },
        error: {
            appenders: [ 'error', 'console' ],
            level: 'error'
        }
    }
});

exports.info = ( content ) => {
    let logger = log4js.getLogger('info')
    logger.level = 'info'
    logger.info(content)
}

exports.debug = ( content ) => {
    let logger = log4js.getLogger('debug')
    logger.level = 'debug'
    logger.debug(content)
}

exports.error = ( content ) => {
    let logger = log4js.getLogger('error')
    logger.level = 'error'
    logger.error(content)
}
