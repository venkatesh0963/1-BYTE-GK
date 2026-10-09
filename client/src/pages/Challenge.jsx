import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import useGameStore from '../store/gameStore';

export default function Challenge() {
  const { questions, currentIndex, fetchDailyChallenge, fetchSeriesChallenge, submitAnswer, nextQuestion, prevQuestion, isFinished, isLoading } = useGameStore();
  
  // Local state to track answers and timer
  const [answers, setAnswers] = useState({}); // { [index]: { selectedOption, feedback } }
  const [timeLeft, setTimeLeft] = useState(25);
  const [selectedOption, setSelectedOption] = useState(null);
  
  const timerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const seriesId = location.state?.seriesId;
  const seriesName = location.state?.seriesName;

  useEffect(() => {
    if (seriesId) {
      fetchSeriesChallenge(seriesId, seriesName);
    } else {
      fetchDailyChallenge();
    }
  }, [fetchDailyChallenge, fetchSeriesChallenge, seriesId, seriesName]);

  useEffect(() => {
    if (isFinished) {
      navigate('/result');
    }
  }, [isFinished, navigate]);

  // Handle timer
  useEffect(() => {
    if (isLoading || questions.length === 0) return;
    
    // Reset timer and selected option when index changes
    setTimeLeft(25);
    setSelectedOption(null);
    
    if (timerRef.current) clearInterval(timerRef.current);
    
    // Only run timer if not answered yet
    if (!answers[currentIndex]) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setTimeLeft(0); // If answered, timer is stopped
    }

    return () => clearInterval(timerRef.current);
  }, [currentIndex, isLoading, questions.length, answers]);

  const handleSubmit = async () => {
    if (selectedOption === null || answers[currentIndex]) return;
    if (timerRef.current) clearInterval(timerRef.current);

    const feedback = await submitAnswer(selectedOption);
    setAnswers(prev => ({
      ...prev,
      [currentIndex]: { selectedOption, feedback }
    }));
  };

  if (isLoading || questions.length === 0) return <div className="text-center font-bold text-slate-500">Loading Challenge...</div>;

  const currentQ = questions[currentIndex];
  const currentAnswer = answers[currentIndex];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-black text-slate-800">{seriesName || 'Daily Challenge'}</h2>
      </div>

      <div className="flex justify-between items-end mb-2 px-2">
        <div>
          <p className="text-sm font-black text-slate-400 uppercase tracking-wider mb-1">Question {currentIndex + 1} of {questions.length}</p>
          <p className="text-sm font-bold text-yellow-500 flex items-center gap-1">⭐ +{currentQ.xp} XP</p>
        </div>
        
        <div className="flex flex-col items-end">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Time Remaining</p>
          <div className={`text-2xl font-black ${timeLeft <= 5 ? 'text-red-500' : 'text-primary-500'}`}>
            00:{String(timeLeft).padStart(2, '0')}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-clay-card rounded-3xl p-6 shadow-clay-card space-y-6"
        >
          <h3 className="text-xl font-bold text-slate-800 leading-relaxed">
            {currentQ.question}
          </h3>

          <div className="space-y-4">
            {currentQ.options.map((opt, i) => {
              const isSelected = selectedOption === i || currentAnswer?.selectedOption === i;
              
              // Post-submit styling
              let borderStyle = 'border-transparent';
              if (currentAnswer) {
                if (i === currentQ.correctAnswer) borderStyle = 'border-primary-500 bg-primary-50'; // Highlight correct answer
                else if (isSelected && !currentAnswer.feedback.isCorrect) borderStyle = 'border-red-500 bg-red-50'; // Highlight wrong selection
              }

              return (
                <button
                  key={i}
                  disabled={!!currentAnswer}
                  onClick={() => setSelectedOption(i)}
                  className={`w-full text-left rounded-2xl px-6 py-4 outline-none font-medium transition-all border-2
                    ${!currentAnswer ? 'bg-clay-bg shadow-clay-btn hover:shadow-clay-btn-pressed' : 'shadow-none'}
                    ${isSelected && !currentAnswer ? 'border-primary-400 bg-primary-50' : borderStyle}
                  `}
                >
                  <span className={`inline-block w-8 font-bold ${isSelected ? 'text-primary-600' : 'text-slate-400'}`}>
                    {String.fromCharCode(65 + i)}.
                  </span>
                  <span className="text-slate-700">{opt}</span>
                </button>
              );
            })}
          </div>

          {!currentAnswer ? (
            <button
              onClick={handleSubmit}
              disabled={selectedOption === null || timeLeft === 0}
              className={`w-full font-bold rounded-2xl py-4 transition-all mt-4 ${
                selectedOption !== null && timeLeft > 0
                  ? 'bg-primary-500 text-white shadow-clay-btn hover:shadow-clay-btn-pressed'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              {timeLeft === 0 ? "TIME'S UP" : "SUBMIT ANSWER"}
            </button>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-2xl mt-6 border-l-4 ${currentAnswer.feedback.isCorrect ? 'bg-primary-50 border-primary-500' : 'bg-red-50 border-red-500'}`}
            >
              <h4 className={`font-black text-lg mb-1 ${currentAnswer.feedback.isCorrect ? 'text-primary-600' : 'text-red-600'}`}>
                {currentAnswer.feedback.isCorrect ? '✨ Correct!' : '❌ Incorrect'}
              </h4>
              <p className="text-sm font-medium text-slate-600">{currentAnswer.feedback.explanation}</p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between items-center px-2 pt-4">
        <button 
          onClick={prevQuestion}
          disabled={currentIndex === 0}
          className={`font-bold py-2 px-6 rounded-xl transition-colors ${currentIndex > 0 ? 'text-primary-600 hover:bg-clay-bg shadow-inner' : 'text-slate-300'}`}
        >
          ← Previous
        </button>
        <button 
          onClick={nextQuestion}
          className="bg-primary-100 text-primary-700 font-bold py-2 px-6 rounded-xl hover:bg-primary-200 transition-colors"
        >
          {currentIndex === questions.length - 1 ? 'Finish' : 'Next →'}
        </button>
      </div>
    </div>
  );
}
