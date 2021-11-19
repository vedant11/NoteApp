// package.json
import express from 'express';
import morgan from 'morgan'; // http logging

// live objects
import {
	pgClient,
	accessLogStream,
	errorLogSteam,
	DBport,
	serverPort,
} from './config.js';
import { createTableIfNull } from './util.js';
import { router as noteRouter } from './routers/note.js';
import { router as userRouter } from './routers/users.js';

// local modules and const
import { logger } from './logger.js';
import { ESSENTIAL_TABLES } from './const.js';

// Init serveExps
pgClient
	.connect()
	.then(() =>
		logger.info(
			'Connected to Database successfully using the user ' + pgClient.user
		)
	)
	.catch((err) => {
		logger.error('Unable to connect to the Database: ', err);
	});
const serveExp = express();

// setup the logger for HTPP requests
serveExp.use(morgan('combined', { stream: accessLogStream }));
serveExp.use(
	morgan('combined', {
		stream: errorLogSteam,
		skip: (req, res) => {
			res.statusCode < 400; // skip when all normal
		},
	})
);

// creating new table if doesn't exist
for (let tb in ESSENTIAL_TABLES) {
	createTableIfNull({
		pgClient: pgClient,
		table_name: ESSENTIAL_TABLES[tb],
	});
}

// middleware
serveExp.use(express.json());

// server handlers/APIs
serveExp.use('/', noteRouter);
serveExp.use('/users', userRouter);

//Port listening
serveExp.listen(serverPort, () => {
	console.log(
		`NoteApp server is running at port http://localhost:${serverPort}`
	);
	console.log(`NoteApp DB is running at port http://localhost:${DBport}`);
});
