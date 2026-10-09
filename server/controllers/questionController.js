const Question = require('../models/Question');

exports.getAllQuestions = async (req, res) => {
  try {
    const filter = {};
    if (req.query.topic) filter.topic = req.query.topic;
    if (req.query.subject) filter.subject = req.query.subject;
    
    const questions = await Question.find(filter).sort({ createdAt: -1 });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addQuestion = async (req, res) => {
  try {
    const newQuestion = await Question.create(req.body);
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
