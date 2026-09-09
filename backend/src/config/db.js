const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/taskpulse';
    await mongoose.connect(connUri);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
