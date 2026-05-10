import { v4 as uuidv4 } from 'uuid';

const expenses = [];

export function listExpenses({ skip = 0, limit = 20, q } = {}) {
  let items = expenses;
  if (q) {
    const nq = q.toLowerCase();
    items = items.filter(e => e.title.toLowerCase().includes(nq));
  }
  const total = items.length;
  const page = items.slice(skip, skip + limit);
  return { total, items: page };
}

export function getExpense(id) {
  return expenses.find(e => e.id === id) || null;
}

export function createExpense(data) {
  const e = {
    id: uuidv4(),
    title: data.title || '',
    amount: Number(data.amount) || 0,
    category: data.category || 'other',
    date: data.date || new Date().toISOString().split('T')[0],
    liked: !!data.liked,
  };
  expenses.unshift(e);
  return e;
}

export function updateExpense(id, updates) {
  const i = expenses.findIndex(e => e.id === id);
  if (i === -1) return null;
  const updated = { ...expenses[i], ...updates };
  expenses[i] = updated;
  return updated;
}

export function removeExpense(id) {
  const i = expenses.findIndex(e => e.id === id);
  if (i === -1) return false;
  expenses.splice(i, 1);
  return true;
}
