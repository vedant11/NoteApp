import winston from 'winston';
import DailyRotateFile from 'winston/lib/winston/transports/index.js';
const options = {
	file: {
		level: 'info',
		filename: './log/app.log',
		handleExceptions: true,
		json: true,
		maxsize: 5242880, // 5MB
		maxFiles: 5,
		colorize: false,
	},
	console: {
		level: 'debug',
		handleExceptions: true,
		json: false,
		colorize: true,
	},
};

export const errLogger = winston.createLogger({
	levels: {
		error: Number,
		warn: Number,
	},
	transports: [
		new winston.transports.File(options.file),
		new winston.transports.Console(options.console),
	],
	exitOnError: false,
});
export const infoLogger = winston.createLogger({
	levels: ['verbose', 'info', 'silly'],
	transports: [new DailyRotateFile(options.file)],
	exitOnError: false,
});
