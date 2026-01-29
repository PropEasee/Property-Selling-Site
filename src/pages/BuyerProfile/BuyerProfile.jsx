// ...existing code...
import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Calendar, LogOut, Clipboard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function BuyerProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // editing state
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [saving, setSaving] = useState(false);

  const getStoredUserId = () => {
    try {
      const st = localStorage.getItem('user');
      if (!st) return null;
      const u = JSON.parse(st);
      return u?.userId ?? u?.id ?? u?.user_id ?? null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const userId = getStoredUserId();
      if (!userId) {
        setError('User not logged in. Please sign in.');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`http://localhost:8080/api/users/${userId}`);
        if (!res.ok) throw new Error('Failed to fetch user details');
        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError(err.message || 'Error fetching user');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const startEdit = () => {
    setEditName(user?.name ?? '');
    setEditPhone(user?.phone ?? '');
    setEditing(true);
    setError('');
  };

  const cancelEdit = () => {
    setEditing(false);
    setError('');
  };

  const saveEdit = async () => {
    setSaving(true);
    setError('');
    const userId = getStoredUserId();
    if (!userId) {
      setError('User not found in storage.');
      setSaving(false);
      return;
    }

    try {
      const payload = { name: editName, phone: editPhone };
      const res = await fetch(`http://localhost:8080/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Update failed: ${res.status}`);
      }
      const updated = await res.json();
      // update local user state (merge returned fields or fallback to edits)
      setUser(prev => ({ ...prev, name: updated?.name ?? editName, phone: updated?.phone ?? editPhone }));
      setEditing(false);
    } catch (e) {
      setError(e.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };



  if (loading) return <div style={{ padding: 20, textAlign: 'center' }}>Loading profile...</div>;
  if (error) return <div style={{ padding: 20, color: 'red', textAlign: 'center' }}>{error}</div>;
  if (!user) return null;

  const joined = user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—';
  const initials = user.name ? user.name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase() : 'U';

  return (
    <>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        :root{--card-bg:#fff;--muted:#6b7280;--accent:#3b82f6}
        .profile-wrap{max-width:1100px;margin:2rem auto;padding:1rem}
        .card{background:var(--card-bg);border-radius:14px;box-shadow:0 8px 30px rgba(15,23,42,0.06);overflow:hidden}
        .cover{height:160px;background:linear-gradient(90deg,#06b6d4 0%, #3b82f6 100%);position:relative}
        .card-body{display:flex;gap:1.5rem;padding:1.25rem;flex-wrap:wrap}
        .avatar{width:140px;height:140px;border-radius:14px;background:linear-gradient(135deg,#06b6d4,#3b82f6);display:flex;align-items:center;justify-content:center;color:#fff;font-size:48px;font-weight:700;border:6px solid #fff;transform:translateY(-50%)}
        .main{flex:1;min-width:220px}
        .name-row{display:flex;align-items:center;gap:1rem;flex-wrap:wrap}
        .name{font-size:1.75rem;font-weight:700;color:#0f172a}
        .role-badge{background:rgba(59,130,246,0.12);color:var(--accent);padding:6px 10px;border-radius:999px;font-weight:600;font-size:0.9rem}
        .actions{margin-left:auto}
        .btn{padding:8px 14px;border-radius:10px;border:none;cursor:pointer;font-weight:600}
        .btn-logout{background:#fff;border:1px solid #e6eefc;color:var(--accent)}
        .btn-edit { background: #fff; border:1px solid #e6eefc; color: var(--accent); margin-right:8px; }
        .info-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-top:0.9rem}
        .info-card{background:#f8fafc;padding:12px;border-radius:10px;display:flex;gap:12px;align-items:center}
        .info-label{font-size:12px;color:var(--muted);font-weight:600}
        .info-value{font-size:15px;color:#0f172a;font-weight:600}
        .meta-row{display:flex;gap:0.75rem;flex-wrap:wrap;margin-top:1rem}
        .meta-item{background:#ffffff;border:1px solid #eef2ff;padding:10px 12px;border-radius:10px;font-weight:600;color:#0f172a}
        .section{margin-top:1.25rem;padding:1rem;background:#fff;border-top:1px solid #f1f5f9}
        .section h3{margin-bottom:0.75rem}

        /* Contact grid */
        .contact-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
        .contact-card{background:linear-gradient(180deg,#ffffff,#fbfdff);border-radius:12px;padding:14px;display:flex;gap:12px;align-items:flex-start;border:1px solid rgba(59,130,246,0.06)}
        .icon-circle{width:48px;height:48px;border-radius:12px;background:linear-gradient(135deg,#e0f2fe,#bfdbfe);display:flex;align-items:center;justify-content:center;color:#0f172a;flex-shrink:0}
        .card-label{font-size:12px;color:var(--muted);font-weight:700}
        .card-value{font-size:15px;color:#0f172a;font-weight:800;margin-top:4px}
        .contact-actions{margin-top:10px;display:flex;gap:8px}
        .action-btn{background:linear-gradient(90deg,#3b82f6,#06b6d4);color:#fff;padding:8px 10px;border-radius:8px;border:none;cursor:pointer;font-weight:700;font-size:13px}
        .action-outline{background:#fff;border:1px solid #e6eefc;color:var(--accent);padding:8px 10px;border-radius:8px;cursor:pointer;font-weight:700}
        .small-note{font-size:12px;color:var(--muted);margin-top:6px}

        @media (max-width:1000px){
          .contact-grid{grid-template-columns:repeat(2,1fr)}
        }
        @media (max-width:600px){
          .contact-grid{grid-template-columns:1fr}
          .card-body{flex-direction:column}
        }
        @media (max-width:800px){
          .info-grid{grid-template-columns:1fr}
          .actions{width:100%}
          .name{font-size:1.3rem}
          .avatar{width:110px;height:110px}
        }
      `}</style>

      <div className="profile-wrap">
        <div className="card">
          <div className="cover" />
          <div className="card-body">
            <div>
              <div className="avatar" aria-hidden>{initials}</div>
            </div>

            <div className="main">
              <div className="name-row">
                <div style={{ flex: 1 }}>
                  {!editing ? (
                    <>
                      <div className="name">{user.name}</div>
                      <div style={{ color: 'var(--muted)', marginTop: 6 }}>{user.email}</div>
                    </>
                  ) : (
                    <>
                      <input value={editName} onChange={e => setEditName(e.target.value)} style={{ fontSize: '1.3rem', padding: 8, borderRadius: 8, border: '1px solid #e5e7eb', width: '100%' }} />
                      <input value={editPhone} onChange={e => setEditPhone(e.target.value)} style={{ marginTop: 8, padding: 8, borderRadius: 8, border: '1px solid #e5e7eb', width: '100%' }} />
                    </>
                  )}
                </div>

                <div style={{ marginLeft: '8px' }}>
                  <span className="role-badge">{user.role}</span>
                </div>

                <div className="actions" style={{ marginLeft: 'auto' }}>
                  {!editing ? (
                    <>
                      <button className="btn btn-edit" onClick={startEdit}><Clipboard size={14} style={{ verticalAlign:'middle', marginRight:6 }} /> Edit</button>
                      <button className="btn btn-logout" onClick={handleLogout}><LogOut size={16} style={{ verticalAlign:'middle', marginRight:8 }} /> Logout</button>
                    </>
                  ) : (
                    <>
                      <button className="btn btn-edit" onClick={saveEdit} disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
                      <button className="btn btn-logout" onClick={cancelEdit}>Cancel</button>
                    </>
                  )}
                </div>
              </div>

              <div className="info-grid" aria-hidden>
                <div className="info-card">
                  <Mail size={20} />
                  <div>
                    <div className="info-label">Email</div>
                    <div className="info-value">{user.email}</div>
                  </div>
                </div>

                <div className="info-card">
                  <Phone size={20} />
                  <div>
                    <div className="info-label">Phone</div>
                    <div className="info-value">{editing ? editPhone || '—' : user.phone ?? '—'}</div>
                  </div>
                </div>

                <div className="info-card">
                  <User size={20} />
                  <div>
                    <div className="info-label">User ID</div>
                    <div className="info-value">{user.userId ?? '—'}</div>
                  </div>
                </div>

                <div className="info-card">
                  <Calendar size={20} />
                  <div>
                    <div className="info-label">Joined</div>
                    <div className="info-value">{joined}</div>
                  </div>
                </div>
              </div>

              <div className="meta-row" style={{ marginTop: 14 }}>
                <div className="meta-item">Role: {user.role}</div>
                <div className="meta-item">Verified: {user.email ? 'Yes' : 'No'}</div>
              </div>
            </div>
          </div>

          <div className="section">
            <h3>Contact & Details</h3>

            <div className="contact-grid">
              {/* Email card */}
              <div className="contact-card">
                <div className="icon-circle"><Mail size={20} /></div>
                <div style={{flex:1}}>
                  <div className="card-label">Email</div>
                  <div className="card-value">{user.email}</div>
                  
                </div>
              </div>

              {/* Phone card */}
              <div className="contact-card">
                <div className="icon-circle"><Phone size={20} /></div>
                <div style={{flex:1}}>
                  <div className="card-label">Phone</div>
                  <div className="card-value">{editing ? editPhone || '—' : user.phone ?? '—'}</div>
                  
                </div>
              </div>

              {/* Joined / ID card */}
              <div className="contact-card">
                <div className="icon-circle"><User size={20} /></div>
                <div style={{flex:1}}>
                  <div className="card-label">Member Since</div>
                  <div className="card-value">{joined}</div>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
// ...existing code...