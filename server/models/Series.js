const mongoose = require('mongoose');

const seriesSchema = new mongoose.Schema({
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  name: { type: String, required: true }, // e.g., 'Ancient India'
  slug: { type: String, required: true },
  order: { type: Number, default: 1 },
  description: { type: String },
  isPremium: { type: Boolean, default: false },
  totalQuestions: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Series', seriesSchema);
