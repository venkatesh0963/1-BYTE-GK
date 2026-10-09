import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Sidebar({ onClose }) {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/dashboard', icon: '🏠' },
    { name: 'Daily Challenge', path: '/daily', icon: '🎯' },
    { name: 'Subjects', path: '/library', icon: '📚' },
    { name: 'Leaderboard', path: '/leaderboard', icon: '🏆' },
    { name: 'Profile', path: '/profile', icon: '👤' },
  ];

  const subjects = [
    { name: 'History', slug: 'history', icon: '🏛️' },
    { name: 'Polity', slug: 'polity', icon: '⚖️' },
    { name: 'Geography', slug: 'geography', icon: '🌍' },
    { name: 'Science', slug: 'science', icon: '🔬' },
    { name: 'Current Affairs', slug: 'current-affairs', icon: '📰' },
    { name: 'Computer', slug: 'computer', icon: '💻' },
  ];

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="w-64 bg-clay-card rounded-r-3xl p-6 shadow-clay-card flex flex-col h-full h-screen sticky top-0 overflow-y-auto">
      <div className="mb-8 px-2">
        <h1 className="text-2xl font-black text-primary-600">1 Byte GK</h1>
        <p className="text-xs text-slate-500 font-bold mt-1">1 DAILY STREAK</p>
      </div>

      <nav className="space-y-2 mb-8">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            onClick={onClose}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-shadow ${
              isActive(item.path)
                ? 'bg-clay-bg shadow-inner text-primary-600'
                : 'text-slate-600 hover:shadow-clay-btn hover:text-primary-500'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>
      
      <div className="mt-auto px-2 space-y-2">
        <Link 
          to="/subscribe"
          onClick={onClose}
          className="flex items-center justify-center gap-2 w-full bg-yellow-400 text-yellow-900 font-bold rounded-2xl py-3 shadow-clay-btn hover:shadow-clay-btn-pressed transition-shadow text-sm"
        >
          ⭐ Upgrade to Pro
        </Link>
        <button 
          onClick={() => {
            localStorage.removeItem('user');
            window.location.href = '/';
          }}
          className="flex items-center justify-center gap-2 w-full text-slate-500 font-bold rounded-2xl py-3 hover:bg-red-50 hover:text-red-500 transition-colors text-sm"
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
}
