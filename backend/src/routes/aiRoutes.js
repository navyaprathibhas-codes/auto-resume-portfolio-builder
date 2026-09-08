import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { generateResumeContent, enhanceBulletPoint, generatePortfolioContent } from '../services/geminiService.js';

const router = express.Router();

// POST /api/ai/generate-resume
router.post('/generate-resume', authenticateToken, async (req, res) => {
  try {
    const resumeData = req.body.resumeData || req.body;
    const generatedData = await generateResumeContent(resumeData);
    res.json({ success: true, data: generatedData });
  } catch (error) {
    console.error('Gemini Generate Resume Error:', error.message);
    const statusCode = error.message.includes('GEMINI_API_KEY') ? 400 : 500;
    res.status(statusCode).json({ error: error.message || 'Failed to generate AI resume content' });
  }
});

// POST /api/ai/enhance-bullet
router.post('/enhance-bullet', authenticateToken, async (req, res) => {
  try {
    const { bulletText, targetRole } = req.body;
    if (!bulletText) {
      return res.status(400).json({ error: 'bulletText is required' });
    }
    const result = await enhanceBulletPoint(bulletText, targetRole);
    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Gemini Enhance Bullet Error:', error.message);
    const statusCode = error.message.includes('GEMINI_API_KEY') ? 400 : 500;
    res.status(statusCode).json({ error: error.message || 'Failed to enhance bullet point' });
  }
});

// POST /api/ai/generate-portfolio
router.post('/generate-portfolio', authenticateToken, async (req, res) => {
  try {
    const resumeData = req.body.resumeData || req.body;
    const generatedPortfolio = await generatePortfolioContent(resumeData);
    res.json({ success: true, data: generatedPortfolio });
  } catch (error) {
    console.error('Gemini Generate Portfolio Error:', error.message);
    const statusCode = error.message.includes('GEMINI_API_KEY') ? 400 : 500;
    res.status(statusCode).json({ error: error.message || 'Failed to generate AI portfolio content' });
  }
});

export default router;
