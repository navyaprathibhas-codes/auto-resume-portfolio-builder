import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { getResumesByUserId, getResumeById, saveOrUpdateResume, deleteResume } from '../storage.js';

const router = express.Router();

// GET /api/resumes - Get all resumes for current user
router.get('/', authenticateToken, (req, res) => {
  const resumes = getResumesByUserId(req.user.id);
  res.json({ resumes });
});

// GET /api/resumes/:id - Get specific resume
router.get('/:id', authenticateToken, (req, res) => {
  const resume = getResumeById(req.params.id);
  if (!resume || resume.userId !== req.user.id) {
    return res.status(404).json({ error: 'Resume not found' });
  }
  res.json({ resume });
});

// POST /api/resumes - Save or Update resume
router.post('/', authenticateToken, (req, res) => {
  const { id, title, template, personalInfo, careerInfo, education, skills, projects, workExperience, certifications, achievements } = req.body;

  const resumeId = id || `resume-${Date.now()}`;
  const resumePayload = {
    id: resumeId,
    userId: req.user.id,
    title: title || 'Default Resume',
    template: template || 'modern',
    personalInfo: personalInfo || {},
    careerInfo: careerInfo || {},
    education: education || [],
    skills: skills || [],
    projects: projects || [],
    workExperience: workExperience || [],
    certifications: certifications || [],
    achievements: achievements || []
  };

  const saved = saveOrUpdateResume(resumePayload);
  res.status(200).json({ resume: saved });
});

// DELETE /api/resumes/:id - Delete resume
router.delete('/:id', authenticateToken, (req, res) => {
  const deleted = deleteResume(req.params.id, req.user.id);
  if (!deleted) {
    return res.status(404).json({ error: 'Resume not found or unauthorized' });
  }
  res.json({ message: 'Resume deleted successfully' });
});

export default router;
