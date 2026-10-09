import { motion } from 'framer-motion';

export default function Leaderboard() {
  const users = [
    { rank: 1, name: 'Aakash', xp: '5,240', me: false },
    { rank: 2, name: 'Priya', xp: '4,980', me: false },
    { rank: 3, name: 'Rahul', xp: '4,850', me: true },
    { rank: 4, name: 'Neha', xp: '4,200', me: false },
    { rank: 5, name: 'Vikram', xp: '3,900', me: false },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center px-2">
        <h2 className="text-2xl font-black text-slate-800">Leaderboard</h2>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-clay-card rounded-3xl p-6 shadow-clay-card"
      >
        <div className="flex gap-4 mb-6">
          <button className="flex-1 bg-primary-500 text-white font-bold py-2 rounded-xl shadow-clay-btn-pressed">Daily</button>
          <button className="flex-1 bg-clay-bg text-slate-600 font-bold py-2 rounded-xl shadow-clay-btn hover:shadow-clay-btn-pressed">Weekly</button>
          <button className="flex-1 bg-clay-bg text-slate-600 font-bold py-2 rounded-xl shadow-clay-btn hover:shadow-clay-btn-pressed">All Time</button>
        </div>

        <div className="space-y-3">
          {users.map((user) => (
            <div 
              key={user.rank} 
              className={`flex items-center justify-between p-4 rounded-2xl ${user.me ? 'bg-primary-50 shadow-inner border border-primary-100' : 'bg-clay-bg shadow-clay-btn'}`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black ${
                  user.rank === 1 ? 'bg-yellow-400 text-yellow-900' :
                  user.rank === 2 ? 'bg-slate-300 text-slate-700' :
                  user.rank === 3 ? 'bg-orange-300 text-orange-900' : 'bg-slate-200 text-slate-500'
                }`}>
                  {user.rank}
                </div>
                <span className={`font-bold ${user.me ? 'text-primary-700' : 'text-slate-700'}`}>
                  {user.name} {user.me && '(You)'}
                </span>
              </div>
              <span className="font-bold text-yellow-500">{user.xp} XP</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
