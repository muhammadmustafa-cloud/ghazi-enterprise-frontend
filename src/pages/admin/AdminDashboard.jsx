import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PackagePlus, FolderPlus, Package, TrendingUp } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useProductStore } from '../../store/useProductStore';

const StatCard = ({ icon: Icon, label, value, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex items-center gap-6"
  >
    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${color}`}>
      <Icon className="h-8 w-8 text-white" />
    </div>
    <div>
      <p className="text-3xl font-black text-secondary">{value}</p>
      <p className="text-sm text-text-muted font-bold uppercase tracking-wider">{label}</p>
    </div>
  </motion.div>
);

export default function AdminDashboard() {
  const { products, fetchProducts, loading } = useProductStore();

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const categoryCount = [...new Set(products.map(p => p.category))].length;

  return (
    <AdminLayout>
      <div className="mb-10">
        <h1 className="text-4xl font-heading font-black text-secondary mb-2">Dashboard</h1>
        <p className="text-text-muted font-medium text-lg">Welcome to Ghazi Enterprise Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <StatCard icon={Package} label="Total Products" value={loading ? '...' : products.length} color="bg-primary" />
        <StatCard icon={FolderPlus} label="Categories" value={loading ? '...' : categoryCount} color="bg-secondary" />
        <StatCard icon={TrendingUp} label="In Stock" value={loading ? '...' : products.filter(p => p.stock > 0).length} color="bg-green-500" />
      </div>

      {/* Quick Actions */}
      <div className="mb-10">
        <h2 className="text-2xl font-heading font-black text-secondary mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/admin/add-product" className="bg-white rounded-3xl p-8 border-2 border-dashed border-gray-200 hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all group flex items-center gap-5">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
              <PackagePlus className="h-7 w-7 text-primary group-hover:text-white" />
            </div>
            <div>
              <p className="font-heading font-black text-xl text-secondary">Add New Product</p>
              <p className="text-text-muted font-medium">Add a product directly to the database</p>
            </div>
          </Link>
          <Link to="/admin/add-category" className="bg-white rounded-3xl p-8 border-2 border-dashed border-gray-200 hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all group flex items-center gap-5">
            <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-all">
              <FolderPlus className="h-7 w-7 text-secondary group-hover:text-white" />
            </div>
            <div>
              <p className="font-heading font-black text-xl text-secondary">Add New Category</p>
              <p className="text-text-muted font-medium">Create a new product category</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Products Table */}
      <div>
        <h2 className="text-2xl font-heading font-black text-secondary mb-6">All Products</h2>
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="p-16 text-center text-text-muted font-bold">Loading products...</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left py-4 px-6 text-xs font-black text-secondary uppercase tracking-widest">Product</th>
                  <th className="text-left py-4 px-6 text-xs font-black text-secondary uppercase tracking-widest">Category</th>
                  <th className="text-left py-4 px-6 text-xs font-black text-secondary uppercase tracking-widest">Price</th>
                  <th className="text-left py-4 px-6 text-xs font-black text-secondary uppercase tracking-widest">Stock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-bold text-secondary">{p.name}</td>
                    <td className="py-4 px-6 text-text-muted font-medium capitalize">{p.category?.replace('-', ' ')}</td>
                    <td className="py-4 px-6 font-bold text-secondary">₨ {p.price}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-black ${p.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                        {p.stock > 0 ? `${p.stock} units` : 'Out of Stock'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
