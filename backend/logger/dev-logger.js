const { createLogger, transports, format, config } = require('winston');
const { combine, timestamp, printf, colorize } = format;

const customFormat = combine(printf(({ level, message, timestamp }) => {
    return `${timestamp} - [${level.toUpperCase()}] - ${message}`;
}));

const logger = createLogger({
    levels: config.syslog.levels,
    format: combine(format.errors({stack: true}), //Makes console show actual error messages
                    timestamp(),
                    customFormat),
    transports: [
        new transports.Console(),
        new transports.File({ filename:'./log-files/sys-logs.log', level: 'crit' }),
        new transports.File({ filename: './log-files/combined-logs.log', level: 'info' })
    ]
});

module.exports = logger;