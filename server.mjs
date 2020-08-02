import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import pg from 'pg';

// Init processes and configs
dotenv.config();
const DBport = process.env.PORT;
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
            console.log('added new table');
        }).catch((err) => {
            console.log('err adding table', err);
        })
    }
    else
        console.log('table exists');
    // pgClient.end();
});


// middleware
serveExp.use(bodyParser.json());



//server handlers
serveExp.get('/users', (req, res) => {
    const msg = 'your notes are safe';
    res.send(JSON.stringify(msg));
});

const Qtext = 'INSERT INTO persons(username, text) VALUES($1, $2)';
serveExp.post('/register', (req, res) => {
    const { username, text } = req.body;
    pgClient.query(Qtext, [username, text]
    ).then(() => {
        console.log('added to the DB: ', username, text);
        res.json({ status: 'added', success: 'ok' });
    }).catch((err) => {
        console.log('error posting', err);
        res.json({ status: 'not addedd', success: 'no' });
    });
});


//Port listening
serveExp.listen(serverPort, () => {
    console.log(`NoteApp server is running at port http://localhost:${serverPort}`);
    console.log(`NoteApp DB is running at port http://localhost:${DBport}`);
});