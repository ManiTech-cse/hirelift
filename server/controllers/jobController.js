import { GoogleGenAI } from '@google/genai';

// Initialize Gemini AI
const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || 'demo-key'
});

export const matchJobs = async (req, res) => {
  try {
    const { resumeText, preferences } = req.body;

    if (!resumeText) {
      return res.status(400).json({ error: 'Resume text is required' });
    }    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'demo-key') {
      console.warn('⚠️  Gemini API Key not configured - returning demo data');
      return res.json({
        jobs: [
          {
            title: "Senior Software Engineer",
            company: "Tech Corp",
            location: "Remote",
            type: "Full-time",
            salary: "$120k - $180k",
            description: "Join our team to build cutting-edge solutions",
            matchScore: 92,
            skills: ["React", "Node.js", "TypeScript"],
            requirements: ["5+ years experience", "Bachelor's degree"]
          }
        ],
        total: 1,
        message: "Demo data - please configure GEMINI_API_KEY in .env"
      });
    }

    // Use Gemini AI to analyze and match jobs
    const model = await genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `Based on the following resume and preferences, suggest 5 relevant job matches with detailed information:

Resume: ${resumeText}

Preferences: ${JSON.stringify(preferences)}

Please provide a JSON array of job matches with the following structure:
[
  {
    "title": "Job Title",
    "company": "Company Name",
    "location": "Location",
    "type": "Full-time/Part-time/Contract",
    "salary": "Salary range",
    "description": "Job description",
    "matchScore": 85,
    "skills": ["skill1", "skill2"],
    "requirements": ["requirement1", "requirement2"]
  }
]`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the AI response
    let jobs = [];
    try {
      // Extract JSON from the response
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        jobs = JSON.parse(jsonMatch[0]);
      }
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      // Return sample data if parsing fails
      jobs = [
        {
          title: "Senior Software Engineer",
          company: "Tech Corp",
          location: "Remote",
          type: "Full-time",
          salary: "$120k - $180k",
          description: "Join our team to build cutting-edge solutions",
          matchScore: 92,
          skills: ["React", "Node.js", "TypeScript"],
          requirements: ["5+ years experience", "Bachelor's degree"]
        }
      ];
    }

    res.json({ jobs, total: jobs.length });
  } catch (error) {
    console.error('Error matching jobs:', error);
    res.status(500).json({ error: 'Failed to match jobs', details: error.message });
  }
};

export const analyzeResume = async (req, res) => {
  try {
    const { resumeText } = req.body;

    if (!resumeText) {
      return res.status(400).json({ error: 'Resume text is required' });
    }

    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'demo-key') {
      console.warn('⚠️  Gemini API Key not configured - returning demo data');
      return res.json({
        score: 75,
        strengths: ["Clear formatting", "Good experience summary"],
        improvements: ["Add more quantifiable achievements", "Include relevant keywords"],
        keywords: ["JavaScript", "React", "Node.js"],
        summary: "Good resume with room for improvement (Demo mode - configure API key)",
        message: "Demo data - please configure GEMINI_API_KEY in .env"
      });
    }

    const model = await genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `Analyze the following resume and provide detailed feedback:

${resumeText}

Please provide analysis in the following JSON format:
{
  "score": 85,
  "strengths": ["strength1", "strength2"],
  "improvements": ["improvement1", "improvement2"],
  "keywords": ["keyword1", "keyword2"],
  "summary": "Overall summary of the resume"
}`; const result = await model.generateContent({ contents: [{ parts: [{ text: prompt }] }] });
    const text = result.text;

    // Parse the AI response
    let analysis = {};
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      }
    } catch (parseError) {
      analysis = {
        score: 75,
        strengths: ["Clear formatting", "Good experience summary"],
        improvements: ["Add more quantifiable achievements", "Include relevant keywords"],
        keywords: ["JavaScript", "React", "Node.js"],
        summary: "Good resume with room for improvement"
      };
    }

    res.json(analysis);
  } catch (error) {
    console.error('Error analyzing resume:', error);
    res.status(500).json({ error: 'Failed to analyze resume', details: error.message });
  }
};
