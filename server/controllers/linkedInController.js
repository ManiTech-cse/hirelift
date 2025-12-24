import { GoogleGenAI } from '@google/genai';

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || 'demo-key'
});

export const optimizeLinkedIn = async (req, res) => {
  try {
    const { profileData, targetRole } = req.body;

    if (!profileData) {
      return res.status(400).json({ error: 'Profile data is required' });
    }

    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'demo-key') {
      console.warn('⚠️  Gemini API Key not configured - returning demo data');
      return res.json({
        headline: "Experienced Professional | Expert in [Your Field]",
        summary: "Passionate professional with proven track record...",
        keywords: ["Leadership", "Innovation", "Results-driven"],
        improvements: [
          {
            section: "Headline",
            suggestion: "Make it more specific and include keywords",
            priority: "high"
          }
        ],
        score: 75,
        message: "Demo data - please configure GEMINI_API_KEY in .env"
      });
    }

    const model = await genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `Optimize the following LinkedIn profile for the target role: ${targetRole || 'any role'}

Profile Data: ${JSON.stringify(profileData)}

Please provide optimization suggestions in the following JSON format:
{
  "headline": "Optimized headline",
  "summary": "Optimized summary/about section",
  "keywords": ["keyword1", "keyword2"],
  "improvements": [
    {
      "section": "Section name",
      "suggestion": "Detailed suggestion",
      "priority": "high/medium/low"
    }
  ],
  "score": 85
}`; const result = await model.generateContent({ contents: [{ parts: [{ text: prompt }] }] });
    const text = result.text;

    // Parse the AI response
    let optimization = {};
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        optimization = JSON.parse(jsonMatch[0]);
      }
    } catch (parseError) {
      optimization = {
        headline: "Experienced Professional | Expert in [Your Field]",
        summary: "Passionate professional with proven track record...",
        keywords: ["Leadership", "Innovation", "Results-driven"],
        improvements: [
          {
            section: "Headline",
            suggestion: "Make it more specific and include keywords",
            priority: "high"
          }
        ],
        score: 75
      };
    }

    res.json(optimization);
  } catch (error) {
    console.error('Error optimizing LinkedIn profile:', error);
    res.status(500).json({ error: 'Failed to optimize profile', details: error.message });
  }
};
