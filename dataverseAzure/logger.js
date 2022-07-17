const { createLogger, format, transports } = require('winston');

function formatArgs(args) {
  const formattedArgs = args.reduce((prevValue, currentValue) => {
    const currentValueType = typeof currentValue;
    if (currentValueType === 'string' || currentValueType === 'number') {
      return `${prevValue} ${currentValue}`;
    } else {
      return `${prevValue} ${JSON.stringify(currentValue)}`;
    }
  }, '');

  return formattedArgs;
}

const logger = createLogger({
  transports: new transports.Console({
    format: format.combine(
      format.colorize(),
      format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
      format.align(),
      format.printf((info) => {
        const args = info[Symbol.for('splat')] || [];
        const argString = formatArgs(args);

        return `${info.level}: ${[info.timestamp]}: ${info.message} ${argString}`;
      })
    ),
  }),
});

module.exports = logger;
