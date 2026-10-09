import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const navigate = useNavigate();
  const [contributionData, setContributionData] = useState([]);

  const [mastery, setMastery] = useState({ History: 20, Polity: 20, Geography: 20 });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        const userId = storedUser._id || '';
        
        const [activityRes, masteryRes] = await Promise.all([
          axios.get(`/api/users/activity?userId=${userId}`),
          axios.get(`/api/users/mastery?userId=${userId}`)
        ]);
        
        // Heatmap logic
        const map = activityRes.data; 
        const weeks = [];
        const today = new Date();
        let currentDay = new Date(today);
        currentDay.setDate(currentDay.getDate() - (14 * 7 - 1));
        
        for (let w = 0; w < 14; w++) {
          const days = [];
          for (let d = 0; d < 7; d++) {
            const dateStr = `${currentDay.getFullYear()}-${String(currentDay.getMonth() + 1).padStart(2, '0')}-${String(currentDay.getDate()).padStart(2, '0')}`;
            const count = map[dateStr] || 0;
            let intensity = 0;
            if (count > 0) intensity = 1;
            if (count > 10) intensity = 2;
            if (count > 25) intensity = 3;
            if (count >= 50) intensity = 4;
            days.push(intensity);
            currentDay.setDate(currentDay.getDate() + 1);
          }
          weeks.push(days);
        }
        setContributionData(weeks);

        // Mastery logic
        if (Object.keys(masteryRes.data).length > 0) {
          setMastery(prev => ({ ...prev, ...masteryRes.data }));
        }

      } catch (err) {
        console.error("Failed to load dashboard data", err);
        setContributionData(Array.from({length: 14}).map(() => Array(7).fill(0)));
      }
    };
    fetchDashboardData();
  }, []);

  const getHeatmapColor = (intensity) => {
    switch(intensity) {
      case 4: return 'bg-primary-500';
      case 3: return 'bg-primary-400';
      case 2: return 'bg-primary-300';
      case 1: return 'bg-primary-200';
      default: return 'bg-slate-100 shadow-inner';
    }
  };

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-clay-card rounded-3xl p-4 md:p-6 shadow-clay-card"
      >
        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-1">👋 Good Evening, {JSON.parse(localStorage.getItem('user') || '{}').name || 'Learner'}</h2>
        
        <div className="grid grid-cols-3 gap-2 md:gap-4 mt-6 mb-2">
          <div className="flex flex-col items-center p-2 md:p-3 bg-clay-bg rounded-2xl shadow-inner">
            <span className="text-xl md:text-2xl mb-1">🔥</span>
            <span className="font-black text-slate-800 text-sm md:text-base">{JSON.parse(localStorage.getItem('user') || '{}').currentStreak || 0}</span>
            <span className="text-[10px] md:text-xs text-slate-500 font-bold uppercase tracking-wider">Streak</span>
          </div>
          <div className="flex flex-col items-center p-2 md:p-3 bg-clay-bg rounded-2xl shadow-inner">
            <span className="text-xl md:text-2xl mb-1">⭐</span>
            <span className="font-black text-slate-800 text-sm md:text-base">{JSON.parse(localStorage.getItem('user') || '{}').xp || 0}</span>
            <span className="text-[10px] md:text-xs text-slate-500 font-bold uppercase tracking-wider">XP</span>
          </div>
          <div className="flex flex-col items-center p-2 md:p-3 bg-clay-bg rounded-2xl shadow-inner">
            <span className="text-xl md:text-2xl mb-1">🛡️</span>
            <span className="font-black text-primary-500 text-sm md:text-base">Lvl {JSON.parse(localStorage.getItem('user') || '{}').level || 1}</span>
            <span className="text-[10px] md:text-xs text-slate-500 font-bold uppercase tracking-wider">Rank</span>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-primary-500 rounded-3xl p-6 text-center shadow-clay-card relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full"></div>
        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-16 h-16 bg-white opacity-10 rounded-full"></div>
        
        <p className="text-primary-100 font-semibold mb-1 uppercase tracking-wider text-sm">Daily Challenge</p>
        <h3 className="text-4xl font-black text-white mb-6">50 <span className="text-2xl font-bold">Q's</span></h3>
        
        <button 
          onClick={() => navigate('/challenge')}
          className="bg-white text-primary-600 font-bold rounded-2xl py-3 px-8 shadow-clay-btn active:shadow-clay-btn-pressed transition-shadow w-full"
        >
          ▶ START NOW
        </button>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-clay-card rounded-3xl p-6 shadow-clay-card"
      >
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-bold text-slate-800">📈 Activity Heatmap</h4>
        </div>
        <p className="text-xs text-slate-500 mb-4 font-medium">Daily subject-wise questions solved</p>

        <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-hide">
          {contributionData.map((week, wIndex) => (
            <div key={wIndex} className="flex flex-col gap-1.5">
              {week.map((intensity, dIndex) => (
                <div 
                  key={dIndex} 
                  className={`w-3 h-3 rounded-sm ${getHeatmapColor(intensity)}`}
                  title={`${intensity * 5} questions solved`}
                ></div>
              ))}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-end gap-2 mt-2 text-xs text-slate-400 font-bold">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-2.5 h-2.5 rounded-sm bg-slate-100 shadow-inner"></div>
            <div className="w-2.5 h-2.5 rounded-sm bg-primary-200"></div>
            <div className="w-2.5 h-2.5 rounded-sm bg-primary-300"></div>
            <div className="w-2.5 h-2.5 rounded-sm bg-primary-400"></div>
            <div className="w-2.5 h-2.5 rounded-sm bg-primary-500"></div>
          </div>
          <span>More</span>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-clay-card rounded-3xl p-6 shadow-clay-card"
      >
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-bold text-slate-800">📚 Subject Mastery</h4>
          <button 
            onClick={() => navigate('/library')}
            className="text-sm font-bold text-primary-600 hover:text-primary-700"
          >
            Explore All →
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-slate-600 font-medium w-20">History</span>
            <div className="flex-1 mx-4 h-3 bg-clay-bg rounded-full overflow-hidden shadow-inner">
              <div className="h-full bg-orange-400 rounded-full transition-all duration-1000" style={{ width: `${mastery.History || 0}%` }}></div>
            </div>
            <span className="text-slate-500 text-sm font-bold w-10 text-right">{mastery.History || 0}%</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-600 font-medium w-20">Polity</span>
            <div className="flex-1 mx-4 h-3 bg-clay-bg rounded-full overflow-hidden shadow-inner">
              <div className="h-full bg-blue-400 rounded-full transition-all duration-1000" style={{ width: `${mastery.Polity || 0}%` }}></div>
            </div>
            <span className="text-slate-500 text-sm font-bold w-10 text-right">{mastery.Polity || 0}%</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-slate-600 font-medium w-20">Geography</span>
            <div className="flex-1 mx-4 h-3 bg-clay-bg rounded-full overflow-hidden shadow-inner">
              <div className="h-full bg-green-400 rounded-full transition-all duration-1000" style={{ width: `${mastery.Geography || 0}%` }}></div>
            </div>
            <span className="text-slate-500 text-sm font-bold w-10 text-right">{mastery.Geography || 0}%</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}


