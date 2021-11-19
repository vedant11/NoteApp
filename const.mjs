export const SQL_SEARCH_QUERY = 'SELECT * FROM persons WHERE username = $1';
export const CREATE_TABLE = (text) =>
	`CREATE TABLE ${text} (username text NOT NULL PRIMARY KEY,text text);`;
export const TABLE_CHECK = (table_name) => `SELECT * FROM ${table_name}`;
export const PERSONS_INSERT_QUERY =
	'INSERT INTO persons(username, text) VALUES($1, $2)';
export const PROFILES_INSERT_QUERY =
	'INSERT INTO profiles(username,password) VALUES($1,$2)';

/*
logs:
    message
    timestamp
    log level
    source
    destination
*/
