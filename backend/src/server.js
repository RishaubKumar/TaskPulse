require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const { register, login } = require('./controllers/auth.controller');
const { generateRoadmapData } = require('./ai/roadmapGenerator');
const User = require('./models/User.model');

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.post('/api/register', register);
app.post('/api/login', login);

app.post('/api/generate-roadmap', async (req, res) => {
  try {
    const { branch, goal, level, companies, currentYear, userId } = req.body;
    const roadmap = await generateRoadmapData({ branch, goal, level, companies, currentYear });

    if (userId) {
      await User.findByIdAndUpdate(userId, { roadmap });
    }

    res.json({ message: 'Success', roadmap });
  } catch (error) {
    console.error('Generate roadmap error:', error);
    res.status(500).json({ error: 'Failed to generate roadmap' });
  }
});

app.get(['/health', '/api/health'], (req, res) => {
  res.json({ status: 'ok', message: 'TaskPulse API is active' });
});

const clientDistPath = path.join(__dirname, '../../frontend/dist');
app.use(express.static(clientDistPath));

app.use('/api', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

app.listen(port, () => {
  console.log(`TaskPulse server running on port ${port}`);
});

module.exports = app;
