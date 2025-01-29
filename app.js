const express = require('express')
const app = express()
const cors = require('cors')

const port = process.env.SERVER_PORT;
const moviesRouter = require('./Router/movies')

app.use(express.json());
app.use(express.static('public'));
app.use(cors({
    origin: "http://localhost:5173"
}));    //permette di fare richieste da un altro server

app.use('/movies', moviesRouter)

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
})

