import express from 'express';
import { verifyToken, requirePermission } from './auth.js';
import { listExpenses, createExpense, getExpense, updateExpense, removeExpense } from './data.js';

const router = express.Router();

// GET /expenses?skip=0&limit=20&q=string
router.get('/', verifyToken, (req, res) => {
  const skip = parseInt(req.query.skip || '0', 10);
  const limit = parseInt(req.query.limit || '20', 10);
  const q = req.query.q || '';
  const { total, items } = listExpenses({ skip, limit, q });
  res.json({ total, count: items.length, items });
});

router.get('/:id', verifyToken, (req, res) => {
  const e = getExpense(req.params.id);
  if (!e) return res.status(404).json({ error: 'Not found' });
  res.json(e);
});

router.post('/', verifyToken, requirePermission('WRITE'), (req, res) => {
  const data = req.body;
  if (!data.title || data.amount == null) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  const created = createExpense(data);
  res.status(201).json(created);
});

router.put('/:id', verifyToken, requirePermission('WRITE'), (req, res) => {
  const updated = updateExpense(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Not found' });
  res.json(updated);
});

router.delete('/:id', verifyToken, requirePermission('DELETE'), (req, res) => {
  const ok = removeExpense(req.params.id);
  if (!ok) return res.status(404).json({ error: 'Not found' });
  res.status(204).send();
});

export default router;
