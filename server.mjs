import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import knex from 'knex';


// Init processes and configs
dotenv.config();
const DBport = process.env.PORT;
const serverPort = process.env.SERV_PORT;
const knexConfig = {
    client: 'pg',
    connection: {
        host: process.env.HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    },
    pool: { min: 0, max: 7 }
}


// Init apps
var db = knex(knexConfig);
let app = express();
// creating new table if doesn't exist
db.schema.hasTable('persons').then(exists => {
    if (exists === true)
        console.log('exists');
    else {
        console.log('doesnt exist');
        db.schema.createTable('persons', table => {
            table.increments('id');
            table.string('username');
            table.string('text');
        }).then();
    }
});


// middleware
app.use(bodyParser.json());

//server handlers
app.get('/users', (req, res) => {
    const msg = 'your notes are safe';
    res.send(JSON.stringify(msg));
});

app.post('/register', (req, res) => {
    const { firstname, lastname, city } = req.body;
    db('persons').insert({
        lastname: firstname,
        firstname: lastname,
        address: 'bs',
        city: city
    }).then(console.log);
    res.end('success');
});

//Port listening
app.listen(serverPort, () => {
    console.log(`NoteApp server is running at port http://localhost:${serverPort}`);
    console.log(`NoteApp DB is running at port http://localhost:${DBport}`);
});