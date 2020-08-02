import express from 'express';
import bodyParser from 'body-parser';
const port = 5000;
let app = express();

app.get('/users', (req, res) => {
    const msg = 'your notes';
    res.send(JSON.stringify(msg));
});

app.listen(port, () => {
    console.log('NoteApp server is running at port http://localhost:' + port);
});