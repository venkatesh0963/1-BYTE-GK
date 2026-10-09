import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function DailyChallengePage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center px-2">
        <h2 className="text-2xl font-black text-slate-800">Daily Challenge</h2>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-clay-card rounded-3xl p-6 shadow-clay-card flex flex-col items-center justify-center text-center space-y-6"
      >
        <div className="w-full grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center p-6 bg-clay-bg rounded-2xl shadow-inner">
            <span className="text-5xl mb-2">🔥</span>
            <span className="text-3xl font-black text-slate-800">{JSON.parse(localStorage.getItem('user') || '{}').currentStreak || 0}</span>
            <span className="text-sm text-slate-500 font-bold uppercase tracking-wider">Day Streak</span>
          </div>
          <div className="flex flex-col items-center p-6 bg-clay-bg rounded-2xl shadow-inner">
            <span className="text-5xl mb-2">⭐</span>
            <span className="text-3xl font-black text-slate-800">{JSON.parse(localStorage.getItem('user') || '{}').xp || 0}</span>
            <span className="text-sm text-slate-500 font-bold uppercase tracking-wider">Total XP</span>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-primary-500 rounded-3xl p-8 text-center shadow-clay-card relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-white opacity-10 rounded-full"></div>
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-24 h-24 bg-white opacity-10 rounded-full"></div>
        
        <p className="text-primary-100 font-semibold mb-2 uppercase tracking-wider text-sm">Today's Goal</p>
        <h3 className="text-6xl font-black text-white mb-8">50 <span className="text-3xl font-bold">Questions</span></h3>
        
        <button 
          onClick={() => navigate('/challenge')}
          className="bg-white text-primary-600 text-xl font-black rounded-2xl py-5 px-8 shadow-clay-btn hover:shadow-clay-btn-pressed transition-shadow w-full"
        >
          ▶ START QUIZ
        </button>
      </motion.div>
    </div>
  );
}
