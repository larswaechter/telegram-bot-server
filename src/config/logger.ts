import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { createLogger, format, transports, Logger } from 'winston';

import { globals } from './variables';

const logDir: string = 'logs';

// Create the log directory if it does not exist
if (!existsSync(logDir)) {
	mkdirSync(logDir);
}

// Logfiles
const errorLog: string = join(logDir, 'errors.log');

export const logger: Logger = createLogger({
	format: format.combine(
		format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss'
		}),
		format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
	),
	level: 'info',
	transports: [
		new transports.File({
			filename: errorLog,
			level: 'error'
		})
	]
});

if (globals.env !== 'production') {
	logger.add(
		new transports.Console({
			format: format.combine(
				format.colorize(),
				format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
			),
			level: 'debug'
		})
	);
}
