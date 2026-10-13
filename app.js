const express = require('express');
const cors = require('cors');
const moviesRouter = require('./routers/movies');
const notFound = require('./middlewares/notFound');
const errorsHandler = require('./middlewares/errorsHandler');

const app = express();
const port = process.env.PORT || 3000;

// CORS (parte 2, webapp-react): permetto le chiamate dal frontend React
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Movies API');
});

app.use('/api/movies', moviesRouter);

app.use(errorsHandler);
app.use(notFound);

app.listen(port, () => {
  console.log(`Server in ascolto su http://localhost:${port}`);
});
