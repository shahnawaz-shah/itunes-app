const express = require('express');
const  ITUNES_COUNTRY = (process.env.ITUNES_COUNTRY || 'GB').toUpperCase();
const itunes = require('../services/itunes');

const router = express.Router();

// GET /api/search?term=...@media=...&limit=..
router.get('/search', async (req, res) => {
    try {
        const term = String(req.query.term || '').trim();
        const limit = Math.min(parseInt(req.query.limit, 10) || 25, 50);
        const media = req.query.media;

        if (!term) {
            return res.status(400).json({ message: 'Query param term is needed.' })
        }

        const { items, count } = await itunes.search({
            term,
            media,
            limit,
            country: ITUNES_COUNTRY,
        });

        res.json({ data: items, meta: { count } });
    } catch (err) {
        if (err.code === 'ECONNABORTED') {
            return res.status(504).json({
                message: 'iTunes API timed out'
            });
        }
        res.status(502).json({ message: 'iTunes API error' });
    }
});

// GET /api/music/albums?term=...&limit=...
router.get('/music/albums', async (req, res) => {
  try {
    const term = String(req.query.term || '').trim();
    const limit = Math.min(parseInt(req.query.limit, 10) || 25, 50);

    if (!term) {
      return res.status(400).json({
        error: { code: 'BAD_REQUEST', message: 'Query param "term" is required.' }
      });
    }

    const { items, count } = await itunes.searchAlbums({
      term,
      limit,
      country: ITUNES_COUNTRY
    });

    res.json({ data: items, meta: { count } });
  } catch (err) {
    if (err.code === 'ECONNABORTED') {
      return res
        .status(504)
        .json({ message: 'iTunes API timed out'  });
    }
    res
      .status(502)
      .json({ message: 'iTunes API error' });
  }
});
module.exports = router;