import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);
  const [planType, setPlanType] = useState('normal'); // 'normal' | 'pro'

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    { q: "What is 1 Byte GK?", a: "1 Byte GK is a gamified General Knowledge learning platform that helps you build knowledge and maintain daily streaks." },
    { q: "How does the daily streak work?", a: "Complete at least one Daily Challenge every day to keep your streak alive! If you miss a day, your streak resets." },
    { q: "What subjects are available in the free plan?", a: "The free plan includes the Daily Challenge and access to basic subjects like History, Geography, and Science." },
    { q: "Can I change my subscription plan later?", a: "Yes, you can upgrade or modify your subscription plan at any time from your account settings." },
    { q: "How do I cancel my subscription?", a: "You can cancel your subscription from your profile dashboard under the billing section." }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 selection:bg-indigo-500 selection:text-white">
      
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center text-slate-900 font-black text-xl shadow-sm relative">
              <span className="absolute top-0 right-0 w-2 h-2 bg-white rounded-full"></span>
              1
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-slate-900 leading-none">1 Byte GK</span>
              <span className="text-[10px] font-bold text-indigo-600 tracking-wider">Learn • Play • Grow</span>
            </div>
          </div>
          
          <nav className="hidden lg:flex items-center gap-8 font-bold text-sm text-slate-600">
            <a href="#" className="text-slate-900">Home</a>
            <a href="#study" className="hover:text-indigo-600 transition-colors">Study Materials</a>
            <a href="#about" className="hover:text-indigo-600 transition-colors">About App</a>
            <a href="#pricing" className="hover:text-indigo-600 transition-colors">Subscription Plans</a>
            <a href="#faq" className="hover:text-indigo-600 transition-colors">FAQ</a>
          </nav>
          
          <div className="flex items-center gap-4 text-sm font-bold">
            <Link to="/login" className="hidden sm:block text-indigo-600 border border-indigo-200 px-6 py-2 rounded-full hover:bg-indigo-50 transition-colors">Login</Link>
            <Link to="/login" className="bg-indigo-600 text-white py-2 px-6 rounded-full hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200">
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-16 pb-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 text-slate-700 font-bold px-4 py-1.5 rounded-full text-xs shadow-sm">
              <span className="text-orange-500">🔥</span> Daily Streaks <span className="text-slate-300">•</span> XP Points <span className="text-slate-300">•</span> Leaderboard
            </div>
            
            <h1 className="text-5xl lg:text-[4rem] font-black text-slate-900 leading-[1.1] tracking-tight">
              Sharpen Your Mind<br/>with <span className="text-indigo-600">1 Byte GK</span>
            </h1>
            
            <h3 className="text-xl font-bold text-slate-700">
              50 Questions. 1 Daily Streak. 1 Byte Smarter.
            </h3>
            
            <p className="text-slate-500 font-medium max-w-lg mx-auto lg:mx-0 leading-relaxed text-sm md:text-base">
              1 Byte GK is a gamified General Knowledge learning platform that helps you build knowledge, maintain daily streaks, earn XP points and grow — one question at a time.
            </p>
            
            <div className="pt-2">
              <button onClick={() => navigate('/dashboard')} className="bg-indigo-600 text-white font-bold text-base py-3.5 px-8 rounded-full shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 mx-auto lg:mx-0">
                Start Quiz <span>→</span>
              </button>
            </div>

            <div className="grid grid-cols-4 gap-4 pt-10 max-w-md mx-auto lg:mx-0">
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-2">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-500 text-xl">⚡</div>
                <span className="text-xs font-bold text-slate-600">Daily<br/>50 Questions</span>
              </div>
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-2">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 text-xl">🔥</div>
                <span className="text-xs font-bold text-slate-600">Maintain<br/>Streak</span>
              </div>
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-2">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-500 text-xl">⭐</div>
                <span className="text-xs font-bold text-slate-600">Earn<br/>XP Points</span>
              </div>
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-2">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 text-xl">🏆</div>
                <span className="text-xs font-bold text-slate-600">Track<br/>Progress</span>
              </div>
            </div>
          </div>
          
          <div className="flex-1 relative w-full flex justify-center lg:justify-end">
            {/* Custom SVG/CSS composition to mimic the 3D phone graphic */}
            <div className="relative w-full max-w-lg aspect-square bg-[#E8F0FE] rounded-full flex items-center justify-center">
               <div className="absolute top-10 left-10 text-6xl">☁️</div>
               <div className="absolute top-20 right-10 text-6xl transform scale-75">☁️</div>
               
               {/* Phone Frame */}
               <div className="relative w-64 h-[28rem] bg-indigo-100 rounded-[3rem] border-8 border-indigo-200 shadow-2xl overflow-hidden flex flex-col items-center pt-8 px-4">
                  <div className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center text-slate-900 font-black text-3xl shadow-sm mb-2">1</div>
                  <h3 className="font-black text-xl text-slate-900">1 Byte GK</h3>
                  <p className="text-[10px] font-bold text-indigo-600 tracking-wider mb-6">Learn • Play • Grow</p>
                  
                  <div className="bg-white rounded-2xl w-full p-4 text-center shadow-sm">
                    <p className="text-xs font-bold text-slate-500 mb-1">Daily Challenge</p>
                    <h2 className="text-4xl font-black text-slate-800 mb-1">50</h2>
                    <p className="text-xs font-bold text-slate-500 mb-4">Questions</p>
                    <button className="bg-indigo-600 text-white font-bold py-2 w-full rounded-full text-sm">Start Now</button>
                  </div>
               </div>

               {/* Decorative Books */}
               <div className="absolute left-0 bottom-20 space-y-[-10px] transform -rotate-12 hover:rotate-0 transition-transform cursor-pointer">
                  <div className="bg-sky-400 text-white font-bold px-6 py-3 rounded-md border-2 border-sky-500 shadow-md transform rotate-2">History</div>
                  <div className="bg-orange-500 text-white font-bold px-6 py-3 rounded-md border-2 border-orange-600 shadow-md transform -rotate-2 translate-x-2">Polity</div>
                  <div className="bg-indigo-500 text-white font-bold px-6 py-3 rounded-md border-2 border-indigo-600 shadow-md">Geography</div>
                  <div className="bg-emerald-400 text-white font-bold px-6 py-3 rounded-md border-2 border-emerald-500 shadow-md transform -translate-x-2">Science</div>
               </div>

               {/* Decorative Calendar & Trophy & XP */}
               <div className="absolute bottom-10 right-20 bg-white rounded-xl shadow-xl w-20 h-24 flex flex-col overflow-hidden border border-slate-100 transform rotate-12">
                  <div className="bg-orange-500 h-6 w-full flex justify-around items-center px-2">
                    <div className="w-2 h-4 bg-slate-200 rounded-full -mt-4 shadow-sm border border-slate-300"></div>
                    <div className="w-2 h-4 bg-slate-200 rounded-full -mt-4 shadow-sm border border-slate-300"></div>
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black text-slate-800">12</span>
                    <span className="text-[10px] font-bold text-orange-500">Day Streak</span>
                  </div>
               </div>
               
               <div className="absolute bottom-24 right-4 text-7xl transform -rotate-12 filter drop-shadow-xl">🏆</div>
               <div className="absolute top-32 right-0 bg-amber-400 text-amber-900 font-black px-4 py-2 rounded-full transform rotate-12 shadow-lg border-2 border-amber-300">+10 XP</div>
            </div>
          </div>
        </div>
      </section>

      {/* About App Section */}
      <section id="about" className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-100">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 relative flex justify-center w-full">
            <div className="w-full max-w-md aspect-[4/3] bg-slate-50 rounded-[3rem] relative flex items-center justify-center">
              {/* Decorative blobs for character placeholder */}
              <div className="absolute top-10 left-10 text-5xl">💡</div>
              <div className="absolute top-20 right-10 text-5xl">🎯</div>
              <div className="absolute bottom-10 right-10 w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center text-white font-black shadow-lg transform rotate-12">GK</div>
              <div className="text-[150px]">👨‍💻</div>
            </div>
          </div>
          
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <div className="inline-block bg-indigo-50 text-indigo-600 font-bold px-4 py-1.5 rounded-full text-xs">
              About 1 Byte GK
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
              Your Smart Companion<br/>for General Knowledge
            </h2>
            
            <p className="text-slate-500 font-medium leading-relaxed text-sm">
              1 Byte GK is a next-generation GK learning app designed to make learning fun, interactive and rewarding. Whether you're preparing for competitive exams or just want to improve your general knowledge, 1 Byte GK helps you stay consistent with daily quizzes, subject-wise learning and gamified progress tracking.
            </p>
            
            <div className="grid grid-cols-2 gap-y-4 gap-x-2 pt-4">
              <div className="flex items-center gap-2 bg-slate-50 rounded-full px-4 py-2 border border-slate-100 w-max">
                <span className="text-indigo-500 text-lg">💙</span> <span className="text-xs font-bold text-slate-700">Gamified Learning</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 rounded-full px-4 py-2 border border-slate-100 w-max">
                <span className="text-emerald-500 text-lg">📚</span> <span className="text-xs font-bold text-slate-700">Subject-wise Questions</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 rounded-full px-4 py-2 border border-slate-100 w-max">
                <span className="text-amber-500 text-lg">⭐</span> <span className="text-xs font-bold text-slate-700">XP & Streaks</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 rounded-full px-4 py-2 border border-slate-100 w-max">
                <span className="text-blue-500 text-lg">📊</span> <span className="text-xs font-bold text-slate-700">Performance Analytics</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-[#F8F9FE]">
        {/* Study Materials Section */}
        <section id="study" className="py-24 px-6 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-6 text-center lg:text-left">
              <div className="inline-block bg-indigo-100/50 text-indigo-600 font-bold px-4 py-1.5 rounded-full text-xs border border-indigo-100">
                Explore
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
                Study Materials
              </h2>
              
              <p className="text-slate-500 font-medium leading-relaxed text-sm max-w-md mx-auto lg:mx-0">
                Access a wide range of GK topics and subject-wise question series to build your knowledge and boost your preparation.
              </p>
              
              <div className="pt-4">
                <button onClick={() => navigate('/dashboard')} className="bg-indigo-600 text-white font-bold text-sm py-3 px-6 rounded-full shadow-md shadow-indigo-200 hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 mx-auto lg:mx-0">
                  Explore All Subjects <span>→</span>
                </button>
              </div>
            </div>
            
            <div className="flex-[1.5] w-full">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { name: 'History', icon: '🏛️', bg: 'bg-rose-50' },
                  { name: 'Polity', icon: '⚖️', bg: 'bg-indigo-50' },
                  { name: 'Civics', icon: '👥', bg: 'bg-emerald-50' },
                  { name: 'Geography', icon: '🌍', bg: 'bg-sky-50' },
                  { name: 'English', icon: '📖', bg: 'bg-teal-50' },
                  { name: 'General Aptitude', icon: '🧮', bg: 'bg-amber-50' },
                  { name: 'Science', icon: '🔬', bg: 'bg-blue-50' },
                  { name: '& More', icon: '💬', bg: 'bg-red-50' },
                ].map((sub, i) => (
                  <div key={i} className={`${sub.bg} rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-3 transition-transform hover:-translate-y-1 cursor-pointer border border-white/50 shadow-sm`}>
                    <span className="text-4xl filter drop-shadow-sm">{sub.icon}</span>
                    <span className="font-bold text-xs text-slate-800">{sub.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Subscription Plans */}
        <section id="pricing" className="py-24 px-6 max-w-7xl mx-auto border-t border-slate-200/60">
          <div className="text-center mb-12">
            <div className="inline-block bg-indigo-100/50 text-indigo-600 font-bold px-4 py-1.5 rounded-full text-xs border border-indigo-100 mb-6">
              Choose Your Plan
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-slate-900 leading-tight mb-4">
              Subscription Plans
            </h2>
            <p className="text-slate-500 font-medium leading-relaxed text-sm max-w-lg mx-auto">
              Unlock more subjects, advanced features and take your GK preparation to the next level with our flexible plans.
            </p>
          </div>
          
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-full p-1 border border-slate-200 inline-flex shadow-sm relative items-center">
              <button onClick={() => setPlanType('normal')} className={`px-8 py-2.5 rounded-full text-sm font-bold transition-colors ${planType === 'normal' ? 'bg-slate-100 text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Normal Plan</button>
              <button onClick={() => setPlanType('pro')} className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${planType === 'pro' ? 'bg-indigo-600 text-white shadow-md' : 'text-indigo-600 hover:bg-indigo-50'}`}>
                Pro Plan <span>👑</span> <span className={`text-[10px] px-2 py-0.5 rounded-full ml-1 ${planType === 'pro' ? 'bg-white text-indigo-600' : 'bg-indigo-100 text-indigo-600'}`}>SOON</span>
              </button>
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(planType === 'normal' 
              ? [
                  { title: 'Normal - 1 Month', price: '99', period: '/month', features: ['50 daily questions', 'Basic subjects', 'Progress tracking', 'Leaderboard (basic)'] },
                  { title: 'Normal - 3 Months', price: '249', period: '/3 months', features: ['50 daily questions', 'Basic subjects', 'Progress tracking', 'Leaderboard (basic)'] },
                  { title: 'Normal - 6 Months', price: '449', period: '/6 months', features: ['50 daily questions', 'Basic subjects', 'Progress tracking', 'Leaderboard (basic)'] },
                  { title: 'Normal - 1 Year', price: '799', period: '/year', features: ['50 daily questions', 'Basic subjects', 'Progress tracking', 'Leaderboard (basic)'] },
                ]
              : [
                  { title: 'Pro - 1 Month', price: '199', period: '/month', features: ['Unlimited questions', 'All subjects unlock', 'Advanced analytics', 'Ad-free experience'] },
                  { title: 'Pro - 3 Months', price: '499', period: '/3 months', features: ['Unlimited questions', 'All subjects unlock', 'Advanced analytics', 'Ad-free experience'] },
                  { title: 'Pro - 6 Months', price: '899', period: '/6 months', features: ['Unlimited questions', 'All subjects unlock', 'Advanced analytics', 'Ad-free experience'] },
                  { title: 'Pro - 1 Year', price: '1499', period: '/year', features: ['Unlimited questions', 'All subjects unlock', 'Advanced analytics', 'Ad-free experience'] },
                ]
            ).map((plan, i) => (
              <div key={i} className={`bg-white rounded-3xl p-8 shadow-sm border ${planType === 'pro' ? 'border-indigo-300 relative overflow-hidden opacity-90' : 'border-slate-200'} flex flex-col hover:shadow-md transition-shadow`}>
                {planType === 'pro' && (
                  <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">
                    PRO
                  </div>
                )}
                <h4 className="font-black text-slate-800 mb-4">{plan.title}</h4>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-3xl font-black text-slate-900">₹{plan.price}</span>
                  <span className="text-xs font-bold text-slate-400">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs font-bold text-slate-600">
                      <span className="text-indigo-500">✓</span> {feat}
                    </li>
                  ))}
                </ul>
                <button 
                  disabled={planType === 'pro'}
                  className={`w-full border-2 font-bold py-2.5 rounded-full text-xs transition-colors ${planType === 'pro' ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed' : 'border-indigo-100 text-indigo-600 hover:bg-indigo-50'}`}>
                  {planType === 'pro' ? 'Coming Soon' : 'Get Started'}
                </button>
              </div>
            ))}
          </div>

          {/* Comparison Table */}
          <div className="mt-20 max-w-4xl mx-auto">
            <h3 className="text-2xl font-black text-center text-slate-800 mb-8">Compare Plan Features</h3>
            <div className="overflow-hidden bg-white rounded-3xl border border-slate-200 shadow-sm overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="py-5 px-6 font-bold text-slate-700 w-1/2">Features</th>
                    <th className="py-5 px-6 font-bold text-slate-700 text-center border-l border-slate-200 w-1/4">Normal Plan</th>
                    <th className="py-5 px-6 font-black text-indigo-700 text-center border-l border-slate-200 bg-indigo-50/50 w-1/4">Pro Plan 👑</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-700">Daily Questions</td>
                    <td className="py-4 px-6 text-center text-slate-500 font-medium border-l border-slate-200">50 Questions/Day</td>
                    <td className="py-4 px-6 text-center text-indigo-600 font-bold border-l border-slate-200 bg-indigo-50/20">Unlimited</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-700">Subject Access</td>
                    <td className="py-4 px-6 text-center text-slate-500 font-medium border-l border-slate-200">Basic Subjects</td>
                    <td className="py-4 px-6 text-center text-indigo-600 font-bold border-l border-slate-200 bg-indigo-50/20">All Subjects Unlocked</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-700">Leaderboard</td>
                    <td className="py-4 px-6 text-center text-slate-500 font-medium border-l border-slate-200">Basic</td>
                    <td className="py-4 px-6 text-center text-indigo-600 font-bold border-l border-slate-200 bg-indigo-50/20">Global & Premium</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-700">Previous Year Questions (PYQs)</td>
                    <td className="py-4 px-6 text-center text-slate-300 font-bold border-l border-slate-200">—</td>
                    <td className="py-4 px-6 text-center text-indigo-500 font-bold border-l border-slate-200 bg-indigo-50/20">✓ Included</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-700">Premium Question Series</td>
                    <td className="py-4 px-6 text-center text-slate-300 font-bold border-l border-slate-200">—</td>
                    <td className="py-4 px-6 text-center text-indigo-500 font-bold border-l border-slate-200 bg-indigo-50/20">✓ Included</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-700">Analytics & Insights</td>
                    <td className="py-4 px-6 text-center text-slate-500 font-medium border-l border-slate-200">Basic Tracking</td>
                    <td className="py-4 px-6 text-center text-indigo-600 font-bold border-l border-slate-200 bg-indigo-50/20">Advanced Analytics</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-700">Ad-free Experience</td>
                    <td className="py-4 px-6 text-center text-slate-300 font-bold border-l border-slate-200">—</td>
                    <td className="py-4 px-6 text-center text-indigo-500 font-bold border-l border-slate-200 bg-indigo-50/20">✓ Included</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-24 px-6 max-w-7xl mx-auto border-t border-slate-200/60">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="flex-1 space-y-6 text-center lg:text-left">
              <div className="inline-block bg-cyan-50 text-cyan-700 font-bold px-4 py-1.5 rounded-full text-xs border border-cyan-100">
                Got Questions?
              </div>
              <h2 className="text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-slate-500 font-medium leading-relaxed text-sm max-w-md mx-auto lg:mx-0">
                Find answers to the most common questions about 1 Byte GK, our features, subscriptions and more.
              </p>
              <div className="pt-4">
                <button className="bg-indigo-600 text-white font-bold text-sm py-3 px-6 rounded-full shadow-md hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 mx-auto lg:mx-0">
                  View All FAQs <span>→</span>
                </button>
              </div>
            </div>
            
            <div className="flex-[1.5] space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                  <button 
                    onClick={() => toggleFaq(i)}
                    className="w-full text-left px-6 py-4 font-bold text-slate-700 text-sm flex justify-between items-center"
                  >
                    <span>{faq.q}</span>
                    <span className="text-slate-400 font-black text-lg">{openFaq === i ? '−' : '+'}</span>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-4 pt-1 text-slate-500 font-medium text-xs leading-relaxed border-t border-slate-50 mt-1">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-[#1C2331] text-white pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center text-slate-900 font-black text-xl">
                1
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-white leading-none">1 Byte GK</span>
                <span className="text-[10px] font-bold text-slate-400 tracking-wider">Learn • Play • Grow</span>
              </div>
            </div>
            <p className="text-slate-400 font-medium text-sm mb-6">
              Smarter Learning. Brighter Future.
            </p>
            <div className="flex gap-3">
              {['f', 'X', 'ig', 'yt', 'in'].map((social, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-slate-700/50 flex items-center justify-center text-xs font-bold cursor-pointer hover:bg-indigo-600 transition-colors border border-slate-600">
                  {social}
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-sm">Quick Links</h4>
            <ul className="space-y-3 text-slate-400 font-medium text-xs">
              <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#study" className="hover:text-white transition-colors">Study Materials</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About App</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Subscription Plans</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-sm">Subjects</h4>
            <ul className="space-y-3 text-slate-400 font-medium text-xs">
              <li><a href="#" className="hover:text-white transition-colors">History</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Polity</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Civics</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Geography</a></li>
              <li><a href="#" className="hover:text-white transition-colors">English</a></li>
              <li><a href="#" className="hover:text-white transition-colors">General Aptitude</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-sm">Support</h4>
            <ul className="space-y-3 text-slate-400 font-medium text-xs mb-8">
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Refund Policy</a></li>
            </ul>
            
            <h4 className="font-bold mb-4 text-sm">Subscribe to Our Newsletter</h4>
            <p className="text-slate-400 text-xs mb-4">Get the latest updates, new features and special offers.</p>
            <div className="flex bg-white rounded-full p-1">
              <input type="email" placeholder="Enter your email address" className="bg-transparent border-none outline-none text-slate-800 text-xs px-4 w-full" />
              <button className="bg-indigo-600 w-8 h-8 rounded-full flex items-center justify-center text-white">→</button>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-6 border-t border-slate-700/50 text-[10px] text-slate-500 flex flex-col md:flex-row justify-between items-center font-medium">
          <p>© {new Date().getFullYear()} 1 Byte GK. All rights reserved.</p>
          <p className="mt-2 md:mt-0 tracking-wider">Learn • Play • Grow</p>
        </div>
      </footer>
    </div>
  );
}

