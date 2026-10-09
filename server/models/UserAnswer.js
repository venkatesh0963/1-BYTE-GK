const mongoose = require('mongoose');

const userAnswerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  subject: { type: String, default: 'General' },
  selectedAnswer: { type: Number, required: true },
  correct: { type: Boolean, required: true },
  xpEarned: { type: Number, required: true },
  timeTaken: { type: Number },
  answeredAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserAnswer', userAnswerSchema);
