import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface AdminLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
}

const NAV_ITEMS = [
  { path: '/dashboard', icon: 'dashboard',  label: 'Übersicht' },
  { path: '/admin/users', icon: 'group',    label: 'Benutzer' },
  { path: '/tours',       icon: 'verified', label: 'Touren' },
  { path: '/stats',       icon: 'monitoring', label: 'Stats' },
];

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, pageTitle }) => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const initials = user
    ? `${(user.firstName?.[0] ?? '')}${(user.lastName?.[0] ?? '')}`.toUpperCase() || 'AD'
    : 'AD';

  const displayName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.username ?? 'Admin';

  const activeLabel = NAV_ITEMS.find((n) => isActive(n.path))?.label ?? pageTitle ?? 'Admin';

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const handleNav = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <div className="flex min-h-screen bg-nature-bg font-display">

      {/* ── Desktop Sidebar ─────────────────────────────────────── */}
      <aside className="w-64 bg-forest text-white hidden md:flex flex-col flex-shrink-0 min-h-screen">
        {/* Logo */}
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-moss/20 border border-moss/30 flex items-center justify-center">
            <span className="material-symbols-outlined text-moss-bright" style={{ fontVariationSettings: "'FILL' 1" }}>
              landscape
            </span>
          </div>
          <div>
            <h1 className="font-extrabold text-lg leading-none">hikr</h1>
            <span className="text-[10px] uppercase tracking-widest text-moss-bright font-medium">Admin Portal</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 mt-6">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.path}
              href={item.path}
              onClick={handleNav(item.path)}
              className={`flex items-center gap-3 px-6 py-4 transition-colors ${
                isActive(item.path)
                  ? 'bg-moss/10 text-moss border-r-[3px] border-moss'
                  : 'text-slate-400 hover:text-white hover:bg-forest-light'
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </a>
          ))}
        </nav>

        {/* User + Logout */}
        <div className="p-6 border-t border-white/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {initials}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold truncate">{displayName}</p>
              <p className="text-[10px] text-slate-500 truncate uppercase tracking-wider">Admin</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors text-sm"
          >
            <span className="material-symbols-outlined text-sm">logout</span>
            Abmelden
          </button>
        </div>
      </aside>

      {/* ── Main Area ───────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-h-screen">

        {/* Mobile Header */}
        <header className="bg-forest-dark text-white px-4 py-3 flex items-center justify-between sticky top-0 z-50 md:hidden">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-white">landscape</span>
            <span className="font-bold text-lg tracking-tight">hikr admin</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-forest-green flex items-center justify-center text-white text-xs font-bold">
            {initials}
          </div>
        </header>

        {/* Desktop Header */}
        <header className="h-16 bg-white border-b border-slate-200 items-center justify-between px-8 z-10 hidden md:flex flex-shrink-0">
          <h2 className="text-xl font-bold text-forest">{activeLabel}</h2>
          <button className="w-10 h-10 flex items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto pb-20 md:pb-0">
          {children}
        </main>

        {/* Mobile Bottom Nav */}
        <nav className="fixed bottom-0 left-0 right-0 bg-forest-dark text-white flex justify-around items-center py-3 border-t border-forest-mid z-50 md:hidden">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.path}
              href={item.path}
              onClick={handleNav(item.path)}
              className={`flex flex-col items-center gap-1 transition-opacity ${
                isActive(item.path) ? 'opacity-100' : 'opacity-60'
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="text-[10px] font-medium">{item.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default AdminLayout;
