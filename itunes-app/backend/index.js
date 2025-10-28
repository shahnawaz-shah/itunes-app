require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const tokenRouter = require('./routes/token');   // POST /api/token
const searchRouter = require('./routes/search'); // /api/search, /api/music/albums
const auth = require('./middleware/auth');       // JWT guard


const app = express();

app.use(cors({
   origin: 'http://localhost:5173',
   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
   allowedHeaders: ['Content-Type', 'Authorization'],
   maxAge: 86400,
}));

// global parsers
app.disable('x-powered-by');
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: false }));

// health check
app.get('/health', (req, res) => res.json({ ok: true }));

// Public route: issue JWT
app.use('/api/token', tokenRouter);

// Protected routes
app.use('/api', auth, searchRouter);

// 404 fallback
app.use((req, res) => res.status(404).json({ message: 'API route not found' }));

//start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
   console.log(`**Server is listening on port ${PORT}**`);
});