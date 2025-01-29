const connection = require('../data/db')

const index = (req, res) => {

    let sql = `SELECT * FROM movies`
    const filter = req.query;
    console.log(req.query);

    const params = [];
    const conditions = [];

    if (filter.search) {
        conditions.push('title LIKE ?')
        params.push(`%${filter.search}%`)
    }

    // if (filter.genre) {
    //     conditions.push("genre = ?");
    //     params.push(filter.genre);
    // }

    for (const key in req.query) {
        if (key !== "search") {
            conditions.push(`${key} = ?`)
            params.push(req.query[key])
        }
    }

    if (conditions.length > 0) {
        sql += ` WHERE ${conditions.join(" AND ")}`;
    }

    connection.query(sql, params, (err, results) => {

        if (err) return res.status(500).json({ error: 'Query non ottimale' })
        return res.status(200).json({
            status: "success",
            data: results
        })
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

const create = (req, res, next) => {

    const movie_id = req.params.id;
    const { name, vote, text } = req.body;

    const sql = `
    INSERT INTO reviews(movie_id, name, vote, text)
    VALUES (?, ?, ?, ?);
    `

    connection.query(sql, [movie_id, name, vote, text], (err, results) => {

        if (err) return res.status(500).json({ error: 'Query non ottimale' })
        return res.status(200).json({
            status: "success",
            data: results
        })
    })
}

module.exports = {
    index,
    show,
    create
}