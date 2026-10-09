const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/daily', require('./routes/daily'));
app.use('/api/subjects', require('./routes/subjects'));
app.use('/api/series', require('./routes/series'));
app.use('/api/users', require('./routes/users'));
app.use('/api/questions', require('./routes/questions'));

app.get('/', (req, res) => {
  res.send('1 Byte GK API is running...');
});

// JSON error handler for API routes
app.use('/api', (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Server Error' });
});

app.use((req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API route not found' });
  }
  res.status(404).send('Not found');
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`Server running on port `));
}
module.exports = app;


