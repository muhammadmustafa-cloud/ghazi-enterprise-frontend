import { Link, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, PackagePlus, FolderPlus, LogOut, Package, ChevronRight } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

const sidebarLinks = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Add Product', path: '/admin/add-product', icon: PackagePlus },
  { name: 'Add Category', path: '/admin/add-category', icon: FolderPlus },
];

export default function AdminLayout({ children }) {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-secondary text-white flex flex-col sticky top-0 h-screen shrink-0">
        {/* Logo */}
        <div className="p-8 border-b border-white/10">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-primary p-2.5 rounded-xl shadow-lg shadow-primary/30 group-hover:scale-105 transition-transform">
              <Package className="h-6 w-6 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <span className="font-heading font-black text-xl text-white">GHAZI<span className="text-primary">.</span></span>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Admin</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6 space-y-2">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm transition-all group ${
                  isActive
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`
              }
            >
              <link.icon className="h-5 w-5 shrink-0" />
              <span>{link.name}</span>
              <ChevronRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </NavLink>
          ))}
        </nav>

        {/* User Info + Logout */}
        <div className="p-6 border-t border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center font-black text-primary text-lg">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-bold text-white">{user?.name}</p>
              <p className="text-xs text-gray-400">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-400 hover:text-red-400 hover:bg-red-400/10 font-bold text-sm transition-all"
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
