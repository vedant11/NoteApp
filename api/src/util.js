import { logger } from './logger.js';
import { CREATE_TABLE, TABLE_CHECK } from './const.js';

export const createTableIfNull = ({ pgClient, table_name }) => {
	pgClient.query(TABLE_CHECK(`${table_name}`), (err) => {
		if (err) {
			pgClient
				.query(CREATE_TABLE(`${table_name}`))
				.then(() => {
					logger.info(`Added new table for ${table_name}`);
				})
				.catch((err) => {
					logger.error(
						`Error while adding new ${table_name} table: `,
						err
					);
				});
		} else logger.info(`Table exists for ${table_name}`);
	});
};
