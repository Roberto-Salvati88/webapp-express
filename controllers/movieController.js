const connection = require('../data/db');

// costruisce l'URL completo dell'immagine a partire dal nome del file salvato nel db
function imagePath(req, image) {
  return image ? `${req.protocol}://${req.get('host')}/imgs/${image}` : null;
}

// index: lista dei film
function index(req, res, next) {
  const sql = 'SELECT * FROM movies';

  connection.query(sql, (err, results) => {
    if (err) return next(err);

    const movies = results.map(movie => ({ ...movie, image: imagePath(req, movie.image) }));
    res.json(movies);
  });
}

// show: dettaglio di un film CON le sue recensioni (due query)
function show(req, res, next) {
  const { id } = req.params;

  // prepared statement: il ? viene sostituito da mysql2 in modo sicuro (niente SQL injection)
  const movieSql = 'SELECT * FROM movies WHERE id = ?';
  const reviewsSql = 'SELECT * FROM reviews WHERE movie_id = ? ORDER BY created_at DESC';

  connection.query(movieSql, [id], (err, movieResults) => {
    if (err) return next(err);
    if (movieResults.length === 0) {
      return res.status(404).json({ error: 'Not Found', message: 'Film non trovato' });
    }

    const movie = { ...movieResults[0], image: imagePath(req, movieResults[0].image) };

    connection.query(reviewsSql, [id], (err, reviewsResults) => {
      if (err) return next(err);

      movie.reviews = reviewsResults;
      res.json(movie);
    });
  });
}

// storeReview: salva una nuova recensione legata al film
function storeReview(req, res, next) {
  const { id } = req.params;
  const { name, vote, text } = req.body;

  // validazione lato server: il frontend non basta mai
  const numericVote = parseInt(vote);
  if (!name || !numericVote || numericVote < 1 || numericVote > 5) {
    return res.status(400).json({ error: 'Bad Request', message: 'Nome e voto (da 1 a 5) sono obbligatori' });
  }

  const sql = 'INSERT INTO reviews (movie_id, name, vote, text) VALUES (?, ?, ?, ?)';

  connection.query(sql, [id, name, numericVote, text], (err, results) => {
    if (err) return next(err);

    res.status(201).json({ id: results.insertId, movie_id: parseInt(id), name, vote: numericVote, text });
  });
}

module.exports = { index, show, storeReview };
