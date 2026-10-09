const DailyChallenge = require('../models/DailyChallenge');
const Question = require('../models/Question');
const UserAnswer = require('../models/UserAnswer');
const User = require('../models/User');

exports.getTodayChallenge = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    // Fetch up to 50 daily questions from the DB
    const questionsFromDb = await Question.find({ target: 'daily' }).limit(50);
    
    if (questionsFromDb.length > 0) {
      return res.json({
        date: today,
        totalQuestions: questionsFromDb.length,
        questions: questionsFromDb
      });
    }

    // Fallback if DB is completely empty
    return res.json({ 
      date: today,
      totalQuestions: 50,
      questions: Array.from({ length: 50 }).map((_, i) => ({
        _id: `mock-${i}`,
        question: `Mock Question ${i + 1}: Who was the first President of India?`,
        options: ["Jawaharlal Nehru", "Dr. Rajendra Prasad", "S. Radhakrishnan", "B. R. Ambedkar"],
        correctAnswer: 1,
        xp: 10
      }))
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.submitAnswer = async (req, res) => {
  try {
    // Expect userId in req.body for now
    let { userId, questionId, selectedAnswer, timeTaken, subject } = req.body;
    
    if (!userId) {
      let user = await User.findOne();
      if (!user) user = await User.create({ name: 'Rahul', email: 'rahul@example.com', passwordHash: 'dummy' });
      userId = user._id;
    }

    // Grade answer based on real question or fallback
    let isCorrect = selectedAnswer === 1; // default fallback mock assumption
    let xpEarned = 5; 
    let explanation = isCorrect ? 'Correct!' : 'Incorrect';

    if (questionId && !questionId.startsWith('mock')) {
      const q = await Question.findById(questionId);
      if (q) {
        isCorrect = (selectedAnswer === q.correctAnswer);
        xpEarned = isCorrect ? q.xp : 5;
        explanation = q.explanation || (isCorrect ? 'Correct!' : `Incorrect. The correct answer was option ${q.correctAnswer + 1}.`);
      }
    } else {
      if (isCorrect) xpEarned += 5; 
    }

    // Save answer
    await UserAnswer.create({
      userId,
      questionId: questionId || '60d5ecb8b392d700153ee000', // Mock ObjectId if missing
      subject: subject || 'General',
      selectedAnswer,
      correct: isCorrect,
      xpEarned,
      timeTaken: timeTaken || 10
    });

    // Update user stats
    await User.findByIdAndUpdate(userId, {
      $inc: { xp: xpEarned, dailyQuestionsCompleted: 1 }
    });

    res.json({
      correct: isCorrect,
      xpEarned,
      explanation
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
