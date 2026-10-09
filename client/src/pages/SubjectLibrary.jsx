import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SubjectLibrary() {
  const [subjects, setSubjects] = useState([]);
  const [seriesData, setSeriesData] = useState({});
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/subjects');
        setSubjects(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSubjects();
  }, []);

  const toggleDropdown = async (sub) => {
    const id = sub._id;
    if (openDropdownId === id) {
      setOpenDropdownId(null);
      return;
    }
    setOpenDropdownId(id);
    
    // Fetch series if not already loaded
    if (!seriesData[id]) {
      try {
        const res = await axios.get(`http://localhost:5000/api/subjects/${sub.slug}/series`);
        setSeriesData(prev => ({ ...prev, [id]: res.data }));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const startSeries = (series) => {
    if (series.isPremium) {
      navigate('/subscribe');
    } else {
      navigate('/challenge', { state: { seriesId: series._id, seriesName: series.name } });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center px-2">
        <h2 className="text-3xl font-black text-slate-800">Subject Library</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((sub, i) => {
          const isOpen = openDropdownId === sub._id;
          const seriesList = seriesData[sub._id] || [];

          return (
            <motion.div
              key={sub._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`${sub.color || 'bg-slate-100'} rounded-3xl p-6 shadow-clay-card flex flex-col`}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl bg-white/50 p-4 rounded-2xl shadow-inner">{sub.icon}</span>
                <div>
                  <h3 className="font-black text-2xl text-slate-800">{sub.name}</h3>
                  <p className="text-slate-600 font-medium text-sm">{seriesList.length} Series Available</p>
                </div>
              </div>

              <button 
                onClick={() => toggleDropdown(sub)}
                className="w-full bg-white/60 text-slate-800 font-black rounded-2xl py-3 shadow-clay-btn hover:shadow-clay-btn-pressed transition-all flex justify-between items-center px-6"
              >
                <span>{isOpen ? 'Close Series' : 'Start Series'}</span>
                <span>{isOpen ? '▲' : '▼'}</span>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden mt-4 space-y-2"
                  >
                    {seriesList.map((series) => (
                      <div 
                        key={series._id} 
                        onClick={() => startSeries(series)}
                        className="bg-white/80 rounded-xl p-4 flex justify-between items-center shadow-sm cursor-pointer hover:bg-white transition-colors"
                      >
                        <span className="font-bold text-slate-700">{series.name}</span>
                        {series.isPremium ? (
                          <span className="bg-yellow-400 text-yellow-900 text-xs font-black px-3 py-1 rounded-full shadow-sm">PRO</span>
                        ) : (
                          <span className="bg-primary-500 text-white text-xs font-black px-3 py-1 rounded-full shadow-sm">PLAY</span>
                        )}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
