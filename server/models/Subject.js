const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  icon: { type: String }, // e.g., '🏛️'
  description: { type: String },
  color: { type: String } // Tailwind color class or hex
}, { timestamps: true });

module.exports = mongoose.model('Subject', subjectSchema);
