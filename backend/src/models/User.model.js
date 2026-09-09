const mongoose = require('mongoose');

const evidenceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  milestone: {
    type: String,
    required: true
  },
  semester: {
    type: Number,
    default: 1
  },
  type: {
    type: String,
    default: 'GitHub Link'
  },
  link: {
    type: String,
    default: '#'
  },
  date: {
    type: String,
    default: () => new Date().toISOString().split('T')[0]
  },
  status: {
    type: String,
    default: 'Verified'
  }
});

const reviewSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  priorities: {
    type: [String],
    default: []
  },
  score: {
    type: String,
    default: '80%'
  }
});

const deadlineSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  timeframe: {
    type: String,
    required: true,
    trim: true
  }
});

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      default: '',
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    collegeName: {
      type: String,
      default: ''
    },
    branch: {
      type: String,
      default: ''
    },
    currentYear: {
      type: String,
      default: 'Year 1'
    },
    gYear: {
      type: String,
      default: '2028'
    },
    password: {
      type: String,
      required: true
    },
    roadmap: {
      type: Array,
      default: []
    },
    evidence: {
      type: [evidenceSchema],
      default: []
    },
    reviews: {
      type: [reviewSchema],
      default: []
    },
    deadlines: {
      type: [deadlineSchema],
      default: () => [
        { title: 'Summer Internship Applications (Tier-1 / Startups)', timeframe: 'In 4 days' },
        { title: 'College Mid-Semester Technical Assessment', timeframe: 'Next week' },
        { title: 'Smart India Hackathon / Open Source Submissions', timeframe: '3 weeks' },
        { title: 'Campus Mock Placement Drive (Aptitude + Technical)', timeframe: 'Next month' }
      ]
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', userSchema);