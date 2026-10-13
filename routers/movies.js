const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.get('/', movieController.index);
router.get('/:id', movieController.show);
// parte 3 (18/06): nuova recensione per un film
router.post('/:id/reviews', movieController.storeReview);

module.exports = router;
