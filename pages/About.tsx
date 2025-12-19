import React from 'react';

const About: React.FC = () => (
  <div className="max-w-2xl mx-auto py-16 px-4">
    <h1 className="text-3xl font-bold text-blue-700 mb-4">About HireLift</h1>
    <p className="text-lg text-slate-700 mb-6">HireLift is your AI-powered job search and application assistant. We help you find, match, and apply to top jobs with ease, providing resume building, LinkedIn optimization, and personal interview preparation tools.</p>
    <ul className="list-disc pl-6 text-slate-600">
      <li>Smart job matching and auto-apply</li>
      <li>Company insights and career links</li>
      <li>Resume builder and tips</li>
      <li>LinkedIn profile optimization</li>
      <li>Personal interview practice</li>
    </ul>
  </div>
);

export default About;
