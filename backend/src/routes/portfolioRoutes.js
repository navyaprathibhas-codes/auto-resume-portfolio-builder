import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { getPortfolioByUserId, saveOrUpdatePortfolio, deletePortfolio } from '../storage.js';

const router = express.Router();

// GET /api/portfolios - Get portfolio for current user
router.get('/', authenticateToken, (req, res) => {
  const portfolio = getPortfolioByUserId(req.user.id);
  res.json({ portfolio: portfolio || null });
});

// POST /api/portfolios - Save or Update portfolio
router.post('/', authenticateToken, (req, res) => {
  const { title, bio, theme, customSections, featuredProjects } = req.body;

  const portfolioPayload = {
    id: `portfolio-${req.user.id}`,
    userId: req.user.id,
    title: title || `${req.user.name}'s Portfolio`,
    bio: bio || '',
    theme: theme || 'modern',
    customSections: customSections || [],
    featuredProjects: featuredProjects || []
  };

  const saved = saveOrUpdatePortfolio(portfolioPayload);
  res.status(200).json({ portfolio: saved });
});

// DELETE /api/portfolios - Delete portfolio
router.delete('/', authenticateToken, (req, res) => {
  const deleted = deletePortfolio(req.user.id);
  if (!deleted) {
    return res.status(404).json({ error: 'Portfolio not found' });
  }
  res.json({ message: 'Portfolio deleted successfully' });
});

export default router;
