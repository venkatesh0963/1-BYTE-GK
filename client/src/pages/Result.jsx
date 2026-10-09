import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useGameStore from '../store/gameStore';

export default function Result() {
  const { score, xpEarned, questions } = useGameStore();
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate('/dashboard');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-clay-card rounded-3xl p-8 shadow-clay-card text-center"
    >
      <div className="text-6xl mb-6">🏆</div>
      <h2 className="text-2xl font-black text-slate-800 mb-2">Challenge Complete!</h2>
      <p className="text-slate-500 font-medium mb-8">Daily 50 Questions Done</p>

      <div className="flex justify-center gap-8 mb-8">
        <div>
          <p className="text-sm text-slate-500 mb-1">Score</p>
          <p className="text-2xl font-bold text-primary-500">{score}/{questions.length}</p>
        </div>
        <div>
          <p className="text-sm text-slate-500 mb-1">XP Earned</p>
          <p className="text-2xl font-bold text-yellow-500">+{xpEarned}</p>
        </div>
      </div>

      <div className="bg-primary-50 p-4 rounded-2xl mb-8">
        <p className="text-primary-600 font-bold">🔥 Streak Extended to 13 Days!</p>
      </div>

      <button
        onClick={handleReturn}
        className="w-full bg-primary-500 text-white font-bold rounded-2xl py-4 shadow-clay-btn active:shadow-clay-btn-pressed transition-shadow"
      >
        RETURN TO DASHBOARD
      </button>
    </motion.div>
  );
}
