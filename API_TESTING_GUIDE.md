# API Testing Examples

## Using PowerShell

### 1. Health Check
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/health" -Method Get
```

### 2. Match Jobs
```powershell
$body = @{
    resumeText = "Experienced Software Engineer with 5+ years in React, Node.js, and TypeScript. Built scalable web applications."
    preferences = @{
        location = "Remote"
        jobType = "Full-time"
        salary = "120k+"
    }
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/match-jobs" -Method Post -Body $body -ContentType "application/json"
```

### 3. Analyze Resume
```powershell
$body = @{
    resumeText = "John Doe - Software Engineer
    
    Experience:
    - Senior Developer at Tech Corp (2020-Present)
    - Full Stack Developer at StartUp Inc (2018-2020)
    
    Skills: React, Node.js, TypeScript, Python, AWS
    
    Education: BS in Computer Science"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/analyze-resume" -Method Post -Body $body -ContentType "application/json"
```

### 4. Optimize LinkedIn Profile
```powershell
$body = @{
    profileData = @{
        headline = "Software Engineer"
        summary = "I write code"
        experience = "5 years"
    }
    targetRole = "Senior Software Engineer"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/optimize-linkedin" -Method Post -Body $body -ContentType "application/json"
```

### 5. Submit Application
```powershell
$body = @{
    jobId = "JOB-12345"
    resumeData = @{
        name = "John Doe"
        email = "john@example.com"
        phone = "123-456-7890"
    }
    coverLetter = "I am very interested in this position..."
    applicantInfo = @{
        name = "John Doe"
        email = "john@example.com"
    }
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/submit-application" -Method Post -Body $body -ContentType "application/json"
```

---

## Using cURL (Git Bash or WSL)

### 1. Health Check
```bash
curl http://localhost:5000/api/health
```

### 2. Match Jobs
```bash
curl -X POST http://localhost:5000/api/match-jobs \
  -H "Content-Type: application/json" \
  -d '{
    "resumeText": "Experienced Software Engineer with 5+ years in React, Node.js",
    "preferences": {
      "location": "Remote",
      "jobType": "Full-time"
    }
  }'
```

### 3. Analyze Resume
```bash
curl -X POST http://localhost:5000/api/analyze-resume \
  -H "Content-Type: application/json" \
  -d '{
    "resumeText": "John Doe - Software Engineer\nExperience: 5 years\nSkills: React, Node.js"
  }'
```

---

## Using Thunder Client (VS Code Extension)

1. Install Thunder Client extension
2. Create a new request
3. Set method to POST
4. Set URL to `http://localhost:5000/api/match-jobs`
5. Add JSON body:
```json
{
  "resumeText": "Your resume text here",
  "preferences": {
    "location": "Remote"
  }
}
```

---

## Using Postman

### Collection Import
Save this as `hirelift-api.postman_collection.json`:

```json
{
  "info": {
    "name": "HireLift API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:5000/api/health",
          "protocol": "http",
          "host": ["localhost"],
          "port": "5000",
          "path": ["api", "health"]
        }
      }
    },
    {
      "name": "Match Jobs",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"resumeText\": \"Experienced Software Engineer\",\n  \"preferences\": {\n    \"location\": \"Remote\"\n  }\n}"
        },
        "url": {
          "raw": "http://localhost:5000/api/match-jobs",
          "protocol": "http",
          "host": ["localhost"],
          "port": "5000",
          "path": ["api", "match-jobs"]
        }
      }
    }
  ]
}
```

---

## Testing from Frontend

### In your React component:
```typescript
import { matchJobs, analyzeResume } from '../services/api';

// Inside your component
const handleMatchJobs = async () => {
  try {
    const result = await matchJobs(resumeText, { location: 'Remote' });
    console.log('Matched jobs:', result);
  } catch (error) {
    console.error('Error:', error);
  }
};

const handleAnalyzeResume = async () => {
  try {
    const analysis = await analyzeResume(resumeText);
    console.log('Resume analysis:', analysis);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

---

## Expected Responses

### Health Check Response
```json
{
  "status": "ok",
  "timestamp": "2025-12-21T10:30:00.000Z"
}
```

### Match Jobs Response
```json
{
  "jobs": [
    {
      "title": "Senior Software Engineer",
      "company": "Tech Corp",
      "location": "Remote",
      "type": "Full-time",
      "salary": "$120k - $180k",
      "description": "...",
      "matchScore": 92,
      "skills": ["React", "Node.js"],
      "requirements": ["5+ years experience"]
    }
  ],
  "total": 5
}
```

### Resume Analysis Response
```json
{
  "score": 85,
  "strengths": ["Clear formatting", "Good experience"],
  "improvements": ["Add more metrics", "Include keywords"],
  "keywords": ["JavaScript", "React"],
  "summary": "Strong resume with room for improvement"
}
```

---

## Troubleshooting

### Connection Refused
- Make sure the server is running: `npm run server:dev`
- Check the port is correct (5000 by default)

### 404 Not Found
- Verify the endpoint path is correct
- Check server logs for routing issues

### 500 Internal Server Error
- Check if GEMINI_API_KEY is set in .env
- Look at server console for detailed error messages

### CORS Errors
- Verify CLIENT_URL in .env matches your frontend URL
- Check that CORS is properly configured in server/index.js
