import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';

export default function SeriesDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [series, setSeries] = useState(null);

  useEffect(() => {
    // Mock fetch
    setSeries({
      _id: id,
      name: 'Ancient India',
      description: 'Explore the Indus Valley Civilization, Vedic period, and the early empires of India. Perfect for competitive exams.',
      isPremium: id === '103', // Mock premium if id is 103
      totalQuestions: 150
    });
  }, [id]);

  if (!series) return <div className="text-center">Loading...</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center px-2">
        <button onClick={() => navigate(-1)} className="text-primary-600 font-bold">← Back</button>
      </div>

      <div className="bg-clay-card rounded-3xl p-8 shadow-clay-card text-center mt-8 relative overflow-hidden">
        {series.isPremium && (
          <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            PRO ONLY
          </div>
        )}
        
        <div className="text-6xl mb-6">🏛️</div>
        <h2 className="text-3xl font-black text-slate-800 mb-4">{series.name}</h2>
        <p className="text-slate-500 leading-relaxed mb-8">{series.description}</p>
        
        <div className="bg-clay-bg rounded-2xl p-4 mb-8 shadow-inner inline-block mx-auto min-w-[200px]">
          <p className="text-slate-400 text-sm font-bold mb-1">TOTAL QUESTIONS</p>
          <p className="text-2xl font-black text-primary-600">{series.totalQuestions}</p>
        </div>

        {series.isPremium ? (
          <button 
            onClick={() => navigate('/subscribe')}
            className="w-full bg-yellow-400 text-yellow-900 font-bold rounded-2xl py-4 shadow-clay-btn hover:shadow-clay-btn-pressed transition-shadow"
          >
            UNLOCK WITH PRO
          </button>
        ) : (
          <button 
            onClick={() => navigate('/challenge')} // Use the same challenge UI for now
            className="w-full bg-primary-500 text-white font-bold rounded-2xl py-4 shadow-clay-btn active:shadow-clay-btn-pressed transition-shadow"
          >
            START SERIES
          </button>
        )}
      </div>
    </motion.div>
  );
}
