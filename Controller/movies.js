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

    const sqlReviews = `
        SELECT * 
        FROM movies_db.reviews
        join movies 
        on movies.id = reviews.movie_id
        where movies.id = ?
    `

    connection.query(sql, [id], (err, results) => {

        if (err) { return res.status(500).json({ error: 'Query non ottimale' }) }
        if (results.length === 0) { return res.status(404).json({ error: 'id non valido' }) }
        // res.json(results)

        connection.query(sqlReviews, [id], (err, reviews) => {
            if (err) return res.status(500).json({ error: 'Query non ottimale' })
            return res.status(200).json({
                status: "success",
                data: {
                    ...results[0],
                    reviews,
                },
            });
        })
    })

}

module.exports = {
    index,
    show
}