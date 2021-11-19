import winston from 'winston';
import { LOGGER_OPTIONS as options } from './const.js';
export const logger = winston.createLogger({
	transports: [
		new winston.transports.File(options.errFile),
		new winston.transports.File(options.file),
		new winston.transports.Console(options.console),
	],
	exitOnError: false,
});
