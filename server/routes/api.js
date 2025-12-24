import express from 'express';
import { matchJobs, analyzeResume } from '../controllers/jobController.js';
import { optimizeLinkedIn } from '../controllers/linkedInController.js';
import { submitApplication } from '../controllers/applicationController.js';

const router = express.Router();

// Job matching routes
router.post('/match-jobs', matchJobs);
router.post('/analyze-resume', analyzeResume);

// LinkedIn optimization routes
router.post('/optimize-linkedin', optimizeLinkedIn);

// Application routes
router.post('/submit-application', submitApplication);

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

export default router;
