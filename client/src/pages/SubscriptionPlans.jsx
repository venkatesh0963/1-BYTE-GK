import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useGameStore from '../store/gameStore';

export default function SubscriptionPlans() {
  const navigate = useNavigate();

  const handleSubscribe = (plan) => {
    // Demo flow: skip real payment gateway, go straight to success
    navigate('/payment-success', { state: { plan } });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center px-2">
        <h2 className="text-2xl font-black text-slate-800">Upgrade to Pro</h2>
        <button onClick={() => navigate(-1)} className="text-primary-600 font-bold">Back</button>
      </div>

      <div className="space-y-6 pt-4">
        {/* Normal Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-clay-card rounded-3xl p-6 shadow-clay-card relative"
        >
          <h3 className="text-xl font-bold text-slate-800 mb-1">Normal</h3>
          <p className="text-slate-500 mb-4">Perfect for casual learners.</p>
          <div className="text-3xl font-black text-primary-600 mb-6">₹149<span className="text-sm text-slate-400 font-medium">/month</span></div>
          
          <ul className="space-y-3 mb-8 text-slate-600 text-sm font-medium">
            <li className="flex gap-2"><span>✅</span> 50 Daily Questions</li>
            <li className="flex gap-2"><span>✅</span> Detailed Results</li>
            <li className="flex gap-2"><span>✅</span> Basic Leaderboard</li>
            <li className="flex gap-2 opacity-50"><span>❌</span> Premium Series Locked</li>
          </ul>

          <button 
            onClick={() => handleSubscribe('Normal')}
            className="w-full bg-clay-bg text-primary-600 font-bold rounded-2xl py-3 shadow-clay-btn hover:shadow-clay-btn-pressed transition-shadow"
          >
            CHOOSE NORMAL
          </button>
        </motion.div>

        {/* Pro Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-yellow-400 rounded-3xl p-6 shadow-clay-card relative overflow-hidden text-yellow-950"
        >
          <div className="absolute top-0 right-0 bg-yellow-300 text-yellow-900 text-xs font-black px-3 py-1 rounded-bl-xl rounded-tr-3xl">MOST POPULAR</div>
          <h3 className="text-xl font-bold mb-1">Pro</h3>
          <p className="opacity-80 mb-4">For serious exam aspirants.</p>
          <div className="text-3xl font-black mb-6">₹299<span className="text-sm opacity-70 font-medium">/month</span></div>
          
          <ul className="space-y-3 mb-8 text-sm font-medium">
            <li className="flex gap-2"><span>⭐</span> All Subjects Unlocked</li>
            <li className="flex gap-2"><span>⭐</span> All Premium Series</li>
            <li className="flex gap-2"><span>⭐</span> Unlimited Practice</li>
            <li className="flex gap-2"><span>⭐</span> Previous Year Questions</li>
          </ul>

          <button 
            disabled
            className="w-full bg-yellow-900/50 text-yellow-700/50 cursor-not-allowed font-bold rounded-2xl py-3 transition-shadow"
          >
            COMING SOON
          </button>
        </motion.div>
      </div>
    </div>
  );
}
