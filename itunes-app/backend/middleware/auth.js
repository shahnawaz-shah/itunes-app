const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret'; 

function auth(req, res, next) {
  // Read the header safely (case-insensitive). May be undefined.
  const authHeader = req.get('authorization') || req.headers.authorization || '';

  // Expect "Bearer <token>"
  const match = authHeader.match(/^Bearer\s+(.+)$/i);
  if (!match) {
    return res
      .status(401)
      .json({ error: { code: 'UNAUTHORIZED', message: 'Missing Bearer token' } });
  }

  const token = match[1].trim();

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.scope !== 'search') {
      return res
        .status(403)
        .json({ error: { code: 'FORBIDDEN', message: 'Insufficient scope' } });
    }
    req.user = decoded;
    next();
  } catch {
    return res
      .status(401)
      .json({ error: { code: 'UNAUTHORIZED', message: 'Invalid or expired token' } });
  }
};

module.exports = auth;