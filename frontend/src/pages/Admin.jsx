import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from '../lib/axios';
import toast from 'react-hot-toast';
import {
  LayoutDashboard, UtensilsCrossed, ShoppingBag, Calendar, Plus, Pencil, Trash2,
  X, TrendingUp, Users, Star, DollarSign, Check, Clock, Coffee
} from 'lucide-react';

const TABS = ['Dashboard', 'Menu', 'Orders', 'Bookings'];

const CATEGORIES = ['Coffee', 'Milkshake', 'Pizza', 'Pasta', 'Dessert', 'Snacks'];

const defaultItem = { name: '', category: 'Coffee', price: '', description: '', image: '', badge: '' };

// ─── Admin Login ──────────────────────────────────────────────────────────────
function AdminLogin({ onLogin }) {
  const [creds, setCreds] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/api/auth/login', creds);
      localStorage.setItem('adminToken', res.data.token);
      onLogin(res.data.token);
    } catch {
      // Demo mode: accept hardcoded credentials
      if (creds.username === 'admin' && creds.password === 'venissa@admin2024') {
        localStorage.setItem('adminToken', 'demo_token');
        onLogin('demo_token');
      } else {
        toast.error('Invalid credentials');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 md:p-10 rounded-2xl w-full max-w-sm space-y-6"
      >
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-gradient-to-br from-[#D4A853] to-[#F5C842] rounded-2xl flex items-center justify-center mx-auto">
            <Coffee className="w-7 h-7 text-black" />
          </div>
          <h2 className="font-display text-2xl font-bold text-white">Admin Login</h2>
          <p className="text-white/40 text-sm">Venissa Cafe Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-white/60 text-sm">Username</label>
            <input
              type="text"
              value={creds.username}
              onChange={(e) => setCreds({ ...creds, username: e.target.value })}
              placeholder="admin"
              className="input-field"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-white/60 text-sm">Password</label>
            <input
              type="password"
              value={creds.password}
              onChange={(e) => setCreds({ ...creds, password: e.target.value })}
              placeholder="••••••••"
              className="input-field"
              required
            />
          </div>
          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading && (
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }} className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full" />
            )}
            Sign In to Dashboard
          </motion.button>
        </form>
        <p className="text-white/25 text-xs text-center">
          Demo: admin / venissa@admin2024
        </p>
      </motion.div>
    </main>
  );
}

// ─── Menu Modal ───────────────────────────────────────────────────────────────
function MenuModal({ item, onClose, onSave }) {
  const [form, setForm] = useState(item || defaultItem);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!form.name || !form.price) { toast.error('Name and price are required'); return; }
    setSaving(true);
    try {
      await onSave(form);
      onClose();
    } catch { toast.error('Failed to save'); }
    finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative glass-card rounded-2xl p-6 w-full max-w-lg z-10 space-y-4"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-white font-semibold text-lg">{item?._id ? 'Edit Item' : 'Add New Item'}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/[0.07] transition-colors"><X className="w-5 h-5 text-white/60" /></button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2 space-y-1">
            <label className="text-white/60 text-xs">Item Name *</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Caramel Latte" className="input-field text-sm py-2.5" />
          </div>
          <div className="space-y-1">
            <label className="text-white/60 text-xs">Category</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input-field text-sm py-2.5 cursor-pointer">
              {CATEGORIES.map((c) => <option key={c} value={c} className="bg-[#1a1a1a]">{c}</option>)}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-white/60 text-xs">Price (₹) *</label>
            <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="299" className="input-field text-sm py-2.5" />
          </div>
          <div className="col-span-2 space-y-1">
            <label className="text-white/60 text-xs">Image URL</label>
            <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://..." className="input-field text-sm py-2.5" />
          </div>
          <div className="col-span-2 space-y-1">
            <label className="text-white/60 text-xs">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} placeholder="Short description..." className="input-field text-sm py-2.5 resize-none" />
          </div>
          <div className="col-span-2 space-y-1">
            <label className="text-white/60 text-xs">Badge (optional)</label>
            <input value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} placeholder="Best Seller, New, Chef's Pick..." className="input-field text-sm py-2.5" />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button onClick={onClose} className="flex-1 btn-outline text-sm py-2.5">Cancel</button>
          <motion.button whileTap={{ scale: 0.97 }} onClick={handleSave} disabled={saving} className="flex-1 btn-primary text-sm py-2.5 flex items-center justify-center gap-2 disabled:opacity-70">
            {saving ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }} className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full" /> : <Check className="w-4 h-4" />}
            {item?._id ? 'Update' : 'Add'} Item
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main Admin Dashboard ─────────────────────────────────────────────────────
export default function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem('adminToken'));
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [menuItems, setMenuItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [modalItem, setModalItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    if (!token) return;
    fetchAll();
  }, [token]);

  const fetchAll = async () => {
    try {
      const [m, o, b] = await Promise.all([
        axios.get('/api/menu'),
        axios.get('/api/orders', authHeader),
        axios.get('/api/bookings', authHeader),
      ]);
      setMenuItems(m.data || []);
      setOrders(o.data || []);
      setBookings(b.data || []);
    } catch {
      // Demo mode: show empty state
    }
  };

  const handleSaveMenuItem = async (item) => {
    if (item._id) {
      await axios.put(`/api/menu/${item._id}`, item, authHeader);
      setMenuItems((prev) => prev.map((m) => (m._id === item._id ? item : m)));
      toast.success('Item updated!');
    } else {
      const res = await axios.post('/api/menu', item, authHeader);
      setMenuItems((prev) => [...prev, res.data]);
      toast.success('Item added!');
    }
  };

  const handleDeleteMenuItem = async (id) => {
    if (!window.confirm('Delete this menu item?')) return;
    try {
      await axios.delete(`/api/menu/${id}`, authHeader);
      setMenuItems((prev) => prev.filter((m) => m._id !== id));
      toast.success('Item deleted');
    } catch { toast.error('Failed to delete'); }
  };

  const handleUpdateOrderStatus = async (id, status) => {
    try {
      await axios.put(`/api/orders/${id}`, { status }, authHeader);
      setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, status } : o)));
      toast.success('Order status updated');
    } catch { toast.error('Update failed'); }
  };

  if (!token) return <AdminLogin onLogin={setToken} />;

  const stats = [
    { icon: DollarSign, label: 'Total Revenue', value: `₹${orders.reduce((s, o) => s + (o.total || 0), 0).toLocaleString()}`, color: 'text-green-400' },
    { icon: ShoppingBag, label: 'Total Orders', value: orders.length, color: 'text-blue-400' },
    { icon: Calendar, label: 'Bookings', value: bookings.length, color: 'text-purple-400' },
    { icon: UtensilsCrossed, label: 'Menu Items', value: menuItems.length, color: 'text-[#D4A853]' },
  ];

  return (
    <main className="min-h-screen pt-20">
      <AnimatePresence>
        {showModal && (
          <MenuModal
            item={modalItem}
            onClose={() => { setShowModal(false); setModalItem(null); }}
            onSave={handleSaveMenuItem}
          />
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between py-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-white/40 text-sm mt-1">Venissa Cafe & Kitchen</p>
          </div>
          <button
            onClick={() => { localStorage.removeItem('adminToken'); setToken(null); }}
            className="text-white/40 text-sm hover:text-red-400 transition-colors"
          >
            Sign Out
          </button>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto scrollbar-none mb-8">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-[#D4A853] to-[#F5C842] text-black shadow-[0_0_20px_rgba(212,168,83,0.3)]'
                  : 'glass-card text-white/60 hover:text-white border border-white/[0.08]'
              }`}
            >
              {tab === 'Dashboard' && <LayoutDashboard className="w-4 h-4" />}
              {tab === 'Menu' && <UtensilsCrossed className="w-4 h-4" />}
              {tab === 'Orders' && <ShoppingBag className="w-4 h-4" />}
              {tab === 'Bookings' && <Calendar className="w-4 h-4" />}
              {tab}
            </button>
          ))}
        </div>

        {/* ─── Dashboard Tab ─────────────────────────────────── */}
        {activeTab === 'Dashboard' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-5 rounded-xl space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.05] flex items-center justify-center">
                    <s.icon className={`w-5 h-5 ${s.color}`} />
                  </div>
                  <div>
                    <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                    <div className="text-white/40 text-xs mt-0.5">{s.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Recent */}
            <div className="grid lg:grid-cols-2 gap-5">
              <div className="glass-card p-5 rounded-xl space-y-3">
                <h3 className="text-white font-semibold text-sm flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-[#D4A853]" /> Recent Orders
                </h3>
                {orders.slice(0, 5).length === 0 ? (
                  <p className="text-white/30 text-sm py-4 text-center">No orders yet</p>
                ) : (
                  orders.slice(0, 5).map((o) => (
                    <div key={o._id} className="flex justify-between items-center py-2 border-b border-white/[0.05] last:border-0 text-sm">
                      <div>
                        <p className="text-white font-medium">{o.customer?.name || 'Customer'}</p>
                        <p className="text-white/40 text-xs">₹{o.total}</p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-medium ${
                        o.status === 'delivered' ? 'bg-green-500/15 text-green-400' :
                        o.status === 'preparing' ? 'bg-yellow-500/15 text-yellow-400' :
                        'bg-blue-500/15 text-blue-400'
                      }`}>{o.status || 'pending'}</span>
                    </div>
                  ))
                )}
              </div>
              <div className="glass-card p-5 rounded-xl space-y-3">
                <h3 className="text-white font-semibold text-sm flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#D4A853]" /> Upcoming Bookings
                </h3>
                {bookings.slice(0, 5).length === 0 ? (
                  <p className="text-white/30 text-sm py-4 text-center">No bookings yet</p>
                ) : (
                  bookings.slice(0, 5).map((b) => (
                    <div key={b._id} className="flex justify-between items-center py-2 border-b border-white/[0.05] last:border-0 text-sm">
                      <div>
                        <p className="text-white font-medium">{b.name}</p>
                        <p className="text-white/40 text-xs">{b.date} · {b.time} · {b.guests} guests</p>
                      </div>
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* ─── Menu Tab ──────────────────────────────────────── */}
        {activeTab === 'Menu' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-white/50 text-sm">{menuItems.length} items in menu</p>
              <button onClick={() => { setModalItem(null); setShowModal(true); }} className="btn-primary text-sm flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Item
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {menuItems.length === 0 ? (
                <div className="col-span-full glass-card p-12 rounded-2xl text-center space-y-3">
                  <UtensilsCrossed className="w-12 h-12 text-white/20 mx-auto" />
                  <p className="text-white/50">No menu items. Add your first item!</p>
                  <button onClick={() => { setModalItem(null); setShowModal(true); }} className="btn-primary text-sm">
                    <Plus className="w-4 h-4 inline mr-1" /> Add Item
                  </button>
                </div>
              ) : (
                menuItems.map((item) => (
                  <motion.div key={item._id} layout className="glass-card rounded-xl overflow-hidden">
                    {item.image && (
                      <img src={item.image} alt={item.name} className="w-full h-36 object-cover" />
                    )}
                    <div className="p-4 space-y-2">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <p className="text-[#D4A853]/70 text-[10px] font-mono uppercase">{item.category}</p>
                          <h4 className="text-white font-semibold text-sm">{item.name}</h4>
                        </div>
                        <span className="text-[#D4A853] font-bold text-sm flex-shrink-0">₹{item.price}</span>
                      </div>
                      {item.description && <p className="text-white/40 text-xs line-clamp-2">{item.description}</p>}
                      <div className="flex gap-2 pt-1">
                        <button onClick={() => { setModalItem(item); setShowModal(true); }} className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] text-white/60 hover:text-white text-xs transition-colors">
                          <Pencil className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button onClick={() => handleDeleteMenuItem(item._id)} className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs hover:bg-red-500/20 transition-colors">
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}

        {/* ─── Orders Tab ────────────────────────────────────── */}
        {activeTab === 'Orders' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            {orders.length === 0 ? (
              <div className="glass-card p-12 rounded-2xl text-center space-y-3">
                <ShoppingBag className="w-12 h-12 text-white/20 mx-auto" />
                <p className="text-white/50">No orders yet</p>
              </div>
            ) : (
              orders.map((order) => (
                <motion.div key={order._id} layout className="glass-card p-5 rounded-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-white font-semibold">{order.customer?.name || 'Customer'}</h4>
                        <span className="text-white/30 text-xs">#{order._id?.slice(-6)}</span>
                      </div>
                      <p className="text-white/50 text-sm">{order.customer?.phone} · {order.customer?.address}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {order.items?.map((item, i) => (
                          <span key={i} className="text-white/40 text-xs glass-card px-2 py-0.5 rounded-full border border-white/[0.06]">
                            {item.name} ×{item.quantity}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-[#D4A853] font-bold">₹{order.total}</span>
                      <select
                        value={order.status || 'pending'}
                        onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                        className="input-field text-xs py-1.5 w-36 cursor-pointer"
                      >
                        {['pending', 'confirmed', 'preparing', 'out for delivery', 'delivered', 'cancelled'].map((s) => (
                          <option key={s} value={s} className="bg-[#1a1a1a] capitalize">{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        )}

        {/* ─── Bookings Tab ──────────────────────────────────── */}
        {activeTab === 'Bookings' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            {bookings.length === 0 ? (
              <div className="glass-card p-12 rounded-2xl text-center space-y-3">
                <Calendar className="w-12 h-12 text-white/20 mx-auto" />
                <p className="text-white/50">No bookings yet</p>
              </div>
            ) : (
              bookings.map((b) => (
                <motion.div key={b._id} layout className="glass-card p-5 rounded-xl grid sm:grid-cols-4 gap-4 items-center">
                  <div className="sm:col-span-2">
                    <h4 className="text-white font-semibold">{b.name}</h4>
                    <p className="text-white/50 text-sm">{b.email} · {b.phone}</p>
                    {b.occasion && <span className="text-[#D4A853] text-xs">{b.occasion}</span>}
                  </div>
                  <div className="text-sm text-white/60">
                    <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-[#D4A853]" />{b.date}</div>
                    <div className="flex items-center gap-1.5 mt-1"><Clock className="w-3.5 h-3.5 text-[#D4A853]" />{b.time}</div>
                  </div>
                  <div className="flex items-center gap-3 justify-start sm:justify-end">
                    <div className="flex items-center gap-1.5 text-sm text-white/60">
                      <Users className="w-4 h-4 text-[#D4A853]" />{b.guests} guests
                    </div>
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </div>
    </main>
  );
}
