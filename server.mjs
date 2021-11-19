// package.json
import express from 'express';
import morgan from 'morgan';

// constants
import {
	CREATE_TABLE,
	SQL_SEARCH_QUERY,
	TABLE_CHECK,
	PERSONS_INSERT_QUERY,
	PROFILES_INSERT_QUERY,
} from './const.mjs';
// live objects
import {
	pgClient,
	accessLogStream,
	errorLogSteam,
	DBport,
	serverPort,
} from './config.mjs';
// local modules
import { errLogger, infoLogger } from './logger.mjs';

// Init serveExps
pgClient.connect();
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
pgClient.query(TABLE_CHECK('notes'), (err) => {
	if (err) {
		pgClient
			.query(CREATE_TABLE('notes'))
			.then(() => {
				infoLogger.info('added new table for notes');
			})
			.catch((err) => {
				errLogger.error('err adding table for notes', err);
			});
	} else infoLogger.info('table exists for notes');
});
pgClient.query(TABLE_CHECK('profile'), (err) => {
	if (err) {
		pgClient
			.query(CREATE_TABLE(profiles))
			.then(() => {
				infoLogger.info('added new table for profiles');
			})
			.catch((err) => {
				errLogger.error('err adding table for profile', err);
			});
	} else infoLogger.info('table exists for profile');
});

// middleware
serveExp.use(express.json());

//server handlers
serveExp.get('/users/:username', (req, res) => {
	const { username } = req.params;
	infoLogger.verbose(username, 'requested');
	pgClient
		.query(SQL_SEARCH_QUERY, [username])
		.then((data) => {
			res.send(JSON.stringify(data.rows[0].text));
			infoLogger.verbose('served the req');
		})
		.catch((err) => {
			errLogger.error('error serving the req', err);
		});
});

serveExp.post('/write', (req, res) => {
	infoLogger.verbose(req, 'write');
	const { username, text } = req.body;
	pgClient
		.query(PERSONS_INSERT_QUERY, [username, text])
		.then(() => {
			infoLogger.verbose('added to the DB: ', username, text);
			res.json({ status: 'added', success: 'ok' });
		})
		.catch((err) => {
			errLogger.error('error posting', err);
			res.json({ status: 'not addedd', success: 'no' });
		});
});
serveExp.post('/register', (req, res) => {
	const { username, password } = req.body;
	pgClient
		.query(PROFILES_INSERT_QUERY, [username, password])
		.then(() => {
			infoLogger.info('added to the DB: ', username);
			res.json({ status: 'added', success: 'ok' });
		})
		.catch((err) => {
			errLogger.error('error posting', err);
			res.json({ status: 'not addedd', success: 'no' });
		});
});

//Port listening
serveExp.listen(serverPort, () => {
	console.log(
		`NoteApp server is running at port http://localhost:${serverPort}`
	);
	console.log(`NoteApp DB is running at port http://localhost:${DBport}`);
});
