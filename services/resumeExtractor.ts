// AI-Powered Resume Extractor using Google Gemini
import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = "AIzaSyCTcNqL5eZzE-YKMl62QgvHDaNw-NxdIzA";
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export interface ExtractedResumeData {
  name: string;
  role: string;
  experience: string;
  skills: string[];
  education: string;
  companies: string[];
  achievements: string[];
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  summary: string;
}

/**
 * Extract comprehensive resume information using AI
 * @param resumeText - Full text extracted from resume file
 * @returns Structured resume data with professional summary
 */
export const extractResumeWithAI = async (resumeText: string): Promise<ExtractedResumeData> => {
  try {
    console.log('🤖 Starting AI-powered resume extraction...');
    
    const prompt = `
You are an expert ATS (Applicant Tracking System) and resume parser. 
Analyze the following resume text and extract ALL information accurately.

RESUME TEXT:
${resumeText}

INSTRUCTIONS:
1. Extract EXACT information from the resume - do not make up or assume anything
2. If information is not found, return empty string or empty array
3. For skills, extract ALL technical and professional skills mentioned
4. For companies, extract ALL company names from work experience
5. For achievements, extract quantifiable accomplishments with metrics if available
6. Generate a professional summary that highlights:
   - Current/most recent role
   - Years of experience (calculate from dates if needed)
   - Top 5-6 technical skills
   - 1-2 key companies worked at
   - 1-2 major achievements with metrics
   - Education if notable (degree level)

IMPORTANT: The professional summary should be 2-3 sentences, factual, and directly based on the resume content.

Return your response in this EXACT JSON format (no markdown, just raw JSON):
{
  "name": "Full Name",
  "role": "Most recent/current job title",
  "experience": "X years" or "X+ years",
  "skills": ["skill1", "skill2", "skill3", ...],
  "education": "Highest degree and field",
  "companies": ["Company1", "Company2", ...],
  "achievements": ["Achievement 1 with metrics", "Achievement 2", ...],
  "location": "City, State/Country",
  "email": "email@example.com",
  "phone": "phone number",
  "linkedin": "linkedin.com/in/profile",  "summary": "Professional summary paragraph (2-3 sentences, 100-200 words)"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        temperature: 0.2,
      },
    });
    
    console.log('📥 AI Response received');
    
    // Clean the response (remove markdown code blocks if present)
    let cleanedResponse = (response.text || '').trim();
    if (cleanedResponse.startsWith('```json')) {
      cleanedResponse = cleanedResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    } else if (cleanedResponse.startsWith('```')) {
      cleanedResponse = cleanedResponse.replace(/```\n?/g, '');
    }
    
    const extracted: ExtractedResumeData = JSON.parse(cleanedResponse);
    
    console.log('✅ AI Extraction successful:', {
      name: extracted.name || 'Not found',
      role: extracted.role || 'Not found',
      experience: extracted.experience || 'Not found',
      skillsCount: extracted.skills?.length || 0,
      companiesCount: extracted.companies?.length || 0,
      achievementsCount: extracted.achievements?.length || 0,
      summaryLength: extracted.summary?.length || 0
    });
    
    return extracted;
    } catch (error) {
    console.error('❌ AI extraction failed:', error);
    console.error('❌ Error details:', {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    
    // Check if it's an API key error
    const errorMsg = error instanceof Error ? error.message : String(error);
    if (errorMsg.includes('API key') || errorMsg.includes('invalid') || errorMsg.includes('expired')) {
      console.error('🔑 API KEY ISSUE DETECTED - Please update GEMINI_API_KEY in resumeExtractor.ts');
    }
    
    // Return empty data structure (not error message)
    // The calling function will handle fallback to pattern matching
    return {
      name: '',
      role: '',
      experience: '',
      skills: [],
      education: '',
      companies: [],
      achievements: [],
      location: '',
      email: '',
      phone: '',
      linkedin: '',
      summary: '' // Return empty string, not error message
    };
  }
};

/**
 * Generate only professional summary from resume text using AI
 * (Faster alternative when only summary is needed)
 */
export const generateProfessionalSummaryWithAI = async (resumeText: string): Promise<string> => {
  try {
    console.log('🤖 Generating professional summary with AI...');
    
    const prompt = `
You are an expert resume writer. Analyze this resume and create a compelling professional summary.

RESUME TEXT:
${resumeText}

REQUIREMENTS:
- Write a 2-3 sentence professional summary (100-200 words)
- Highlight: Current role, years of experience, top skills, notable companies, key achievements
- Use active voice and professional tone
- Include specific numbers/metrics if available
- Make it ATS-friendly
- Base it 100% on the actual resume content provided

Return ONLY the professional summary text, nothing else.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        temperature: 0.2,
      },
    });
    
    const summary = (response.text || '').trim();
    
    console.log('✅ AI Summary generated:', summary.substring(0, 100) + '...');
    
    return summary;
    
  } catch (error) {
    console.error('❌ AI summary generation failed:', error);
    return '';
  }
};
