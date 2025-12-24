#!/usr/bin/env node

// Quick server starter script
// Run with: node start-server.js

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Starting HireLift Server...\n');

const serverPath = join(__dirname, 'server', 'index.js');

const serverProcess = spawn('node', [serverPath], {
  stdio: 'inherit',
  shell: true
});

serverProcess.on('error', (error) => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
});

serverProcess.on('exit', (code) => {
  if (code !== 0) {
    console.error(`❌ Server exited with code ${code}`);
    process.exit(code);
  }
});

// Handle Ctrl+C
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down server...');
  serverProcess.kill('SIGINT');
  process.exit(0);
});
