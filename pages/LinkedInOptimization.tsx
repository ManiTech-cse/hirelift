import React from 'react';

const LinkedInOptimization: React.FC = () => (
  <div className="max-w-2xl mx-auto py-16 px-4">
    <h1 className="text-3xl font-bold text-blue-700 mb-4">LinkedIn Optimization</h1>
    <p className="text-lg text-slate-700 mb-6">Optimize your LinkedIn profile for maximum visibility and recruiter interest. Get AI-driven tips and instant feedback.</p>
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold text-slate-800 mb-2">What We Offer</h2>
      <ul className="list-disc pl-6 text-slate-600">
        <li>Profile headline and summary suggestions</li>
        <li>Skill and endorsement recommendations</li>
        <li>Networking and outreach tips</li>
      </ul>
    </div>
    <button className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition">Optimize Now</button>
  </div>
);

export default LinkedInOptimization;
