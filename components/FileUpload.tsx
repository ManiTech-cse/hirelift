import React, { useRef, useState } from 'react';
import { Upload, FileText, X, CheckCircle } from 'lucide-react';
import { extractResumeWithAI, ExtractedResumeData } from '../services/resumeExtractor';

interface FileUploadProps {
  label: string;
  onFileSelect: (file: File | null) => void;
  onTextExtract?: (text: string) => void;
  acceptedTypes?: string;
  maxSizeMB?: number;
}

export const FileUpload: React.FC<FileUploadProps> = ({ 
  label, 
  onFileSelect, 
  onTextExtract,
  acceptedTypes = '.pdf,.doc,.docx,.txt',
  maxSizeMB = 10
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractionSuccess, setExtractionSuccess] = useState(false);
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setError(null);
    
    // Validate file size
    const fileSizeMB = selectedFile.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      setError(`File size exceeds ${maxSizeMB}MB limit`);
      return;
    }

    // Validate file type
    const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();
    if (!acceptedTypes.includes(`.${fileExtension}`)) {
      setError(`File type not supported. Accepted: ${acceptedTypes}`);
      return;
    }

    setFile(selectedFile);
    onFileSelect(selectedFile);    // Extract text from uploaded file
    if (onTextExtract) {
      setIsProcessing(true);
      try {
        let extractedText = '';

        if (fileExtension === 'txt' || selectedFile.type === 'text/plain') {
          // Plain text file
          extractedText = await selectedFile.text();        } else if (fileExtension === 'pdf' || selectedFile.type === 'application/pdf') {
          // PDF file - extract text using FileReader
          extractedText = await extractTextFromPDF(selectedFile);
          console.log('📄 PDF text extracted, length:', extractedText.length);
          console.log('📝 First 500 chars:', extractedText.substring(0, 500));
        } else if (fileExtension === 'doc' || fileExtension === 'docx') {
          // DOC/DOCX file - for demo, show placeholder
          extractedText = await extractTextFromDOCX(selectedFile);
        }        if (extractedText && extractedText.trim().length > 20) {
          // Extract only key information instead of full text (AI-powered)
          const summarizedText = await extractKeyResumeInfo(extractedText);
          onTextExtract(summarizedText);
          setExtractionSuccess(true);
        } else {
          setError('Could not extract text from file. Please paste your resume manually.');
          setExtractionSuccess(false);
        }
      } catch (err) {
        console.error('File extraction error:', err);
        setError('Failed to read file. Please paste your resume text manually.');
        setExtractionSuccess(false);
      } finally {
        setIsProcessing(false);      }
    }
  };

  // Helper function to extract key information from resume text using AI
  const extractKeyResumeInfo = async (fullText: string): Promise<string> => {
    console.log('🔍 Starting AI-powered resume extraction...');
    console.log('📄 Full resume text length:', fullText.length);
    console.log('📝 Resume text preview (first 300 chars):', fullText.substring(0, 300));
    
    if (!fullText || fullText.trim().length < 50) {
      console.warn('⚠️ Resume text too short');
      return '';
    }

    try {
      // Use AI to extract comprehensive resume information
      const aiExtracted = await extractResumeWithAI(fullText);
      
      console.log('✅ AI Extraction Results:', {
        name: aiExtracted.name || 'Not found',
        role: aiExtracted.role || 'Not found',
        experience: aiExtracted.experience || 'Not found',
        skills: aiExtracted.skills.slice(0, 6).join(', ') || 'None',
        education: aiExtracted.education || 'Not found',
        companies: aiExtracted.companies.slice(0, 3).join(', ') || 'None',
        achievements: aiExtracted.achievements.length,
        location: aiExtracted.location || 'Not found',
        summaryLength: aiExtracted.summary?.length || 0
      });

      // If AI provided a professional summary, use it
      if (aiExtracted.summary && aiExtracted.summary.length > 50) {
        console.log('✅ Using AI-generated summary:', aiExtracted.summary);
        return aiExtracted.summary;
      }

      // Fallback: Build summary from AI-extracted data
      console.log('⚠️ AI summary empty, building from extracted data...');
      const summary = buildProfessionalSummaryFromAI(aiExtracted);
      console.log('✅ Built summary from AI data:', summary);
      return summary;    } catch (error) {
      console.error('❌ AI extraction failed, falling back to pattern matching:', error);
      
      // Fallback to original pattern-based extraction
      try {
        const fallbackResult = extractKeyResumeInfoFallback(fullText);
        if (fallbackResult && fallbackResult.length > 50) {
          console.log('✅ Fallback extraction succeeded:', fallbackResult.substring(0, 100));
          return fallbackResult;
        }
      } catch (fallbackError) {
        console.error('❌ Fallback extraction also failed:', fallbackError);
      }
      
      // If both AI and fallback fail, return empty string so user can paste manually
      console.warn('⚠️ Both AI and fallback extraction failed - returning empty');
      return '';
    }
  };

  // Build professional summary from AI-extracted data
  const buildProfessionalSummaryFromAI = (data: ExtractedResumeData): string => {
    const parts: string[] = [];

    // Role and experience
    if (data.role && data.experience) {
      parts.push(`${data.role} with ${data.experience} of experience`);
    } else if (data.role) {
      parts.push(`${data.role}`);
    } else if (data.skills.length > 0) {
      parts.push(`${data.skills[0]} professional`);
    }

    // Skills
    if (data.skills.length > 0) {
      const topSkills = data.skills.slice(0, 6);
      if (topSkills.length >= 4) {
        const primary = topSkills.slice(0, 3).join(', ');
        const secondary = topSkills.slice(3).join(', ');
        parts.push(`Specializing in ${primary}, with expertise in ${secondary}`);
      } else if (topSkills.length > 0) {
        parts.push(`Strong skills in ${topSkills.join(', ')}`);
      }
    }

    // Companies
    if (data.companies.length > 0) {
      parts.push(`Previously worked at ${data.companies.slice(0, 3).join(', ')}`);
    }

    // Top achievement
    if (data.achievements.length > 0) {
      const achievement = data.achievements[0];
      const shortAch = achievement.length > 120 
        ? achievement.substring(0, 120) + '...' 
        : achievement;
      parts.push(shortAch);
    }

    // Education
    if (data.education) {
      parts.push(`Holds ${data.education}`);
    }

    // Location
    if (data.location) {
      parts.push(`Based in ${data.location}`);
    }

    let summary = parts.join('. ').replace(/\.\s*\./g, '.').trim();
    if (summary && !summary.endsWith('.')) {
      summary += '.';
    }

    return summary || 'Professional with diverse experience across multiple domains.';
  };

  // Fallback pattern-based extraction (original implementation)
  const extractKeyResumeInfoFallback = (fullText: string): string => {
    console.log('🔄 Using fallback pattern-based extraction...');
    
    if (!fullText || fullText.trim().length < 50) {
      console.warn('⚠️ Resume text too short');
      return '';
    }

    // Clean and normalize text but preserve line breaks for section detection
    const normalizedText = fullText
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .replace(/[^\x20-\x7E\n]/g, ' ')
      .replace(/\s+/g, ' ')
      .replace(/\n\s+/g, '\n')
      .trim();

    console.log('✨ Text preview:', normalizedText.substring(0, 300));

    // Try to find existing professional summary/objective sections first
    const summarySection = extractExistingSummary(normalizedText);
    if (summarySection) {
      console.log('✅ Found existing summary:', summarySection);
      return summarySection;
    }

    console.log('📝 No existing summary found, generating from content...');

    // Extract all components from resume
    const extracted = {
      name: extractName(normalizedText),
      role: extractRole(normalizedText),
      experience: extractExperience(normalizedText),
      skills: extractSkills(normalizedText),
      education: extractEducation(normalizedText),
      companies: extractCompanies(normalizedText),
      achievements: extractAchievements(normalizedText),
      location: extractLocation(normalizedText),
      workMode: extractWorkMode(normalizedText)
    };

    console.log('📊 Extracted data:', {
      name: extracted.name || 'Not found',
      role: extracted.role || 'Not found',
      experience: extracted.experience || 'Not found',
      skills: extracted.skills.slice(0, 6).join(', ') || 'None',
      education: extracted.education || 'Not found',
      companies: extracted.companies.slice(0, 3).join(', ') || 'None',
      achievements: extracted.achievements.length,
      location: extracted.location || 'Not found',
      workMode: extracted.workMode || 'Not found'
    });

    // Build professional summary from extracted data
    const summary = buildProfessionalSummary(extracted);
    
    console.log('✅ Generated summary:', summary);
    return summary;
  };

  // Extract existing professional summary or objective if present
  const extractExistingSummary = (text: string): string => {
    const summaryHeaders = [
      /(?:^|\n)\s*(PROFESSIONAL SUMMARY|SUMMARY|PROFILE|OBJECTIVE|CAREER SUMMARY|ABOUT ME|INTRODUCTION)\s*(?:\n|:)/i
    ];

    for (const header of summaryHeaders) {
      const match = text.match(header);
      if (match) {
        const startIndex = match.index! + match[0].length;
        // Get text after header until next section (usually all caps) or 500 chars
        const afterHeader = text.substring(startIndex);
        const nextSection = afterHeader.match(/\n\s*[A-Z][A-Z\s]{5,}\s*\n/);
        const endIndex = nextSection ? nextSection.index! : Math.min(500, afterHeader.length);
        
        const summary = afterHeader.substring(0, endIndex)
          .replace(/\n/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();

        if (summary.length > 50 && summary.length < 600) {
          return summary;
        }
      }
    }
    return '';
  };

  const extractName = (text: string): string => {
    // Name is usually in first few lines
    const firstLines = text.split('\n').slice(0, 5);
    for (const line of firstLines) {
      const trimmed = line.trim();
      // Name pattern: 2-3 words, mostly letters, at start
      if (trimmed.length > 5 && trimmed.length < 50 && /^[A-Z][a-z]+\s+[A-Z][a-z]+/.test(trimmed)) {
        const words = trimmed.split(/\s+/);
        if (words.length >= 2 && words.length <= 4) {
          return words.slice(0, 3).join(' ');
        }
      }
    }
    return '';
  };

  const extractRole = (text: string): string => {
    const rolePatterns = [
      // Specific tech roles with seniority
      /\b(Senior|Lead|Principal|Staff|Junior|Mid-Level)?\s*(Software|Frontend|Backend|Full[- ]?Stack|Web|Mobile|DevOps|Cloud|Data|Machine Learning|ML|AI)\s+(Engineer|Developer|Architect|Specialist)\b/i,
      // General roles
      /\b(Software|Frontend|Backend|Full[- ]?Stack|Web|Mobile|DevOps|Cloud|Data|Product|QA|Test)\s+(Engineer|Developer|Architect|Designer|Manager|Analyst)\b/i,
      // Role with seniority
      /\b(Senior|Lead|Principal|Junior)\s+(Engineer|Developer|Designer|Analyst|Manager|Architect)\b/i,
      // Standalone roles in context
      /\b(Developer|Engineer|Designer|Architect|Analyst|Consultant|Specialist|Manager|Coordinator|Administrator|Scientist)\b/i
    ];

    for (const pattern of rolePatterns) {
      const matches = text.matchAll(new RegExp(pattern, 'gi'));
      for (const match of matches) {
        const role = match[0].trim();
        // Verify it's not in a sentence like "looking for developer"
        const context = text.substring(Math.max(0, match.index! - 20), match.index! + role.length + 20);
        if (!/looking for|seeking|want|need/i.test(context)) {
          console.log('👔 Role found:', role);
          return role;
        }
      }
    }
    return '';
  };

  const extractExperience = (text: string): string => {
    const expPatterns = [
      /(\d+)\+?\s*(?:years?|yrs?)\s*(?:of)?\s*(?:professional)?\s*(?:experience|exp)/i,
      /(?:experience|exp)[:\s]+(\d+)\+?\s*(?:years?|yrs?)/i,
      /(?:over|more than)\s+(\d+)\s+years?/i,
      /(\d+)\+\s*years?/i
    ];

    for (const pattern of expPatterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        const years = parseInt(match[1]);
        if (years > 0 && years < 50) {
          console.log('📅 Experience:', `${years} years`);
          return `${years} years`;
        }
      }
    }
    return '';
  };

  const extractSkills = (text: string): string[] => {
    // Comprehensive skill list
    const techSkills = [
      // Frontend
      'React', 'Angular', 'Vue.js', 'Vue', 'Next.js', 'Nuxt.js', 'Svelte', 'jQuery',
      'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Sass', 'SCSS', 'Less', 
      'Tailwind CSS', 'Bootstrap', 'Material UI', 'Ant Design', 'Redux', 'MobX', 'Zustand',
      'Webpack', 'Vite', 'Rollup', 'Parcel', 'Babel',
      
      // Backend
      'Node.js', 'Express.js', 'NestJS', 'Python', 'Django', 'Flask', 'FastAPI',
      'Java', 'Spring Boot', 'Spring', 'PHP', 'Laravel', 'Ruby', 'Rails', 'Ruby on Rails',
      'Go', 'Golang', 'C#', '.NET', 'ASP.NET', 'C++', 'Rust',
      
      // Mobile
      'React Native', 'Flutter', 'Swift', 'Kotlin', 'iOS', 'Android', 'Xamarin',
      
      // Database
      'MongoDB', 'PostgreSQL', 'MySQL', 'SQL', 'Redis', 'Elasticsearch', 'DynamoDB',
      'Oracle', 'SQL Server', 'Firebase', 'Cassandra', 'Neo4j',
      
      // Cloud & DevOps
      'AWS', 'Azure', 'GCP', 'Google Cloud', 'Docker', 'Kubernetes', 'Jenkins',
      'CI/CD', 'GitHub Actions', 'GitLab CI', 'Terraform', 'Ansible', 'CloudFormation',
      
      // Tools & Practices
      'Git', 'GitHub', 'GitLab', 'Bitbucket', 'Jira', 'Confluence',
      'Agile', 'Scrum', 'Kanban', 'TDD', 'BDD', 'Jest', 'Mocha', 'Cypress', 'Selenium',
      'REST API', 'GraphQL', 'gRPC', 'Microservices', 'Serverless',
      
      // Data & AI
      'TensorFlow', 'PyTorch', 'Pandas', 'NumPy', 'Scikit-learn', 'Keras',
      'Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'Data Science'
    ];

    const foundSkills = new Set<string>();
    const textLower = text.toLowerCase();

    for (const skill of techSkills) {
      const skillLower = skill.toLowerCase();
      // Check for whole word match or with common separators
      const regex = new RegExp(`\\b${skillLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      if (regex.test(textLower)) {
        foundSkills.add(skill);
      }
    }

    const skillsArray = Array.from(foundSkills);
    console.log('💻 Skills found:', skillsArray.slice(0, 10).join(', '));
    return skillsArray;
  };

  const extractEducation = (text: string): string => {
    const degreePatterns = [
      /\b(Bachelor|B\.S\.|B\.Sc\.|B\.A\.|B\.Tech|B\.E\.|BS|BA)\s+(?:of\s+)?(?:Science\s+)?(?:in\s+)?([A-Za-z\s]+?)(?:\n|,|from|\d{4})/i,
      /\b(Master|M\.S\.|M\.Sc\.|M\.A\.|M\.Tech|M\.E\.|MBA|MS|MA)\s+(?:of\s+)?(?:Science\s+)?(?:in\s+)?([A-Za-z\s]+?)(?:\n|,|from|\d{4})/i,
      /\b(Ph\.?D\.?|Doctorate)\s+(?:in\s+)?([A-Za-z\s]+?)(?:\n|,|from|\d{4})/i
    ];

    for (const pattern of degreePatterns) {
      const match = text.match(pattern);
      if (match) {
        const degree = match[1];
        const field = match[2]?.trim();
        if (field && field.length > 3 && field.length < 50) {
          return `${degree} in ${field}`;
        }
        return degree;
      }
    }
    return '';
  };

  const extractCompanies = (text: string): string[] => {
    const companies: string[] = [];
    
    // Look for company patterns (before job titles or dates)
    const companyPatterns = [
      /(?:at|@)\s+([A-Z][A-Za-z0-9\s&.,-]{2,40})(?:\n|\s+\||,|\s+\d{4})/g,
      /([A-Z][A-Za-z0-9\s&.,-]{2,40})\s*(?:-|–)\s*(?:Software|Frontend|Backend|Developer|Engineer)/gi
    ];

    for (const pattern of companyPatterns) {
      const matches = text.matchAll(pattern);
      for (const match of matches) {
        const company = match[1].trim();
        if (company.length > 3 && company.length < 40 && !companies.includes(company)) {
          companies.push(company);
        }
      }
    }

    return companies.slice(0, 3);
  };

  const extractAchievements = (text: string): string[] => {
    const achievements: string[] = [];
    const achievementVerbs = [
      'built', 'developed', 'created', 'designed', 'implemented', 'led', 'managed',
      'improved', 'increased', 'reduced', 'optimized', 'architected', 'delivered',
      'launched', 'migrated', 'established', 'achieved', 'spearheaded'
    ];

    // Split into sentences
    const sentences = text.split(/[.!]\s+/);
    
    for (const sentence of sentences) {
      const sentenceLower = sentence.toLowerCase();
      for (const verb of achievementVerbs) {
        if (sentenceLower.includes(verb) && sentence.length > 30 && sentence.length < 200) {
          achievements.push(sentence.trim());
          break;
        }
      }
      if (achievements.length >= 3) break;
    }

    return achievements;
  };

  const extractLocation = (text: string): string => {
    const locationPatterns = [
      /(?:Location|Based in|Located in)[:\s]+([A-Za-z\s,]+?)(?:\n|$)/i,
      /\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?),\s+(CA|NY|TX|FL|WA|IL|MA|CO|GA|NC|VA|NJ|PA|OH|MI|IN|AZ|TN|MO|MD|WI|MN|AL|SC|LA|KY|OR|OK|CT|IA|MS|AR|KS|UT|NV|NM|WV|NE|ID|HI|NH|ME|RI|MT|DE|SD|ND|AK|VT|WY)\b/,
      /\b(San Francisco|New York|Los Angeles|Chicago|Seattle|Boston|Austin|Denver|Atlanta|Portland|San Diego|Dallas|Houston|Miami|Philadelphia|Phoenix|San Jose)\b/i
    ];

    for (const pattern of locationPatterns) {
      const match = text.match(pattern);
      if (match) {
        return match[1].trim();
      }
    }
    return '';
  };

  const extractWorkMode = (text: string): string => {
    const workModePatterns = [
      /(?:looking for|seeking|prefer|open to)\s+(remote|hybrid|onsite|on-site)\s+(?:work|opportunities|positions|roles)/i,
      /\b(remote|hybrid)\s+(?:work|position|role)\b/i
    ];

    for (const pattern of workModePatterns) {
      const match = text.match(pattern);
      if (match) {
        return match[1].toLowerCase();
      }
    }
    return '';
  };

  const buildProfessionalSummary = (data: any): string => {
    const parts: string[] = [];

    // Opening: Role and Experience
    if (data.role && data.experience) {
      parts.push(`${data.role} with ${data.experience} of professional experience`);
    } else if (data.role) {
      parts.push(data.role);
    } else if (data.experience) {
      parts.push(`Professional with ${data.experience} of experience`);
    } else if (data.skills.length > 0) {
      // If no role/exp, start with primary skill
      parts.push(`${data.skills[0]} professional`);
    }

    // Skills and specialization
    if (data.skills.length > 0) {
      const topSkills = data.skills.slice(0, 6);
      if (topSkills.length >= 4) {
        const primary = topSkills.slice(0, 3).join(', ');
        const secondary = topSkills.slice(3).join(', ');
        parts.push(`specializing in ${primary}, with expertise in ${secondary}`);
      } else if (topSkills.length > 0) {
        parts.push(`with strong skills in ${topSkills.join(', ')}`);
      }
    }

    // Add company experience if available
    if (data.companies.length > 0) {
      parts.push(`Previously worked at ${data.companies.join(', ')}`);
    }

    // Add key achievement
    if (data.achievements.length > 0) {
      const achievement = data.achievements[0];
      // Shorten if too long
      const shortAch = achievement.length > 100 
        ? achievement.substring(0, 100) + '...' 
        : achievement;
      parts.push(shortAch);
    }

    // Add education if significant
    if (data.education) {
      parts.push(`Holds ${data.education}`);
    }

    // Add work preference
    if (data.workMode) {
      parts.push(`Open to ${data.workMode} opportunities`);
    } else if (data.location) {
      parts.push(`Based in ${data.location}`);
    }

    // Join all parts
    let summary = parts.join('. ');
    
    // Clean up punctuation
    summary = summary
      .replace(/\.\s*\./g, '.')
      .replace(/\s+/g, ' ')
      .trim();

    // Ensure ends with period
    if (summary && !summary.endsWith('.')) {
      summary += '.';
    }

    // If summary is too short or empty, return empty (don't use fallback)
    if (!summary || summary.length < 50) {
      console.warn('⚠️ Could not generate summary from resume content');
      return '';
    }

    return summary;
  };
  
  // Helper function to extract text from PDF
  const extractTextFromPDF = async (file: File): Promise<string> => {
    try {
      // Read file as array buffer
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      
      // Convert to string
      let pdfText = '';
      for (let i = 0; i < uint8Array.length; i++) {
        pdfText += String.fromCharCode(uint8Array[i]);
      }
      
      // Extract text between BT (Begin Text) and ET (End Text) operators
      const textContentRegex = /BT\s*([\s\S]*?)\s*ET/g;
      let matches;
      let extractedText = '';
      
      while ((matches = textContentRegex.exec(pdfText)) !== null) {
        const textBlock = matches[1];
        
        // Extract text from Tj, TJ operators (text showing operators)
        const tjRegex = /\((.*?)\)\s*Tj/g;
        const tjMatches = textBlock.matchAll(tjRegex);
        
        for (const match of tjMatches) {
          if (match[1]) {
            // Clean up the text
            const cleanText = match[1]
              .replace(/\\r/g, '\n')
              .replace(/\\n/g, '\n')
              .replace(/\\/g, '')
              .trim();
            
            if (cleanText.length > 0) {
              extractedText += cleanText + ' ';
            }
          }
        }
        
        // Also try TJ operator (array of strings)
        const tjArrayRegex = /\[(.*?)\]\s*TJ/g;
        const tjArrayMatches = textBlock.matchAll(tjArrayRegex);
        
        for (const match of tjArrayMatches) {
          if (match[1]) {
            // Extract strings from array
            const strings = match[1].match(/\((.*?)\)/g);
            if (strings) {
              strings.forEach(str => {
                const cleanStr = str.replace(/[()]/g, '').trim();
                if (cleanStr.length > 0) {
                  extractedText += cleanStr + ' ';
                }
              });
            }
          }
        }
      }
      
      // If no text found with BT/ET, try simpler extraction
      if (!extractedText || extractedText.trim().length < 50) {
        // Look for text between parentheses (common in PDFs)
        const simpleTextRegex = /\(([^)]+)\)/g;
        const simpleMatches = pdfText.matchAll(simpleTextRegex);
        let simpleText = '';
        
        for (const match of simpleMatches) {
          if (match[1] && match[1].length > 1) {
            const cleaned = match[1]
              .replace(/[^\x20-\x7E\n]/g, '')
              .trim();
            if (cleaned.length > 0) {
              simpleText += cleaned + ' ';
            }
          }
        }
        
        if (simpleText.trim().length > 50) {
          extractedText = simpleText;
        }
      }
      
      // Clean up final text
      const finalText = extractedText
        .replace(/\s+/g, ' ')
        .replace(/\s*\n\s*/g, '\n')
        .trim();
      
      if (finalText.length > 50) {
        return finalText;
      }
      
      throw new Error('Could not extract readable text from PDF. Please paste manually or try a different format.');
    } catch (error) {
      console.error('PDF extraction error:', error);
      throw error;
    }
  };
  // Helper function to extract text from DOCX
  const extractTextFromDOCX = async (file: File): Promise<string> => {
    try {
      // DOCX is a ZIP file containing XML files
      // For basic extraction, we'll read it as text and extract from XML
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      
      // Convert to string
      let docText = '';
      for (let i = 0; i < uint8Array.length; i++) {
        const char = String.fromCharCode(uint8Array[i]);
        // Only include printable ASCII and common characters
        if ((char >= ' ' && char <= '~') || char === '\n' || char === '\r' || char === '\t') {
          docText += char;
        }
      }
      
      // Look for text content in XML structure
      // DOCX stores text in <w:t>...</w:t> tags
      const textMatches = docText.match(/<w:t[^>]*>([^<]+)<\/w:t>/g);
      let extractedText = '';
      
      if (textMatches) {
        textMatches.forEach(match => {
          const textContent = match.replace(/<w:t[^>]*>/, '').replace(/<\/w:t>/, '');
          if (textContent.trim().length > 0) {
            extractedText += textContent + ' ';
          }
        });
      }
      
      // If no text found, try alternative extraction
      if (!extractedText || extractedText.trim().length < 50) {
        // Remove all XML tags and extract text
        const cleanText = docText
          .replace(/<[^>]*>/g, ' ')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&amp;/g, '&')
          .replace(/&quot;/g, '"')
          .replace(/&apos;/g, "'")
          .replace(/[^\x20-\x7E\n]/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
        
        if (cleanText.length > 100) {
          extractedText = cleanText;
        }
      }
      
      // Clean up final text
      const finalText = extractedText
        .replace(/\s+/g, ' ')
        .replace(/\s*\n\s*/g, '\n')
        .trim();
      
      if (finalText.length > 50) {
        return finalText;
      }
      
      throw new Error('Could not extract readable text from DOCX. Please paste manually or try a different format.');
    } catch (error) {
      console.error('DOCX extraction error:', error);
      throw error;
    }
  };
  const handleClear = () => {
    setFile(null);
    setError(null);
    setExtractionSuccess(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onFileSelect(null);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      
      <div
        onClick={() => fileInputRef.current?.click()}
        className="relative border-2 border-dashed border-slate-300 rounded-lg p-6 sm:p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all bg-slate-50"
      >
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          accept={acceptedTypes}
          className="hidden"
        />
        
        {!file ? (
          <div className="flex flex-col items-center gap-2">
            <Upload size={28} className="text-slate-400" />
            <div>
              <p className="text-sm font-medium text-slate-700">Click to upload resume</p>
              <p className="text-xs text-slate-500 mt-1">PDF, DOC, DOCX or TXT up to {maxSizeMB}MB</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText size={24} className="text-blue-500" />
              <div className="text-left">
                <p className="text-sm font-medium text-slate-900 truncate">{file.name}</p>
                <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(1)} KB</p>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
              className="p-1 hover:bg-slate-200 rounded transition-colors"
            >
              <X size={18} className="text-slate-500" />
            </button>
          </div>
        )}        {isProcessing && (
          <p className="text-xs text-blue-600 mt-2">Processing file and extracting text...</p>
        )}

        {extractionSuccess && !isProcessing && (
          <p className="text-xs text-green-600 mt-2 flex items-center justify-center gap-1">
            <CheckCircle size={14} />
            Text extracted successfully! Check "Resume Text" field below.
          </p>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-600 bg-red-50 p-2 rounded">{error}</p>
      )}
    </div>
  );
};

export default FileUpload;
