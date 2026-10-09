import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const plan = location.state?.plan || 'Pro';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-clay-card rounded-3xl p-8 shadow-clay-card text-center"
    >
      <div className="text-6xl mb-6">🎉</div>
      <h2 className="text-2xl font-black text-slate-800 mb-2">Payment Successful!</h2>
      <p className="text-slate-500 font-medium mb-8">You are now subscribed to the <strong className="text-primary-600">{plan}</strong> plan.</p>

      <div className="bg-primary-50 p-4 rounded-2xl mb-8">
        <p className="text-primary-600 font-bold text-sm">All premium features are now unlocked for your account.</p>
      </div>

      <button
        onClick={() => navigate('/library')}
        className="w-full bg-primary-500 text-white font-bold rounded-2xl py-4 shadow-clay-btn active:shadow-clay-btn-pressed transition-shadow"
      >
        START EXPLORING
      </button>
    </motion.div>
  );
}
