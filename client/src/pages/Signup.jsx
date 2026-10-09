import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      // Save user to localStorage
      localStorage.setItem('user', JSON.stringify(data.user));

      // Success, go to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-clay-card rounded-3xl p-8 shadow-clay-card relative"
    >
      <button 
        onClick={() => navigate('/')} 
        className="absolute top-6 left-6 w-10 h-10 flex items-center justify-center bg-clay-bg text-slate-600 rounded-full shadow-clay-btn hover:text-primary-500 transition-colors"
      >
        ←
      </button>

      <div className="text-center mb-8 mt-2">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Create Account</h1>
        <p className="text-slate-500">Join 1 Byte GK today.</p>
      </div>

      <form onSubmit={handleSignup} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
          <input 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-clay-bg rounded-2xl px-4 py-3 outline-none text-slate-700 shadow-inner focus:shadow-clay-btn-pressed transition-shadow"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-clay-bg rounded-2xl px-4 py-3 outline-none text-slate-700 shadow-inner focus:shadow-clay-btn-pressed transition-shadow"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-clay-bg rounded-2xl px-4 py-3 outline-none text-slate-700 shadow-inner focus:shadow-clay-btn-pressed transition-shadow"
            placeholder="Create password"
          />
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-2xl text-sm text-center">
            {error}
          </div>
        )}

        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-primary-500 text-white font-bold rounded-2xl py-4 shadow-clay-btn active:shadow-clay-btn-pressed transition-shadow mt-4 disabled:opacity-50"
        >
          {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
        </button>

        <p className="text-center text-sm text-slate-500 mt-6">
          Already have an account?{' '}
          <button 
            type="button" 
            onClick={() => navigate('/login')}
            className="text-primary-500 font-bold hover:underline"
          >
            Login
          </button>
        </p>
      </form>
    </motion.div>
  );
}
