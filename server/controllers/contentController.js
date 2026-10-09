const Subject = require('../models/Subject');
const Series = require('../models/Series');

exports.getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().sort({ createdAt: 1 });
    if (subjects.length > 0) {
      return res.json(subjects);
    }
    // Fallback if empty
    res.json([
      { _id: '1', name: 'History', slug: 'history', icon: '🏛️', color: 'bg-orange-100' },
      { _id: '2', name: 'Polity', slug: 'polity', icon: '⚖️', color: 'bg-blue-100' },
    ]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addSubject = async (req, res) => {
  try {
    const newSub = await Subject.create(req.body);
    res.status(201).json(newSub);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSubjectSeries = async (req, res) => {
  try {
    const { slug } = req.params;
    const subject = await Subject.findOne({ slug });
    if (!subject) return res.status(404).json({ error: 'Subject not found' });

    const seriesList = await Series.find({ subjectId: subject._id }).sort({ order: 1 });
    if (seriesList.length > 0) {
      return res.json(seriesList);
    }
    // Mock fallback
    res.json([
      { _id: '101', name: 'Ancient India', slug: 'ancient-india', isPremium: false },
    ]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addSeries = async (req, res) => {
  try {
    const newSeries = await Series.create(req.body);
    res.status(201).json(newSeries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSeriesDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const series = await Series.findById(id);
    if (series) return res.json(series);
    
    res.json({ _id: id, name: 'Ancient India', isPremium: false });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
