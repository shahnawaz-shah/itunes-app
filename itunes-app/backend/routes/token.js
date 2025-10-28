const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret'; 

const router = express.Router();

router.post('/', (req, res) => {
    const token = jwt.sign({ scope: 'search' }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

module.exports = router;