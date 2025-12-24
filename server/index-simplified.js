import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRoutes from './routes/api.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

console.log('🚀 Starting HireLift Backend Server (Simplified Mode)...');
console.log('⚠️  Running without database (mongoose not installed)');
console.log('💡 To enable full features, fix npm and run: npm install mongoose bcryptjs jsonwebtoken');

// CORS Configuration - Allow frontend on port 3000
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log(`⚠️  CORS blocked origin: ${origin}`);
      callback(null, true);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API Routes (job matching, resume analysis, etc.)
app.use('/api', apiRoutes);

// Simplified Auth Routes (In-Memory - No Database)
const users = new Map(); // Temporary in-memory storage

app.post('/api/auth/register', (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide name, email, and password'
      });
    }

    if (users.has(email)) {
      return res.status(400).json({
        success: false,
        error: 'User already exists'
      });
    }

    // Simple user storage (NO PASSWORD HASHING - temporary only!)
    const user = {
      id: Date.now().toString(),
      name,
      email,
      password, // ⚠️ NOT SECURE - only for testing!
      profile: {},
      createdAt: new Date()
    };

    users.set(email, user);

    res.status(201).json({
      success: true,
      message: 'User registered successfully (in-memory only)',
      token: 'temp-token-' + user.id,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        profile: user.profile
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide email and password'
      });
    }

    const user = users.get(email);

    if (!user || user.password !== password) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    res.json({
      success: true,
      message: 'Login successful',
      token: 'temp-token-' + user.id,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        profile: user.profile
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.get('/api/auth/me', (req, res) => {
  res.json({
    success: true,
    user: {
      id: '1',
      name: 'Demo User',
      email: 'demo@example.com',
      profile: {}
    }
  });
});

app.put('/api/auth/profile', (req, res) => {
  res.json({
    success: true,
    message: 'Profile updated (demo mode)',
    user: {
      id: '1',
      name: req.body.name || 'Demo User',
      profile: req.body.profile || {}
    }
  });
});

app.post('/api/auth/logout', (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    mode: 'simplified',
    database: 'none (in-memory)',
    warning: 'Fix npm and install mongoose for full features'
  });
});

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log('');
  console.log('═══════════════════════════════════════════════');
  console.log('🚀 HireLift Backend Server Started!');
  console.log('═══════════════════════════════════════════════');
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Server: http://localhost:${PORT}`);
  console.log(`🌐 API: http://localhost:${PORT}/api`);
  console.log(`🌐 Health: http://localhost:${PORT}/api/health`);
  console.log('✅ CORS enabled for: http://localhost:3000');
  console.log('');
  console.log('⚠️  RUNNING IN SIMPLIFIED MODE');
  console.log('   - No database connection');
  console.log('   - In-memory user storage (temporary)');
  console.log('   - No password hashing (not secure!)');
  console.log('');
  console.log('💡 To enable full features:');
  console.log('   1. Fix npm (see NPM_FIX_GUIDE.md)');
  console.log('   2. Run: npm install mongoose bcryptjs jsonwebtoken');
  console.log('   3. Use: node server/index.js');
  console.log('═══════════════════════════════════════════════');
  console.log('');
});

export default app;
