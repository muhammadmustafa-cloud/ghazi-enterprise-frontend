import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, CheckCircle, Package } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { createProduct, fetchCategories } from '../../services/api';
import { useProductStore } from '../../store/useProductStore';

export default function AddProduct() {
  const addProduct = useProductStore((s) => s.addProduct);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    id: '', name: '', category: '', price: '', dimensions: '',
    ply: '', material: '', condition: 'New', stock: '', description: '', customizable: false,
    images: [''],
    bulkPricing: [{ minQty: '', price: '' }]
  });

  useEffect(() => {
    fetchCategories().then(res => setCategories(res.data));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleImageChange = (index, value) => {
    const updated = [...form.images];
    updated[index] = value;
    setForm(prev => ({ ...prev, images: updated }));
  };

  const handlePricingChange = (index, field, value) => {
    const updated = [...form.bulkPricing];
    updated[index][field] = value;
    setForm(prev => ({ ...prev, bulkPricing: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const payload = {
        ...form,
        price: parseFloat(form.price),
        stock: parseInt(form.stock),
        images: form.images.filter(Boolean),
        bulkPricing: form.bulkPricing.filter(t => t.minQty && t.price).map(t => ({ minQty: parseInt(t.minQty), price: parseFloat(t.price) }))
      };
      await createProduct(payload);
      addProduct(payload);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      setForm({ id: '', name: '', category: '', price: '', dimensions: '', ply: '', material: '', condition: 'New', stock: '', description: '', customizable: false, images: [''], bulkPricing: [{ minQty: '', price: '' }] });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create product.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-5 py-3.5 rounded-2xl border-2 border-gray-100 bg-gray-50 text-secondary font-medium focus:outline-none focus:border-primary focus:bg-white transition-all";
  const labelClass = "block text-sm font-black text-secondary mb-2 uppercase tracking-wider";

  return (
    <AdminLayout>
      <div className="mb-10">
        <h1 className="text-4xl font-heading font-black text-secondary mb-2">Add New Product</h1>
        <p className="text-text-muted font-medium text-lg">Fill in the details below to publish a product to the store.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Column - Main Info */}
        <div className="xl:col-span-2 space-y-6">
          {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm font-bold rounded-2xl p-4">{error}</div>}
          {success && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-green-50 border border-green-200 text-green-700 text-sm font-bold rounded-2xl p-4 flex items-center gap-2">
              <CheckCircle className="h-5 w-5" /> Product created and published successfully!
            </motion.div>
          )}

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-heading font-black text-secondary mb-6 flex items-center gap-2"><Package className="h-5 w-5 text-primary" /> Product Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Product ID</label>
                <input name="id" value={form.id} onChange={handleChange} required placeholder="e.g., nb-003" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Category</label>
                <select name="category" value={form.category} onChange={handleChange} required className={inputClass}>
                  <option value="">Select Category</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Product Name</label>
                <input name="name" value={form.name} onChange={handleChange} required placeholder="e.g., Standard Moving Box 18x18x18" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Base Price (₨)</label>
                <input type="number" name="price" value={form.price} onChange={handleChange} required placeholder="150" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Stock Quantity</label>
                <input type="number" name="stock" value={form.stock} onChange={handleChange} required placeholder="500" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Dimensions</label>
                <input name="dimensions" value={form.dimensions} onChange={handleChange} placeholder="18x18x18 inch" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Ply / Strength</label>
                <input name="ply" value={form.ply} onChange={handleChange} placeholder="3-ply, 5-ply, N/A" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Material</label>
                <input name="material" value={form.material} onChange={handleChange} placeholder="Kraft Corrugated" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Condition</label>
                <select name="condition" value={form.condition} onChange={handleChange} className={inputClass}>
                  <option value="New">New</option>
                  <option value="Used - Good">Used - Good</option>
                  <option value="Used - Fair">Used - Fair</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows={4} placeholder="Describe the product..." className={`${inputClass} resize-none`} />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="customizable" name="customizable" checked={form.customizable} onChange={handleChange} className="w-5 h-5 rounded text-primary accent-primary cursor-pointer" />
                <label htmlFor="customizable" className="font-bold text-secondary cursor-pointer">Customizable (accept custom orders)</label>
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-heading font-black text-secondary mb-6">Product Images (URLs)</h2>
            <div className="space-y-3">
              {form.images.map((img, i) => (
                <div key={i} className="flex gap-3">
                  <input value={img} onChange={(e) => handleImageChange(i, e.target.value)} placeholder="https://..." className={`${inputClass} flex-1`} />
                  {form.images.length > 1 && (
                    <button type="button" onClick={() => setForm(p => ({ ...p, images: p.images.filter((_, idx) => idx !== i) }))}
                      className="p-3 rounded-2xl bg-red-50 text-red-500 hover:bg-red-100 transition-colors">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  )}
                </div>
              ))}
              <button type="button" onClick={() => setForm(p => ({ ...p, images: [...p.images, ''] }))}
                className="flex items-center gap-2 text-primary font-bold text-sm hover:text-primary-hover transition-colors">
                <Plus className="h-4 w-4" /> Add Another Image URL
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Pricing & Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-heading font-black text-secondary mb-6">Bulk Pricing Tiers</h2>
            <div className="space-y-4">
              {form.bulkPricing.map((tier, i) => (
                <div key={i} className="grid grid-cols-2 gap-3 items-center">
                  <div>
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1 block">Min Qty</label>
                    <input type="number" value={tier.minQty} onChange={(e) => handlePricingChange(i, 'minQty', e.target.value)} placeholder="100" className={inputClass} />
                  </div>
                  <div>
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1 block">Price (₨)</label>
                    <input type="number" value={tier.price} onChange={(e) => handlePricingChange(i, 'price', e.target.value)} placeholder="130" className={inputClass} />
                  </div>
                </div>
              ))}
              <button type="button" onClick={() => setForm(p => ({ ...p, bulkPricing: [...p.bulkPricing, { minQty: '', price: '' }] }))}
                className="flex items-center gap-2 text-primary font-bold text-sm hover:text-primary-hover transition-colors">
                <Plus className="h-4 w-4" /> Add Pricing Tier
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-primary hover:bg-primary-hover text-white font-black text-lg rounded-2xl transition-all shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:shadow-[0_0_40px_rgba(249,115,22,0.5)] hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Product...' : 'Publish Product'}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}
