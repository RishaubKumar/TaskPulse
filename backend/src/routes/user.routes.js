const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
const { verifyToken } = require('../middleware/auth.middleware');
const { generateRoadmapData } = require('../ai/roadmapGenerator');
const { ChatGoogleGenerativeAI } = require('@langchain/google-genai');
const { HumanMessage, SystemMessage } = require('@langchain/core/messages');

router.put('/profile', verifyToken, async (req, res) => {
  try {
    const { firstName, lastName, collegeName, branch, currentYear, gYear } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { firstName, lastName, collegeName, branch, currentYear, gYear },
      { new: true }
    ).select('-password');

    res.json({ message: 'Success', user: updatedUser });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

router.put('/roadmap', verifyToken, async (req, res) => {
  try {
    const { roadmap } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { roadmap },
      { new: true }
    ).select('-password');

    res.json({ message: 'Success', user: updatedUser });
  } catch (error) {
    console.error('Update roadmap error:', error);
    res.status(500).json({ error: 'Failed to update roadmap' });
  }
});

router.post('/roadmap/generate', verifyToken, async (req, res) => {
  try {
    const { branch, goal, level, companies, currentYear } = req.body;
    const roadmap = await generateRoadmapData({ branch, goal, level, companies, currentYear });

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { roadmap },
      { new: true }
    ).select('-password');

    res.json({ message: 'Success', roadmap, user: updatedUser });
  } catch (error) {
    console.error('Generate roadmap error:', error);
    res.status(500).json({ error: 'Failed to generate roadmap' });
  }
});

router.get('/evidence', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('evidence');
    res.json({ evidence: user ? user.evidence : [] });
  } catch (error) {
    console.error('Get evidence error:', error);
    res.status(500).json({ error: 'Failed to fetch evidence items' });
  }
});

router.post('/evidence', verifyToken, async (req, res) => {
  try {
    const { title, milestone, semester, type, link, date, status } = req.body;
    if (!title || !milestone) {
      return res.status(400).json({ error: 'Title and milestone are required.' });
    }

    const newEvidence = {
      title,
      milestone,
      semester: semester || 1,
      type: type || 'GitHub Link',
      link: link || '#',
      date: date || new Date().toISOString().split('T')[0],
      status: status || 'Verified'
    };

    const user = await User.findById(req.userId);
    user.evidence.unshift(newEvidence);
    await user.save();

    res.status(201).json({ message: 'Success', evidence: user.evidence });
  } catch (error) {
    console.error('Add evidence error:', error);
    res.status(500).json({ error: 'Failed to save evidence' });
  }
});

router.delete('/evidence/:id', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    user.evidence = user.evidence.filter(item => item._id.toString() !== req.params.id);
    await user.save();
    res.json({ message: 'Success', evidence: user.evidence });
  } catch (error) {
    console.error('Delete evidence error:', error);
    res.status(500).json({ error: 'Failed to delete evidence item' });
  }
});

router.get('/review', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('reviews');
    res.json({ reviews: user ? user.reviews : [] });
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

router.post('/review/generate', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const roadmap = user.roadmap || [];
    let completedCount = 0;
    let pendingTasks = [];

    roadmap.forEach(sem => {
      if (sem.milestones) {
        sem.milestones.forEach(m => {
          if (m.status === 'done') {
            completedCount++;
          } else {
            pendingTasks.push(m.task);
          }
        });
      }
    });

    let reviewData = null;

    if (process.env.GOOGLE_API_KEY) {
      try {
        const model = new ChatGoogleGenerativeAI({
          model: process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite',
          maxOutputTokens: 2048,
          apiKey: process.env.GOOGLE_API_KEY
        });

        const prompt = [
          new SystemMessage(
            'You are an academic mentor for college students. Analyze progress and return ONLY a minified raw JSON object without markdown or backticks. Format: {"summary":"string under 30 words","priorities":["item1","item2","item3"],"score":"85%"}'
          ),
          new HumanMessage(
            `Student branch: ${user.branch}, year: ${user.currentYear}. Completed milestones: ${completedCount}. Pending milestones: ${pendingTasks.slice(0, 5).join(', ')}.`
          )
        ];

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('AI Request Timeout')), 6000)
        );

        const aiResponse = await Promise.race([model.invoke(prompt), timeoutPromise]);
        let content = aiResponse.content.trim().replace(/```json/g, '').replace(/```/g, '').trim();
        reviewData = JSON.parse(content);
      } catch (aiErr) {
        console.error('AI Review generation failed or timed out:', aiErr.message);
      }
    }

    if (!reviewData) {
      const calculatedScore = pendingTasks.length === 0 ? '100%' : `${Math.min(95, Math.max(50, completedCount * 10))}%`;
      reviewData = {
        summary: pendingTasks.length > 0
          ? `You have completed ${completedCount} milestones. Focus next on ${pendingTasks[0]} to maintain your graduation roadmap pace.`
          : 'Great consistency! All tracked milestones are up to date. Keep pushing into advanced project work.',
        priorities: pendingTasks.length > 0
          ? pendingTasks.slice(0, 3).map(t => `Focus on: ${t}`)
          : ['Explore advanced open-source contributions', 'Refine projects in your Evidence Vault', 'Schedule mock interview practice'],
        score: calculatedScore
      };
    }

    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    const dateStr = new Date().toLocaleDateString('en-US', options);

    const newReview = {
      date: dateStr,
      summary: reviewData.summary,
      priorities: reviewData.priorities || [],
      score: reviewData.score || '80%'
    };

    user.reviews.unshift(newReview);
    await user.save();

    res.json({ message: 'Success', review: newReview, reviews: user.reviews });
  } catch (error) {
    console.error('Generate review error:', error);
    res.status(500).json({ error: 'Failed to generate weekly review' });
  }
});

router.post('/resume-review', verifyToken, async (req, res) => {
  try {
    const { resumeText } = req.body;
    if (!resumeText || resumeText.trim().length < 20) {
      return res.status(400).json({ error: 'Please provide at least 20 characters of resume content or project descriptions.' });
    }

    const user = await User.findById(req.userId);
    let reviewResult = null;

    if (process.env.GOOGLE_API_KEY) {
      try {
        const model = new ChatGoogleGenerativeAI({
          model: process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite',
          maxOutputTokens: 2048,
          apiKey: process.env.GOOGLE_API_KEY
        });

        const prompt = [
          new SystemMessage(
            'You are a technical college campus placement reviewer. Evaluate the student resume and return ONLY a raw JSON object without markdown or backticks. Format: {"score": 82, "strengths": ["point 1", "point 2"], "improvements": ["improvement 1", "improvement 2"], "verdict": "string under 30 words"}'
          ),
          new HumanMessage(
            `Target Branch: ${user ? user.branch : 'CSE'}. Resume Content: ${resumeText}`
          )
        ];

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('AI Request Timeout')), 6000)
        );

        const aiResponse = await Promise.race([model.invoke(prompt), timeoutPromise]);
        let content = aiResponse.content.trim().replace(/```json/g, '').replace(/```/g, '').trim();
        reviewResult = JSON.parse(content);
      } catch (aiErr) {
        console.error('AI Resume Review failed or timed out:', aiErr.message);
      }
    }

    if (!reviewResult) {
      reviewResult = {
        score: 78,
        strengths: [
          'Good foundational technical coursework and branch alignment',
          'Demonstrates effort towards practical projects and learning'
        ],
        improvements: [
          'Add quantifiable metrics to project bullet points (e.g. latency improved, users impacted)',
          'Include links to hosted live demos and GitHub repositories in Evidence Vault'
        ],
        verdict: 'Solid foundation for campus recruitment. Enhancing project metrics will boost shortlisting chances.'
      };
    }

    res.json({ message: 'Success', review: reviewResult });
  } catch (error) {
    console.error('Resume review error:', error);
    res.status(500).json({ error: 'Failed to review resume' });
  }
});

router.get('/deadlines', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (user.isModified('deadlines')) {
      await user.save();
    }
    res.json({ deadlines: user.deadlines || [] });
  } catch (error) {
    console.error('Get deadlines error:', error);
    res.status(500).json({ error: 'Failed to fetch deadlines' });
  }
});

router.post('/deadlines', verifyToken, async (req, res) => {
  try {
    const { title, timeframe } = req.body;
    if (!title || !timeframe) {
      return res.status(400).json({ error: 'Title and timeframe are required.' });
    }
    const user = await User.findById(req.userId);
    user.deadlines.unshift({ title: title.trim(), timeframe: timeframe.trim() });
    await user.save();
    res.status(201).json({ message: 'Success', deadlines: user.deadlines });
  } catch (error) {
    console.error('Add deadline error:', error);
    res.status(500).json({ error: 'Failed to add deadline' });
  }
});

router.put('/deadlines/:id', verifyToken, async (req, res) => {
  try {
    const { title, timeframe } = req.body;
    if (!title || !timeframe) {
      return res.status(400).json({ error: 'Title and timeframe are required.' });
    }
    const user = await User.findById(req.userId);
    const item = user.deadlines.id(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Deadline item not found.' });
    }
    item.title = title.trim();
    item.timeframe = timeframe.trim();
    await user.save();
    res.json({ message: 'Success', deadlines: user.deadlines });
  } catch (error) {
    console.error('Update deadline error:', error);
    res.status(500).json({ error: 'Failed to update deadline' });
  }
});

router.delete('/deadlines/:id', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    user.deadlines = user.deadlines.filter((item) => item._id.toString() !== req.params.id);
    await user.save();
    res.json({ message: 'Success', deadlines: user.deadlines });
  } catch (error) {
    console.error('Delete deadline error:', error);
    res.status(500).json({ error: 'Failed to delete deadline' });
  }
});

module.exports = router;
