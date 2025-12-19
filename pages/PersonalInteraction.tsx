import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { MessageSquare, Sparkles, Target, Users, Award, CheckCircle, Star, Brain, Mic, Video, FileText, TrendingUp, Zap, PlayCircle, ArrowRight, Clock, BarChart } from 'lucide-react';

interface PersonalInteractionProps {
  userName?: string;
  onNavigate?: (page: string) => void;
  onLogout?: () => void;
}

const PersonalInteraction: React.FC<PersonalInteractionProps> = ({ userName = 'User', onNavigate = () => {}, onLogout = () => {} }) => {
  const [selectedScenario, setSelectedScenario] = useState<string>('behavioral');

  const interviewScenarios = [
    {
      id: 'behavioral',
      name: 'Behavioral Interview',
      difficulty: 'Medium',
      duration: '30 min',
      questions: 15,
      color: 'from-blue-500 to-indigo-600',
      icon: Users,
      description: 'Practice STAR method responses for common behavioral questions',
      sampleQuestions: [
        'Tell me about a time you faced a difficult challenge at work',
        'Describe a situation where you had to work with a difficult team member',
        'Give an example of when you showed leadership',
        'How do you handle tight deadlines and pressure?'
      ]
    },
    {
      id: 'technical',
      name: 'Technical Interview',
      difficulty: 'Hard',
      duration: '45 min',
      questions: 12,
      color: 'from-purple-500 to-pink-600',
      icon: Brain,
      description: 'Coding challenges and technical problem-solving scenarios',
      sampleQuestions: [
        'Explain the difference between REST and GraphQL',
        'How would you optimize a slow database query?',
        'Walk me through your approach to system design',
        'What are the trade-offs between different data structures?'
      ]
    },
    {
      id: 'executive',
      name: 'Executive Interview',
      difficulty: 'Expert',
      duration: '60 min',
      questions: 10,
      color: 'from-cyan-500 to-teal-600',
      icon: Target,
      description: 'Leadership scenarios and strategic thinking questions',
      sampleQuestions: [
        'How would you scale our engineering team from 10 to 100?',
        'Describe your approach to building company culture',
        'What metrics would you track for our product?',
        'How do you handle conflict between departments?'
      ]
    }
  ];

  const practiceFeatures = [
    {
      icon: Mic,
      title: 'Voice Practice',
      description: 'Practice responses out loud with AI feedback on pace and clarity',
      metric: '85% confidence boost'
    },
    {
      icon: Video,
      title: 'Video Mock Interviews',
      description: 'Record yourself and get feedback on body language and presentation',
      metric: '90% success rate'
    },
    {
      icon: Brain,
      title: 'AI-Powered Feedback',
      description: 'Get instant analysis of your answers with improvement suggestions',
      metric: 'Real-time insights'
    },
    {
      icon: FileText,
      title: 'Answer Templates',
      description: 'Access proven answer frameworks and customize for your experience',
      metric: '500+ templates'
    },
    {
      icon: BarChart,
      title: 'Performance Tracking',
      description: 'Monitor your progress and identify areas for improvement',
      metric: 'Detailed analytics'
    },
    {
      icon: Clock,
      title: 'Timed Practice',
      description: 'Simulate real interview conditions with time constraints',
      metric: 'Build confidence'
    }
  ];

  const communicationTips = [
    {
      icon: Sparkles,
      title: 'First Impressions',
      tips: ['Firm handshake', 'Eye contact', 'Confident posture', 'Warm smile']
    },
    {
      icon: MessageSquare,
      title: 'Clear Communication',
      tips: ['Speak clearly', 'Avoid filler words', 'Use examples', 'Be concise']
    },
    {
      icon: Brain,
      title: 'Active Listening',
      tips: ['Take notes', 'Ask clarifying questions', 'Show engagement', 'Nod appropriately']
    },
    {
      icon: Star,
      title: 'Closing Strong',
      tips: ['Ask insightful questions', 'Express enthusiasm', 'Summarize fit', 'Thank interviewer']
    }
  ];

  const selectedScenarioData = interviewScenarios.find(s => s.id === selectedScenario) || interviewScenarios[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-cyan-400/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-1/2 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <PageHeader userName={userName} currentPage="interaction" onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="relative z-10 max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-6">
            <MessageSquare className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Interview Preparation & Practice
          </h1>
          <p className="text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed">
            Master your interview skills with AI-powered practice sessions, real-time feedback, and expert communication strategies.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {[
            { value: '10K+', label: 'Practice Sessions', icon: PlayCircle },
            { value: '85%', label: 'Interview Success', icon: CheckCircle },
            { value: '500+', label: 'Question Bank', icon: FileText },
            { value: '4.9★', label: 'User Rating', icon: Star }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 text-center border border-white/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-purple-600" />
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-slate-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Practice Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">
            Complete Interview Practice Suite
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {practiceFeatures.map((feature, idx) => (
              <div key={idx} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div className={`inline-flex p-3 bg-gradient-to-br ${idx % 3 === 0 ? 'from-purple-500 to-pink-600' : idx % 3 === 1 ? 'from-indigo-500 to-purple-600' : 'from-pink-500 to-rose-600'} rounded-xl mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-slate-600 mb-3">{feature.description}</p>
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600">
                  <TrendingUp className="w-4 h-4" />
                  {feature.metric}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interview Scenarios */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-4">
            Practice Interview Scenarios
          </h2>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            Choose your interview type and practice with AI-generated questions tailored to your role.
          </p>

          {/* Scenario Tabs */}
          <div className="flex justify-center gap-4 mb-8 flex-wrap">
            {interviewScenarios.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => setSelectedScenario(scenario.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  selectedScenario === scenario.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-white/80 text-slate-700 hover:bg-white hover:shadow-md'
                }`}
              >
                {scenario.name}
              </button>
            ))}
          </div>

          {/* Selected Scenario Display */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border-2 border-purple-200">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`w-20 h-20 bg-gradient-to-br ${selectedScenarioData.color} rounded-full flex items-center justify-center`}>
                  <selectedScenarioData.icon className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">{selectedScenarioData.name}</h3>
                  <div className="flex items-center gap-4 text-sm">
                    <span className={`px-3 py-1 rounded-full font-semibold ${
                      selectedScenarioData.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      selectedScenarioData.difficulty === 'Hard' ? 'bg-orange-100 text-orange-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {selectedScenarioData.difficulty}
                    </span>
                    <span className="flex items-center gap-1 text-slate-600">
                      <Clock className="w-4 h-4" />
                      {selectedScenarioData.duration}
                    </span>
                    <span className="flex items-center gap-1 text-slate-600">
                      <FileText className="w-4 h-4" />
                      {selectedScenarioData.questions} questions
                    </span>
                  </div>
                </div>
              </div>
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 inline-flex items-center gap-2">
                <PlayCircle className="w-5 h-5" />
                Start Practice
              </button>
            </div>

            <div className="mb-6">
              <p className="text-slate-700 text-lg mb-4">{selectedScenarioData.description}</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-slate-800 mb-4">Sample Questions:</h4>
              <div className="space-y-3">
                {selectedScenarioData.sampleQuestions.map((question, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border-l-4 border-purple-600">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                      {idx + 1}
                    </div>
                    <p className="text-slate-700 pt-1">{question}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Communication Tips */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">
            Master Communication Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {communicationTips.map((category, idx) => (
              <div key={idx} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div className="inline-flex p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl mb-4">
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4">{category.title}</h3>
                <ul className="space-y-2">
                  {category.tips.map((tip, tipIdx) => (
                    <li key={tipIdx} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Pro Tips Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-2xl p-8 mb-16 text-white">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-8 h-8" />
            <h2 className="text-3xl font-bold">Interview Success Strategies</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Research the company thoroughly before the interview',
              'Practice your elevator pitch until it feels natural',
              'Prepare 3-5 insightful questions to ask the interviewer',
              'Use the STAR method for behavioral questions',
              'Bring extra copies of your resume and a portfolio',
              'Arrive 10-15 minutes early to compose yourself',
              'Send a personalized thank-you email within 24 hours',
              'Follow up if you don\'t hear back within the expected timeframe'
            ].map((tip, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <ArrowRight className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* STAR Method Guide */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-16 border border-white/20">
          <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">
            Master the STAR Method
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { letter: 'S', word: 'Situation', description: 'Set the context for your story', color: 'from-blue-500 to-cyan-600' },
              { letter: 'T', word: 'Task', description: 'Describe your responsibility', color: 'from-purple-500 to-indigo-600' },
              { letter: 'A', word: 'Action', description: 'Explain what you did', color: 'from-pink-500 to-rose-600' },
              { letter: 'R', word: 'Result', description: 'Share the outcome', color: 'from-green-500 to-emerald-600' }
            ].map((step, idx) => (
              <div key={idx} className="text-center">
                <div className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center`}>
                  <span className="text-3xl font-bold text-white">{step.letter}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{step.word}</h3>
                <p className="text-slate-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-12 border border-white/20">
          <Sparkles className="w-16 h-16 mx-auto mb-6 text-purple-600" />
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Ready to Ace Your Next Interview?
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Start practicing today with our AI-powered interview coach and boost your confidence.
          </p>
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 inline-flex items-center gap-2">
            Start Practicing Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default PersonalInteraction;
