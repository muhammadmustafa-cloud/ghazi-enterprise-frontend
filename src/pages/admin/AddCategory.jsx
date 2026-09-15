import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, FolderPlus } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { createCategory } from '../../services/api';

export default function AddCategory() {
  const [form, setForm] = useState({ id: '', name: '', image: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      await createCategory(form);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      setForm({ id: '', name: '', image: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create category.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-5 py-3.5 rounded-2xl border-2 border-gray-100 bg-gray-50 text-secondary font-medium focus:outline-none focus:border-primary focus:bg-white transition-all";
  const labelClass = "block text-sm font-black text-secondary mb-2 uppercase tracking-wider";

  return (
    <AdminLayout>
      <div className="mb-10">
        <h1 className="text-4xl font-heading font-black text-secondary mb-2">Add New Category</h1>
        <p className="text-text-muted font-medium text-lg">Create a new product category for the store.</p>
      </div>

      <div className="max-w-xl">
        <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
          <h2 className="text-xl font-heading font-black text-secondary mb-6 flex items-center gap-2">
            <FolderPlus className="h-5 w-5 text-primary" /> Category Details
          </h2>

          {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm font-bold rounded-2xl p-4 mb-5">{error}</div>}
          {success && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-green-50 border border-green-200 text-green-700 text-sm font-bold rounded-2xl p-4 mb-5 flex items-center gap-2">
              <CheckCircle className="h-5 w-5" /> Category created successfully!
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className={labelClass}>Category ID (slug)</label>
              <input name="id" value={form.id} onChange={handleChange} required placeholder="e.g., shoe-box" className={inputClass} />
              <p className="text-xs text-gray-400 mt-1.5 font-medium">Lowercase, no spaces, use hyphens. e.g., <code>pizza-cake</code></p>
            </div>
            <div>
              <label className={labelClass}>Category Name</label>
              <input name="name" value={form.name} onChange={handleChange} required placeholder="e.g., Shoe Boxes" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Category Image URL</label>
              <input name="image" value={form.image} onChange={handleChange} placeholder="https://images.unsplash.com/..." className={inputClass} />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-primary hover:bg-primary-hover text-white font-black text-lg rounded-2xl transition-all shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:-translate-y-0.5 disabled:opacity-60"
            >
              {loading ? 'Creating...' : 'Create Category'}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
