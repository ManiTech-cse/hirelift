# HireLift Server Setup

This is the Node.js/Express backend server for the HireLift application.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Then edit `.env` and add your actual API keys:

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
GEMINI_API_KEY=your_actual_gemini_api_key
```

### 3. Run the Server

**Development mode (with auto-reload):**
```bash
npm run server:dev
```

**Production mode:**
```bash
npm start
```

**Run both frontend and backend together:**
```bash
npm run dev:all
```

## 📁 Server Structure

```
server/
├── index.js                 # Main server file
├── routes/
│   └── api.js              # API route definitions
└── controllers/
    ├── jobController.js     # Job matching & resume analysis
    ├── linkedInController.js # LinkedIn optimization
    └── applicationController.js # Application submissions
```

## 🛣️ API Endpoints

### Health Check
- **GET** `/api/health`
  - Returns server status

### Job Matching
- **POST** `/api/match-jobs`
  - Body: `{ resumeText, preferences }`
  - Returns: Array of matched jobs

### Resume Analysis
- **POST** `/api/analyze-resume`
  - Body: `{ resumeText }`
  - Returns: Resume analysis with score and suggestions

### LinkedIn Optimization
- **POST** `/api/optimize-linkedin`
  - Body: `{ profileData, targetRole }`
  - Returns: Optimization suggestions

### Application Submission
- **POST** `/api/submit-application`
  - Body: `{ jobId, resumeData, coverLetter, applicantInfo }`
  - Returns: Application confirmation

## 🔧 Configuration

### Port Configuration
The server runs on port 5000 by default. You can change this in the `.env` file:

```env
PORT=5000
```

### CORS Configuration
CORS is configured to accept requests from the frontend (default: http://localhost:3000). Update `CLIENT_URL` in `.env` if your frontend runs on a different port.

### API Keys
- **GEMINI_API_KEY**: Required for AI-powered features (job matching, resume analysis, LinkedIn optimization)
  - Get your key from: https://makersuite.google.com/app/apikey

## 🧪 Testing the API

You can test the API endpoints using curl, Postman, or any HTTP client:

```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Test job matching
curl -X POST http://localhost:5000/api/match-jobs \
  -H "Content-Type: application/json" \
  -d '{"resumeText":"Software Engineer with 5 years experience","preferences":{"location":"Remote"}}'
```

## 📦 Production Deployment

### Build the frontend:
```bash
npm run build
```

### Set environment to production:
```env
NODE_ENV=production
```

### Start the server:
```bash
npm start
```

The server will automatically serve the built frontend files from the `dist` folder.

## 🔐 Security Notes

- Never commit your `.env` file to version control
- Keep your API keys secure
- Use environment variables for all sensitive data
- Enable rate limiting in production
- Add authentication middleware for protected routes

## 🐛 Troubleshooting

### Server won't start
- Check if port 5000 is already in use
- Ensure all dependencies are installed (`npm install`)
- Verify `.env` file exists and contains required variables

### API returns errors
- Check that GEMINI_API_KEY is valid
- Ensure the frontend is sending correct request format
- Check server logs for detailed error messages

### CORS errors
- Verify CLIENT_URL matches your frontend URL
- Check that the frontend is running on the specified port

## 📝 Development Notes

### Adding New Endpoints
1. Create a controller function in the appropriate controller file
2. Add the route in `server/routes/api.js`
3. Test the endpoint

### Database Integration (Future)
The server is ready for database integration. Uncomment the DATABASE_URL in `.env.example` and add your database connection logic.

## 🤝 Contributing

When contributing to the server:
1. Follow the existing code structure
2. Add error handling for all routes
3. Update this README with new endpoints
4. Test thoroughly before committing

## 📄 License

This project is part of the HireLift application.
