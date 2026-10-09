const mongoose = require('mongoose');

const dailyChallengeSchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true }, // Format: YYYY-MM-DD
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  totalQuestions: { type: Number, default: 50 }
}, { timestamps: true });

module.exports = mongoose.model('DailyChallenge', dailyChallengeSchema);
