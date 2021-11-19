import { Router } from 'express';
const router = new Router();
// local modules
import { logger } from '../logger.js';

router.post('/write', (req, res) => {
	logger.verbose(req, 'write');
	const { username, text } = req.body;
	pgClient
		.query(PERSONS_INSERT_QUERY, [username, text])
		.then(() => {
			logger.verbose('added to the DB: ', username, text);
			res.json({ status: 'added', success: 'ok' });
		})
		.catch((err) => {
			errLogger.error('error posting', err);
			res.json({ status: 'not addedd', success: 'no' });
		});
});
export { router };
