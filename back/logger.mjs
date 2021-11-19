import winston from 'winston';
import { LOGGER_OPTIONS as options } from './const.mjs';
export const errLogger = winston.createLogger({
	transports: [
		new winston.transports.File(options.errFile),
		new winston.transports.Console(options.console),
	],
	exitOnError: false,
});
export const infoLogger = winston.createLogger({
	transports: [
		new winston.transports.File(options.file),
		new winston.transports.Console(options.console),
	],
	exitOnError: false,
});
