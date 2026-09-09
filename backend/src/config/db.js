const mongoose = require('mongoose');

let cachedConnection = null;

const connectDB = async () => {
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }

  const connUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/taskpulse';

  try {
    cachedConnection = await mongoose.connect(connUri, {
      serverSelectionTimeoutMS: 5000
    });
    console.log('MongoDB Connected');
    return cachedConnection;
  } catch (error) {
    console.error('Database connection failed:', error.message);
    throw error;
  }
};

module.exports = connectDB;
