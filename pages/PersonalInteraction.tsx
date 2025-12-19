import React from 'react';

const PersonalInteraction: React.FC = () => (
  <div className="max-w-2xl mx-auto py-16 px-4">
    <h1 className="text-3xl font-bold text-blue-700 mb-4">Personal Interaction</h1>
    <p className="text-lg text-slate-700 mb-6">Prepare for interviews and personal interactions with our AI-powered practice tools and expert tips.</p>
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold text-slate-800 mb-2">Practice & Improve</h2>
      <ul className="list-disc pl-6 text-slate-600">
        <li>Mock interview questions and feedback</li>
        <li>Communication skill tips</li>
        <li>Personalized improvement plans</li>
      </ul>
    </div>
    <button className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition">Start Practicing</button>
  </div>
);

export default PersonalInteraction;
