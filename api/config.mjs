import dotenv from 'dotenv';
dotenv.config();
import pg from 'pg';
import path from 'path';
import rfs from 'rotating-file-stream';

// create a rotating write stream
export const accessLogStream = rfs.createStream('access.log', {
	interval: '1d', // rotate daily
	path: path.join('log'),
});
export const errorLogSteam = rfs.createStream('error.log', {
	path: path.join('log'),
	interval: '1d',
});

// Init processes and configs
export const DBport = process.env.DB_PORT;
export const serverPort = process.env.SERVER_PORT;
export const pgClient = new pg.Client({
	host: process.env.HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
});
