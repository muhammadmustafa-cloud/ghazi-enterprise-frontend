import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `repeating-linear-gradient(45deg, #F97316 0, #F97316 1px, transparent 0, transparent 50%)`,
        backgroundSize: '20px 20px'
      }}/>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Top accent bar */}
        <div className="h-2 bg-gradient-to-r from-primary via-orange-400 to-yellow-400" />

        <div className="p-10">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="bg-primary p-3 rounded-2xl text-white shadow-lg shadow-primary/30">
              <Package className="h-7 w-7" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="font-heading font-black text-2xl text-secondary">GHAZI<span className="text-primary">.</span></h1>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Admin Portal</p>
            </div>
          </div>

          <h2 className="text-3xl font-heading font-black text-secondary mb-2">Welcome back</h2>
          <p className="text-text-muted font-medium mb-8">Sign in to access the admin dashboard.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error Alert */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm font-bold rounded-xl p-4">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-bold text-secondary mb-2 uppercase tracking-wider">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@ghazienterprise.com"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 bg-gray-50 text-secondary font-medium focus:outline-none focus:border-primary focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-bold text-secondary mb-2 uppercase tracking-wider">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-4 rounded-2xl border-2 border-gray-100 bg-gray-50 text-secondary font-medium focus:outline-none focus:border-primary focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-secondary transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-primary hover:bg-primary-hover text-white font-black text-lg rounded-2xl transition-all shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:shadow-[0_0_40px_rgba(249,115,22,0.5)] hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
              ) : 'Sign In to Dashboard'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
