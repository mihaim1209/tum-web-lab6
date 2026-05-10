import { useState, useEffect } from 'react';
import api from '../lib/api';

export default function TokenManager() {
  const [tokenInfo, setTokenInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchToken = async (perms = ['READ','WRITE']) => {
    setLoading(true);
    try {
      const info = await api.getToken(perms);
      setTokenInfo(info);
    } catch (err) {
      setTokenInfo({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const existing = localStorage.getItem('demo_token');
    if (!existing) fetchToken(['READ','WRITE','DELETE']);
  }, []);

  return (
    <div className="token-manager">
      <button className="btn btn-ghost" onClick={() => fetchToken(['READ','WRITE','DELETE'])} disabled={loading}>
        {loading ? 'Requesting token...' : 'Get demo token'}
      </button>
      {tokenInfo && tokenInfo.expiresIn && (
        <span className="muted" style={{ marginLeft: 8 }}>expires in {tokenInfo.expiresIn}s</span>
      )}
      {tokenInfo && tokenInfo.error && (
        <span className="muted" style={{ marginLeft: 8, color: 'var(--danger)' }}>{tokenInfo.error}</span>
      )}
    </div>
  );
}
