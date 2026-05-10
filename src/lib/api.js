const BASE = process.env.VITE_API_BASE || 'http://localhost:4000';

async function request(path, opts = {}) {
  const url = `${BASE}${path}`;
  const res = await fetch(url, opts);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const e = new Error(err.error || res.statusText || 'Request failed');
    e.status = res.status;
    throw e;
  }
  if (res.status === 204) return null;
  return res.json();
}

function getAuthHeader() {
  const token = localStorage.getItem('demo_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export default {
  async getToken(permissions = ['READ','WRITE']) {
    const res = await fetch(`${BASE}/token`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ permissions }),
    });
    const j = await res.json();
    if (j.token) localStorage.setItem('demo_token', j.token);
    return j;
  },
  async listExpenses({ skip = 0, limit = 200 } = {}) {
    const q = `?skip=${skip}&limit=${limit}`;
    return request(`/expenses${q}`, { headers: { ...getAuthHeader() } });
  },
  async createExpense(data) {
    return request(`/expenses`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(data),
    });
  },
  async updateExpense(id, data) {
    return request(`/expenses/${id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(data),
    });
  },
  async deleteExpense(id) {
    return request(`/expenses/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() },
    });
  }
};
