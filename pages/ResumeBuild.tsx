import React from 'react';

const ResumeBuild: React.FC = () => (
  <div className="max-w-2xl mx-auto py-16 px-4">
    <h1 className="text-3xl font-bold text-blue-700 mb-4">Resume Builder</h1>
    <p className="text-lg text-slate-700 mb-6">Create a professional resume in minutes. Use our AI-powered suggestions and templates to stand out to recruiters.</p>
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold text-slate-800 mb-2">Quick Start</h2>
      <ul className="list-disc pl-6 text-slate-600">
        <li>Upload your current resume for instant feedback</li>
        <li>Choose a template and fill in your details</li>
        <li>Get AI suggestions for skills and achievements</li>
      </ul>
    </div>
    <button className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition">Start Building</button>
  </div>
);

export default ResumeBuild;
