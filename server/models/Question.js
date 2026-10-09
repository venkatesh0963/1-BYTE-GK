const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: Number, required: true },
  explanation: { type: String },
  target: { type: String, enum: ['daily', 'series'], default: 'series' },
  subject: { type: String }, // Optional if target is daily
  topic: { type: String },   // Optional if target is daily
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'easy' },
  xp: { type: Number, default: 10 },
  isPremium: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);
