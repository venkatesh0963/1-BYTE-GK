import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';

export default function SubjectDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [series, setSeries] = useState([]);

  useEffect(() => {
    // Mock fetch series
    setSeries([
      { _id: '101', name: 'Ancient India', slug: 'ancient-india', order: 1, isPremium: false, totalQuestions: 150 },
      { _id: '102', name: 'Medieval India', slug: 'medieval-india', order: 2, isPremium: false, totalQuestions: 120 },
      { _id: '103', name: 'Modern India', slug: 'modern-india', order: 3, isPremium: true, totalQuestions: 200 }
    ]);
  }, [slug]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center px-2">
        <h2 className="text-2xl font-black text-slate-800 capitalize">{slug}</h2>
        <button onClick={() => navigate('/library')} className="text-primary-600 font-bold">Back</button>
      </div>

      <div className="space-y-4">
        {series.map((s, i) => (
          <motion.div
            key={s._id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => navigate(`/series/${s._id}`)}
            className="bg-clay-card rounded-3xl p-6 shadow-clay-card cursor-pointer flex justify-between items-center hover:shadow-clay-btn transition-shadow"
          >
            <div>
              <p className="text-xs font-bold text-slate-400 mb-1">SERIES 0{s.order}</p>
              <h3 className="font-bold text-slate-800 text-lg">{s.name}</h3>
              <p className="text-sm text-slate-500 mt-1">{s.totalQuestions} Questions</p>
            </div>
            
            {s.isPremium ? (
              <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-3 py-1 rounded-full">PRO</span>
            ) : (
              <span className="text-primary-500 text-2xl">→</span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
