const connection = require('../data/db')

const index = (req, res) => {

    const sql = `SELECT * FROM movies`

    connection.query(sql, (err, results) => {

        if (err) return res.status(500).json({ error: 'Query non ottimale' })
        res.json(results)
    })
};

const show = (req, res) => {

    const id = req.params.id
    const sql = `SELECT * FROM movies WHERE id =?`

    const reviews = `
        SELECT * FROM movies_db.reviews
        join movies on movies.id = reviews.movie_id
        where movies.id = 1
    `

    connection.query(sql, [id], (err, results) => {

        if (err) return res.status(500).json({ error: 'Query non ottimale' })
        if (results.length === 0) { res.status(404).json({ error: err }) }
        res.json(results)
    })
}

module.exports = {
    index,
    show
}