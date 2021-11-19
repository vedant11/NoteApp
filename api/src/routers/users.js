import { Router } from 'express';
const router = new Router();
// const
import { SQL_SEARCH_QUERY } from '../const.js';
// local modules
import { logger } from '../logger.js';

router.post('/register', (req, res) => {
	const { username, password } = req.body;
	pgClient
		.query(PROFILES_INSERT_QUERY, [username, password])
		.then(() => {
			logger.info('added to the DB: ', username);
			res.json({ status: 'added', success: 'ok' });
		})
		.catch((err) => {
			logger.error('error posting', err);
			res.json({ status: 'not addedd', success: 'no' });
		});
});
router.get('/data/:username', (req, res) => {
	const { username } = req.params;
	logger.verbose(username, 'requested');
	pgClient
		.query(SQL_SEARCH_QUERY, [username])
		.then((data) => {
			res.send(JSON.stringify(data.rows[0].text));
			logger.verbose('served the req');
		})
		.catch((err) => {
			logger.error('error serving the req', err);
		});
});

export { router };
