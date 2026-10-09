const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  avatar: { type: String, default: '' },
  
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  
  currentStreak: { type: Number, default: 0 },
  longestStreak: { type: Number, default: 0 },
  dailyQuestionsCompleted: { type: Number, default: 0 },
  
  subscription: {
    plan: { type: String, enum: ['free', 'normal', 'pro'], default: 'free' },
    duration: { type: String, enum: ['none', '1_month', '3_month', '6_month', '1_year'], default: 'none' },
    startDate: { type: Date },
    endDate: { type: Date },
    status: { type: String, enum: ['active', 'inactive', 'expired'], default: 'inactive' }
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
