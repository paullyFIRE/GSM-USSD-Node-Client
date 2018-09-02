const path = require('path')
const { createLogger, format, transports } = require('winston')

const logger = createLogger({
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.File({
      filename: path.join('src/logs', '/error.log'),
      level: 'error',
      maxsize: 5 * 1000000
    }),
    new transports.File({
      filename: path.join('src/logs', '/info.log'),
      level: 'info',
      maxsize: 5 * 1000000
    })
  ]
})

module.exports = logger
