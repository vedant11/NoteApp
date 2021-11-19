import winston from 'winston';

export const SQL_SEARCH_QUERY = 'SELECT * FROM persons WHERE username = $1';
export const CREATE_TABLE = (text) =>
	`CREATE TABLE ${text} (username text NOT NULL PRIMARY KEY,text text);`;
export const TABLE_CHECK = (table_name) => `SELECT * FROM ${table_name}`;
export const PERSONS_INSERT_QUERY =
	'INSERT INTO persons(username, text) VALUES($1, $2)';
export const PROFILES_INSERT_QUERY =
	'INSERT INTO profiles(username,password) VALUES($1,$2)';
export const LOGGER_OPTIONS = {
	file: {
		levels: {
			verbose: 2,
			info: 3,
			silly: 4,
		},
		filename: './log/app.log',
		handleExceptions: false,
		json: false,
		maxsize: 5242880, // 5MB
		maxFiles: 5,
		colorize: false,
	},
	errFile: {
		levels: {
			error: 0,
			warn: 1,
		},
		filename: './log/app.log',
		handleExceptions: true,
		json: false,
		maxsize: 5242880, // 5MB
		maxFiles: 5,
		colorize: false,
	},
	console: {
		format: winston.format.cli(),
		level: 'debug',
		handleExceptions: true,
		json: false,
		colorize: true,
	},
};
