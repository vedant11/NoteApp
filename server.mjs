import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import pg from 'pg';

// Init processes and configs
dotenv.config();
const DBport = process.env.DB_PORT;
const serverPort = process.env.SERV_PORT;
const pgconfig = {
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
}
const pgClient = new pg.Client(pgconfig);


// Init serveExps
pgClient.connect();
let serveExp = express();


// creating new table if doesn't exist
pgClient.query('SELECT * from persons', (err, res) => {
    if (err) {
        pgClient.query('CREATE TABLE persons (username text NOT NULL PRIMARY KEY,text text);'
        ).then(() => {
            console.log('added new table for notes');
        }).catch((err) => {
            console.log('err adding table for notes', err);
        })
    }
    else
        console.log('table exists for notes');
});
pgClient.query('SELECT * from profiles', (err, res) => {
    if (err) {
        pgClient.query('CREATE TABLE profiles (username text NOT NULL PRIMARY KEY,password text);'
        ).then(() => {
            console.log('added new table for profiles');
        }).catch((err) => {
            console.log('err adding table for profile', err);
        })
    }
    else
        console.log('table exists for profile');
});


// middleware
serveExp.use(bodyParser.json());


//server handlers
const SQL_SEARCH_QUERY = 'SELECT * FROM persons WHERE username = $1';
serveExp.get('/users/:username', (req, res) => {
    const { username } = req.params;
    console.log(username, 'requested');
    pgClient.query(SQL_SEARCH_QUERY, [username]
    ).then((data) => {
        res.send(JSON.stringify(data.rows[0].text));
        console.log('served the req');
    }).catch((err) => {
        console.log('error serving the req', err);
    });
});

const PERSONS_INSERT_QUERY = 'INSERT INTO persons(username, text) VALUES($1, $2)';
const PROFILES_INSERT_QUERY = 'INSERT INTO profiles(username,password) VALUES($1,$2)';
serveExp.post('/write', (req, res) => {
    console.log(req, 'write');
    const { username, text } = req.body;
    pgClient.query(PERSONS_INSERT_QUERY, [username, text]
    ).then(() => {
        console.log('added to the DB: ', username, text);
        res.json({ status: 'added', success: 'ok' });
    }).catch((err) => {
        // console.log('error posting', err);
        res.json({ status: 'not addedd', success: 'no' });
    });
});
serveExp.post('/register', (req, res) => {
    console.log('hello');
    const { username, password } = req.body;
    pgClient.query(PROFILES_INSERT_QUERY, [username, password]
    ).then(() => {
        console.log('added to the DB: ', username);
        res.json({ status: 'added', success: 'ok' });
    }).catch((err) => {
        // console.log('error posting', err);
        res.json({ status: 'not addedd', success: 'no' });
    });
});


//Port listening
serveExp.listen(serverPort, () => {
    console.log(`NoteApp server is running at port http://localhost:${serverPort}`);
    console.log(`NoteApp DB is running at port http://localhost:${DBport}`);
});