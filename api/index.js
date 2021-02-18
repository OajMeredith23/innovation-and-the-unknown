import express from 'express';
import bodyParser from 'body-parser';


const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.listen(PORT, () => { console.log(`Listening on Port: http://localhost:${PORT}`) });


app.get('/', async (req, res) => {
    res.send('hello-world')
});

app.get('/data', async (req, res) => {
    res.send({
        oh: 'hi'
    })
});
