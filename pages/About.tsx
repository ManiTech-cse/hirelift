import React from 'react';
import PageHeader from '../components/PageHeader';
import { Briefcase, Target, TrendingUp, Users, Award, Zap, CheckCircle, Sparkles } from 'lucide-react';

interface AboutProps {
  userName?: string;
  onNavigate?: (page: string) => void;
  onLogout?: () => void;
}

const About: React.FC<AboutProps> = ({ userName = 'User', onNavigate = () => {}, onLogout = () => {} }) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
    {/* Animated background blobs */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute top-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-40 left-1/2 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
    </div>

    <PageHeader userName={userName} currentPage="about" onNavigate={onNavigate} onLogout={onLogout} />
    
    <div className="relative z-10 max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
          About HireLift
        </h1>
        <p className="text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed">
          Your AI-powered job search and application assistant. We help you find, match, and apply to top jobs with ease.
        </p>
      </div>

      {/* Mission Section */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-12 border border-white/20">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">Our Mission</h2>
            <p className="text-lg text-slate-700 leading-relaxed">
              To revolutionize the job search experience by leveraging cutting-edge AI technology, 
              making it faster, smarter, and more effective for job seekers worldwide.
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl w-fit mb-4">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Smart Job Matching</h3>
          <p className="text-slate-600">
            AI-powered algorithms match you with the perfect jobs based on your skills, experience, and preferences.
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl w-fit mb-4">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Auto-Apply</h3>
          <p className="text-slate-600">
            Apply to multiple jobs with one click. Our automation saves you hours while maximizing your opportunities.
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl w-fit mb-4">
            <Award className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Resume Builder</h3>
          <p className="text-slate-600">
            Create ATS-optimized resumes with professional templates and AI-powered content suggestions.
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl w-fit mb-4">
            <Users className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">LinkedIn Optimization</h3>
          <p className="text-slate-600">
            Optimize your LinkedIn profile with data-driven insights and recruiter-attracting strategies.
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl w-fit mb-4">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Interview Prep</h3>
          <p className="text-slate-600">
            Practice with AI-powered mock interviews and get personalized feedback to ace your interviews.
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <div className="p-3 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl w-fit mb-4">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Company Insights</h3>
          <p className="text-slate-600">
            Get detailed company information, culture insights, and career progression opportunities.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl shadow-2xl p-12 mb-12">
        <h2 className="text-3xl font-bold text-white text-center mb-8">Why Choose HireLift?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-5xl font-bold text-white mb-2">98%</div>
            <div className="text-xl text-blue-100">ATS Pass Rate</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-white mb-2">10x</div>
            <div className="text-xl text-blue-100">Faster Applications</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-white mb-2">85%</div>
            <div className="text-xl text-blue-100">Interview Rate Increase</div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
        <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">How It Works</h2>
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
              1
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Create Your Profile</h3>
              <p className="text-slate-600">Upload your resume and set your job preferences, skills, and desired locations.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
              2
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">AI Matches Jobs</h3>
              <p className="text-slate-600">Our AI analyzes thousands of jobs and matches you with the best opportunities.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
              3
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Auto-Apply</h3>
              <p className="text-slate-600">Review matches and apply to multiple jobs with one click using our automation.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
              4
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Get Hired</h3>
              <p className="text-slate-600">Receive confirmations, track applications, and prepare for interviews with our tools.</p>
            </div>
          </div>
        </div>
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

export default About;
