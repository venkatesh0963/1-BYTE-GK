import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleRestart = async () => {
    if (window.confirm("Are you sure you want to restart your game? All progress, XP, and streak will be lost!")) {
      try {
        const res = await fetch('http://localhost:5000/api/users/restart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user._id })
        });
        const data = await res.json();
        if (res.ok) {
          localStorage.setItem('user', JSON.stringify(data.user));
          setUser(data.user);
          alert("Game Restarted Successfully!");
        } else {
          alert("Error: " + data.error);
        }
      } catch (err) {
        alert("Failed to restart game: " + err.message);
      }
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you absolutely sure you want to delete your account? This action cannot be undone.")) {
      try {
        const res = await fetch('http://localhost:5000/api/users/delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user._id })
        });
        if (res.ok) {
          localStorage.removeItem('user');
          navigate('/');
        }
      } catch (err) {
        alert("Failed to delete account.");
      }
    }
  };

  if (!user) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center px-2">
        <h2 className="text-2xl font-black text-slate-800">Profile</h2>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-clay-card rounded-3xl p-6 shadow-clay-card text-center"
      >
        <div className="w-24 h-24 bg-primary-100 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl shadow-inner">
          👨‍🎓
        </div>
        <h3 className="text-xl font-bold text-slate-800">{user.name}</h3>
        <p className="text-slate-500 font-medium mb-6">{user.email}</p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-clay-bg p-4 rounded-2xl shadow-inner">
            <p className="text-xs font-bold text-slate-400 mb-1">TOTAL XP</p>
            <p className="text-xl font-black text-yellow-500">{user.xp || 0}</p>
          </div>
          <div className="bg-clay-bg p-4 rounded-2xl shadow-inner">
            <p className="text-xs font-bold text-slate-400 mb-1">LEVEL</p>
            <p className="text-xl font-black text-primary-500">{user.level || 1}</p>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-clay-card rounded-3xl p-6 shadow-clay-card"
      >
        <h4 className="font-bold text-slate-800 mb-4">Account Settings</h4>
        
        <div className="space-y-4">
          <button 
            onClick={() => navigate('/subscribe')}
            className="w-full flex items-center justify-between px-4 py-3 bg-clay-bg rounded-xl shadow-clay-btn hover:shadow-clay-btn-pressed transition-shadow text-left"
          >
            <span className="font-medium text-slate-700">⭐ Subscription Plans</span>
            <span className="text-primary-500">→</span>
          </button>
          
          <button 
            onClick={handleRestart}
            className="w-full flex items-center justify-between px-4 py-3 bg-clay-bg rounded-xl shadow-clay-btn hover:shadow-clay-btn-pressed transition-shadow text-left"
          >
            <span className="font-medium text-slate-700">🔄 Restart Game</span>
            <span className="text-primary-500">→</span>
          </button>

          <button 
            onClick={handleDelete}
            className="w-full flex items-center justify-between px-4 py-3 bg-red-50 rounded-xl shadow-clay-btn hover:shadow-clay-btn-pressed transition-shadow text-left border border-red-100"
          >
            <span className="font-medium text-red-600">🗑️ Delete Account</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
