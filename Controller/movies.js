const connection = require('../data/db')

const index = (req, res) => {

    const sql = `SELECT * FROM movies`
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Query non ottimale' })
        res.json(results)
    })
}

module.exports = {
    index
}