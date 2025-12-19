import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { Linkedin, Sparkles, Target, TrendingUp, Users, Award, CheckCircle, Star, Zap, Eye, MessageSquare, UserPlus, Briefcase, ArrowRight } from 'lucide-react';

interface LinkedInOptimizationProps {
  userName?: string;
  onNavigate?: (page: string) => void;
  onLogout?: () => void;
}

const LinkedInOptimization: React.FC<LinkedInOptimizationProps> = ({ userName = 'User', onNavigate = () => {}, onLogout = () => {} }) => {
  const [selectedProfile, setSelectedProfile] = useState<string>('professional');

  const profileExamples = [
    {
      id: 'professional',
      name: 'Professional Profile',
      score: 95,
      color: 'from-blue-500 to-cyan-600',
      headline: 'Senior Software Engineer | React & Node.js Expert | Building Scalable Solutions',
      summary: 'Passionate software engineer with 8+ years of experience building enterprise-grade applications. Specialized in React, TypeScript, and cloud architecture. Led teams of 5+ developers and delivered projects serving 2M+ users.',
      tips: ['Strong action verbs', 'Quantifiable results', 'Industry keywords', 'Clear value proposition']
    },
    {
      id: 'executive',
      name: 'Executive Profile',
      score: 98,
      color: 'from-purple-500 to-indigo-600',
      headline: 'VP of Engineering | Tech Leader | Driving Innovation & Team Growth',
      summary: 'Strategic technology leader with proven track record of scaling engineering teams and products. 15+ years building high-performance organizations. Expertise in cloud architecture, agile transformation, and talent development.',
      tips: ['Leadership focus', 'Strategic impact', 'Business outcomes', 'Team achievements']
    },
    {
      id: 'creative',
      name: 'Creative Profile',
      score: 92,
      color: 'from-pink-500 to-rose-600',
      headline: 'UX Designer | Creating Delightful User Experiences | Design Systems Enthusiast',
      summary: 'Award-winning UX designer passionate about solving complex problems through intuitive design. 6+ years crafting user-centered experiences for Fortune 500 companies. Advocate for accessibility and inclusive design.',
      tips: ['Portfolio highlights', 'Design philosophy', 'Tools & expertise', 'Award mentions']
    }
  ];

  const optimizationFeatures = [
    {
      icon: Target,
      title: 'Headline Optimization',
      description: 'Craft compelling headlines that grab recruiter attention in 3 seconds',
      metric: '5x more views'
    },
    {
      icon: Sparkles,
      title: 'Summary Enhancement',
      description: 'AI-powered summary that showcases your unique value proposition',
      metric: '3x more connections'
    },
    {
      icon: Award,
      title: 'Skills & Endorsements',
      description: 'Strategic skill placement to rank higher in recruiter searches',
      metric: '10x more searches'
    },
    {
      icon: Users,
      title: 'Network Growth',
      description: 'Smart networking strategies to expand your professional circle',
      metric: '500+ new connections'
    },
    {
      icon: MessageSquare,
      title: 'Engagement Tips',
      description: 'Content strategies to boost your visibility and thought leadership',
      metric: '8x more engagement'
    },
    {
      icon: TrendingUp,
      title: 'Profile Analytics',
      description: 'Track profile views, search appearances, and connection growth',
      metric: 'Real-time insights'
    }
  ];

  const selectedExample = profileExamples.find(p => p.id === selectedProfile) || profileExamples[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-1/2 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <PageHeader userName={userName} currentPage="linkedin" onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="relative z-10 max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full mb-6">
            <Linkedin className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            LinkedIn Profile Optimization
          </h1>
          <p className="text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed">
            Transform your LinkedIn profile into a recruiter magnet. Get discovered by top companies and land your dream job faster.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {[
            { value: '10x', label: 'More Profile Views', icon: Eye },
            { value: '500+', label: 'New Connections', icon: UserPlus },
            { value: '5x', label: 'Recruiter Contacts', icon: Briefcase },
            { value: '95%', label: 'Success Rate', icon: CheckCircle }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 text-center border border-white/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-blue-600" />
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-slate-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Optimization Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">
            Complete LinkedIn Optimization
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {optimizationFeatures.map((feature, idx) => (
              <div key={idx} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div className={`inline-flex p-3 bg-gradient-to-br ${idx % 3 === 0 ? 'from-blue-500 to-cyan-600' : idx % 3 === 1 ? 'from-indigo-500 to-purple-600' : 'from-cyan-500 to-blue-600'} rounded-xl mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-slate-600 mb-3">{feature.description}</p>
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
                  <TrendingUp className="w-4 h-4" />
                  {feature.metric}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Profile Examples */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-4">
            Sample Optimized Profiles
          </h2>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            See how a well-optimized LinkedIn profile looks. Click to explore different examples.
          </p>

          {/* Profile Tabs */}
          <div className="flex justify-center gap-4 mb-8 flex-wrap">
            {profileExamples.map((profile) => (
              <button
                key={profile.id}
                onClick={() => setSelectedProfile(profile.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  selectedProfile === profile.id
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                    : 'bg-white/80 text-slate-700 hover:bg-white hover:shadow-md'
                }`}
              >
                {profile.name}
              </button>
            ))}
          </div>

          {/* Selected Profile Display */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border-2 border-blue-200">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`w-20 h-20 bg-gradient-to-br ${selectedExample.color} rounded-full flex items-center justify-center`}>
                  <Linkedin className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-1">{selectedExample.name}</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(selectedExample.score / 20) ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}`} />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-blue-600">Score: {selectedExample.score}%</span>
                  </div>
                </div>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-semibold text-slate-500 mb-2">HEADLINE</h4>
              <p className="text-lg font-semibold text-slate-800 bg-gradient-to-r from-slate-50 to-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                {selectedExample.headline}
              </p>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-semibold text-slate-500 mb-2">SUMMARY</h4>
              <p className="text-slate-700 leading-relaxed bg-gradient-to-r from-slate-50 to-blue-50 p-4 rounded-lg">
                {selectedExample.summary}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-slate-500 mb-3">OPTIMIZATION HIGHLIGHTS</h4>
              <div className="grid grid-cols-2 gap-3">
                {selectedExample.tips.map((tip, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-green-50 p-3 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-sm font-medium text-slate-700">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Optimization Tips */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl shadow-2xl p-8 mb-16 text-white">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-8 h-8" />
            <h2 className="text-3xl font-bold">Pro Tips for LinkedIn Success</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Use a professional photo with good lighting and background',
              'Include 5-10 relevant skills that recruiters search for',
              'Post engaging content 2-3 times per week',
              'Personalize connection requests with a brief message',
              'Get endorsements from colleagues and managers',
              'Join industry-specific groups and participate actively',
              'Keep your profile updated with latest achievements',
              'Use keywords that match your target job descriptions'
            ].map((tip, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <ArrowRight className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-12 border border-white/20">
          <Sparkles className="w-16 h-16 mx-auto mb-6 text-blue-600" />
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Ready to Optimize Your Profile?
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Let our AI analyze your LinkedIn profile and provide personalized recommendations to boost your visibility.
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 inline-flex items-center gap-2">
            Start Optimization
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

export default LinkedInOptimization;
