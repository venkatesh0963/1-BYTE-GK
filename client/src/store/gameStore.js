import { create } from 'zustand';
import axios from 'axios';

const useGameStore = create((set, get) => ({
  questions: [],
  currentIndex: 0,
  score: 0,
  xpEarned: 0,
  isLoading: false,
  isFinished: false,

  fetchDailyChallenge: async () => {
    set({ isLoading: true });
    
    // Default fallback mock
    let fallbackQuestions = Array.from({ length: 50 }).map((_, i) => ({
      _id: `mock-${i}`,
      question: `Question ${i + 1} / 50: Who was the first President of India?`,
      options: ["Jawaharlal Nehru", "Dr. Rajendra Prasad", "S. Radhakrishnan", "B. R. Ambedkar"],
      correctAnswer: 1,
      xp: 10
    }));

    try {
      const res = await axios.get('/api/daily/today');
      set({ 
        questions: res.data.questions, 
        isLoading: false,
        currentIndex: 0,
        score: 0,
        xpEarned: 0,
        isFinished: false
      });
    } catch (err) {
      set({ questions: fallbackQuestions, isLoading: false, currentIndex: 0, score: 0, xpEarned: 0, isFinished: false });
    }
  },

  fetchSeriesChallenge: async (seriesId, seriesName) => {
    set({ isLoading: true });
    
    try {
      // Fetch from real database using the seriesName as topic
      const res = await axios.get(`/api/questions?topic=${seriesName}`);
      const specificQuestions = res.data;
      
      if (specificQuestions.length > 0) {
        set({ 
          questions: specificQuestions, 
          isLoading: false,
          currentIndex: 0,
          score: 0,
          xpEarned: 0,
          isFinished: false
        });
        return;
      }
    } catch (err) {
      console.error('Failed to fetch series questions', err);
    }

    // Fallback Mock if DB is empty
    let fallbackQuestions = [];
    if (seriesId === '101') { 
      fallbackQuestions = [
        { _id: 'a1', subject: 'History', question: 'The Indus Valley Civilization was discovered in which year?', options: ['1921', '1922', '1930', '1919'], correctAnswer: 0, xp: 10 },
        { _id: 'a2', subject: 'History', question: 'Which Veda is the oldest?', options: ['Rigveda', 'Samaveda', 'Yajurveda', 'Atharvaveda'], correctAnswer: 0, xp: 10 },
      ];
    } else {
      fallbackQuestions = [
        { _id: 'g1', subject: 'Geography', question: `Generic mock question for ${seriesName}?`, options: ['Option A', 'Option B', 'Option C', 'Option D'], correctAnswer: 0, xp: 10 },
      ];
    }

    set({ 
      questions: fallbackQuestions, 
      isLoading: false,
      currentIndex: 0,
      score: 0,
      xpEarned: 0,
      isFinished: false
    });
  },

  submitAnswer: async (selectedOptionIndex) => {
    const { questions, currentIndex, score, xpEarned } = get();
    const currentQ = questions[currentIndex];
    
    let isCorrect = selectedOptionIndex === currentQ.correctAnswer;
    let gainedXp = isCorrect ? currentQ.xp : 5;
    let explanation = isCorrect ? 'Correct! Dr. Rajendra Prasad was the first President.' : 'Incorrect. The correct answer was Dr. Rajendra Prasad.';

    try {
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      const userId = storedUser._id;
      const res = await axios.post('/api/daily/answer', {
        userId,
        questionId: currentQ._id,
        selectedAnswer: selectedOptionIndex,
        subject: currentQ.subject || 'History' // Mock default
      });
      isCorrect = res.data.correct;
      gainedXp = res.data.xpEarned;
      explanation = res.data.explanation;
    } catch (err) {
      console.error('Failed to save answer to backend', err);
    }

    set({ 
      score: isCorrect ? score + 1 : score,
      xpEarned: xpEarned + gainedXp,
    });
    
    return { isCorrect, gainedXp, explanation };
  },

  nextQuestion: () => {
    const { currentIndex, questions } = get();
    if (currentIndex + 1 < questions.length) {
      set({ currentIndex: currentIndex + 1 });
    } else {
      set({ isFinished: true });
    }
  },

  prevQuestion: () => {
    const { currentIndex } = get();
    if (currentIndex > 0) {
      set({ currentIndex: currentIndex - 1 });
    }
  }
}));

export default useGameStore;


