import express from 'express';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'dev-secret';

export const tokenRouter = express.Router();

// Issue token via POST with JSON body { permissions: ["READ","WRITE"] } or role
tokenRouter.post('/', (req, res) => {
  const { permissions, role } = req.body || {};
  const payload = {};
  if (permissions) payload.PERMISSIONS = permissions;
  if (role) payload.ROLE = role;

  // short expiration for demo (1 minute)
  const token = jwt.sign(payload, SECRET, { expiresIn: '1m' });
  res.json({ token, expiresIn: 60 });
});

// Also support GET /token?permissions=READ,WRITE
tokenRouter.get('/', (req, res) => {
  const { permissions, role } = req.query;
  const payload = {};
  if (permissions) payload.PERMISSIONS = permissions.split(',');
  if (role) payload.ROLE = role;
  const token = jwt.sign(payload, SECRET, { expiresIn: '1m' });
  res.json({ token, expiresIn: 60 });
});

export function verifyToken(req, res, next) {
  const auth = req.headers.authorization || '';
  const m = auth.match(/^Bearer\s+(.+)$/i);
  if (!m) return res.status(401).json({ error: 'Missing token' });
  const token = m[1];
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

export function requirePermission(perm) {
  return (req, res, next) => {
    const { PERMISSIONS = [], ROLE } = req.user || {};
    if (ROLE === 'ADMIN') return next();
    if (PERMISSIONS && PERMISSIONS.includes(perm)) return next();
    return res.status(403).json({ error: 'Forbidden' });
  };
}
