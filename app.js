const express = require('express')
const app = express()

const port = process.env.SERVER_PORT;
const moviesRouter = require('./Router/movies')

app.use('/movies', moviesRouter)

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
})

