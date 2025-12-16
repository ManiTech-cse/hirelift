import { GoogleGenAI } from "@google/genai";
import { UserProfile, MatchingResponse, CompanyDetails } from "../types";
import { AVAILABLE_JOBS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const matchJobsWithProfile = async (
  profile: UserProfile
): Promise<MatchingResponse> => {
  try {
    // Construct a search-oriented prompt with STRICT scoring rules
    // We also inject our hardcoded MNC jobs into the context so Gemini considers them
    const mncJobsContext = JSON.stringify(AVAILABLE_JOBS.map(j => ({
      title: j.job_title,
      company: j.company,
      skills: j.required_skills,
      desc: j.description,
      is_verified: j.is_verified
    })));

    const prompt = `
      I need you to act as a ruthless Job Matcher and Recruiter.
      
      USER PROFILE:
      - Roles: ${profile.preferredRoles.join(", ")}
      - Skills: ${JSON.stringify(profile.skills)}
      - Experience Level: ${profile.experience}
      - Target Cities: ${profile.jobLocation.join(", ")}
      - WORK MODES: ${profile.workModes.join(", ")} 
      - PRIMARY PREFERENCE: ${profile.primaryWorkMode}
      
      AVAILABLE INTERNAL DATABASE JOBS (High Priority):
      ${mncJobsContext}

      STEP 1: USE GOOGLE SEARCH to find additional LIVE job postings that match this user profile.
      Combine the INTERNAL DATABASE JOBS with the Google Search results.
      
      CRITICAL SEARCH INSTRUCTION:
      - You MUST specifically search for open positions at the companies listed in the Internal Database on the following platforms:
        1. LinkedIn
        2. Naukri.com
        3. Superset (joinSuperset)
        4. Official Company Career Pages
      - If you find a match on Naukri, LinkedIn, or Superset, set the 'job_source' field to "Naukri", "LinkedIn", or "Superset" respectively.

      STEP 2: CALCULATE MATCH SCORE:
      For every job found, perform this calculation:
      1. List ALL required skills mentioned in the job title and description.
      2. Compare with User Skills list above.
      3. Formula: Score = (Number of Matching Skills / Total Required Skills) * 100.
      
      STEP 3: Filter and Return JSON.
      - INTERNAL DATABASE JOBS: ALWAYS INCLUDE at least 5-10 jobs from the provided list that are somewhat relevant to the user's role (e.g. if user is Frontend, show Frontend/Fullstack/Software Engineer roles). 
      - **CRITICAL**: For Internal Database jobs, ALLOW scores as low as 20% to ensure they appear in the UI. 
      - **CRITICAL**: For Internal Database jobs, ALWAYS set "auto_apply_eligible": true.
      - GOOGLE SEARCH JOBS: Only include if Match Score > 60%.
      
      Structure:
      {
        "matched_jobs": [
          {
            "job_title": "String",
            "company": "String",
            "location": "String",
            "match_percentage": Number,
            "matched_skills": ["String (Skills user HAS)"],
            "missing_skills": ["String (Skills user NEEDS but lacks)"],
            "auto_apply_eligible": Boolean,
            "apply_url": "String",
            "job_source": "String",
            "reasoning": "String (Explain the score. E.g. 'Score is 40% because user has React but is missing Java.')"
          }
        ]
      }

      IMPORTANT: 
      - Return ONLY the JSON string. No markdown.
      `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        tools: [{ googleSearch: {} }],
        temperature: 0.2, 
      },
    });

    let jsonString = response.text || "";
    jsonString = jsonString.replace(/```json/g, "").replace(/```/g, "").trim();

    const result = JSON.parse(jsonString) as MatchingResponse;
    return result;
  } catch (error) {
    console.error("Error matching jobs:", error);
    return { matched_jobs: [] };
  }
};

export const generateCoverLetter = async (profile: UserProfile): Promise<string> => {
  try {
    const prompt = `
      Write a professional cover letter.
      Candidate: ${profile.name}
      Role: ${profile.preferredRoles.join(", ")}
      Skills: ${profile.skills.join(", ")}
      
      Start with "Dear Hiring Manager,".
      Keep it professional and under 200 words.
      Mention specific skills from the list above.
      Use [Company Name] as a placeholder.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    return response.text || "";
  } catch (error) {
    console.error("Error generating cover letter:", error);
    return "";
  }
};

export const fetchCompanyDetails = async (companyName: string): Promise<CompanyDetails | null> => {
  try {
    const prompt = `
      I need information about the company "${companyName}".
      
      Please USE GOOGLE SEARCH to find:
      1. Industry (e.g. Fintech, E-commerce, Healthcare)
      2. Size / Employee Count (e.g. 50-200 employees, 10,000+ employees)
      3. Description: A brief 1-2 sentence description of what the company does.

      Return the result strictly as a JSON object:
      {
        "industry": "String",
        "size": "String",
        "description": "String"
      }
      
      If the company is generic or not found, return reasonable placeholders based on the name or industry.
      Return ONLY JSON.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        tools: [{ googleSearch: {} }],
        temperature: 0.1,
      },
    });

    let jsonString = response.text || "";
    jsonString = jsonString.replace(/```json/g, "").replace(/```/g, "").trim();
    
    return JSON.parse(jsonString) as CompanyDetails;
  } catch (error) {
    console.error("Error fetching company details:", error);
    return null;
  }
};