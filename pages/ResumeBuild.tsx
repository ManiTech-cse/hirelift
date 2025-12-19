import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { FileText, CheckCircle, Award, TrendingUp, Download, Eye, Sparkles, Star, Zap } from 'lucide-react';

interface ResumeBuildProps {
  userName?: string;
  onNavigate?: (page: string) => void;
  onLogout?: () => void;
}

const ResumeBuild: React.FC<ResumeBuildProps> = ({ userName = 'User', onNavigate = () => {}, onLogout = () => {} }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('modern');

  const templates = [
    {
      id: 'modern',
      name: 'Modern Professional',
      score: 100,
      description: '100% ATS-compatible with clean design',
      color: 'from-blue-500 to-indigo-600',
      preview: `
        <div class="bg-white p-6 rounded shadow-sm text-xs">
          <div class="border-l-4 border-blue-600 pl-4 mb-4">
            <h1 class="text-lg font-bold text-slate-900">JOHN ANDERSON</h1>
            <p class="text-blue-600 font-semibold">Senior Software Engineer</p>
            <p class="text-slate-600 text-xs">john.anderson@email.com | (555) 123-4567 | San Francisco, CA</p>
          </div>
          
          <div class="mb-3">
            <h2 class="text-sm font-bold text-blue-600 border-b border-blue-200 pb-1 mb-2">PROFESSIONAL SUMMARY</h2>
            <p class="text-slate-700">Results-driven Software Engineer with 8+ years of experience in developing scalable applications. Expertise in React, Node.js, and cloud technologies.</p>
          </div>
          
          <div class="mb-3">
            <h2 class="text-sm font-bold text-blue-600 border-b border-blue-200 pb-1 mb-2">EXPERIENCE</h2>
            <div class="mb-2">
              <div class="flex justify-between">
                <span class="font-semibold text-slate-900">Senior Software Engineer</span>
                <span class="text-slate-600">2020 - Present</span>
              </div>
              <p class="text-blue-600 text-xs">Tech Corp, San Francisco, CA</p>
              <ul class="list-disc pl-4 text-slate-700 mt-1">
                <li>Led development of microservices architecture serving 2M+ users</li>
                <li>Improved application performance by 40% through optimization</li>
              </ul>
            </div>
          </div>
          
          <div class="mb-3">
            <h2 class="text-sm font-bold text-blue-600 border-b border-blue-200 pb-1 mb-2">SKILLS</h2>
            <div class="flex flex-wrap gap-1">
              <span class="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">React</span>
              <span class="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">Node.js</span>
              <span class="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">TypeScript</span>
              <span class="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">AWS</span>
            </div>
          </div>
          
          <div>
            <h2 class="text-sm font-bold text-blue-600 border-b border-blue-200 pb-1 mb-2">EDUCATION</h2>
            <div class="flex justify-between">
              <span class="font-semibold text-slate-900">B.S. Computer Science</span>
              <span class="text-slate-600">2015</span>
            </div>
            <p class="text-slate-700 text-xs">Stanford University</p>
          </div>
        </div>
      `
    },
    {
      id: 'classic',
      name: 'Classic Executive',
      score: 98,
      description: 'Traditional format for corporate roles',
      color: 'from-slate-600 to-slate-800',
      preview: `
        <div class="bg-white p-6 rounded shadow-sm text-xs">
          <div class="text-center mb-4 border-b-2 border-slate-800 pb-3">
            <h1 class="text-lg font-bold text-slate-900">SARAH MARTINEZ</h1>
            <p class="text-slate-700 font-semibold">Marketing Director</p>
            <p class="text-slate-600 text-xs">sarah.martinez@email.com | (555) 987-6543 | New York, NY | LinkedIn: /in/sarahm</p>
          </div>
          
          <div class="mb-3">
            <h2 class="text-sm font-bold text-slate-900 uppercase mb-2">Executive Summary</h2>
            <p class="text-slate-700">Dynamic marketing executive with 10+ years driving brand growth and digital transformation. Proven track record of increasing ROI by 150% through strategic campaigns.</p>
          </div>
          
          <div class="mb-3">
            <h2 class="text-sm font-bold text-slate-900 uppercase mb-2">Professional Experience</h2>
            <div class="mb-2">
              <div class="flex justify-between">
                <span class="font-semibold text-slate-900">Marketing Director</span>
                <span class="text-slate-600">2019 - Present</span>
              </div>
              <p class="text-slate-700 text-xs italic">Global Brands Inc., New York, NY</p>
              <ul class="list-disc pl-4 text-slate-700 mt-1">
                <li>Managed $5M annual marketing budget across 15+ channels</li>
                <li>Increased brand awareness by 75% through integrated campaigns</li>
                <li>Led team of 12 marketing professionals</li>
              </ul>
            </div>
          </div>
          
          <div class="mb-3">
            <h2 class="text-sm font-bold text-slate-900 uppercase mb-2">Core Competencies</h2>
            <div class="grid grid-cols-2 gap-2 text-slate-700">
              <div>• Digital Marketing</div>
              <div>• Brand Strategy</div>
              <div>• Team Leadership</div>
              <div>• Data Analytics</div>
            </div>
          </div>
          
          <div>
            <h2 class="text-sm font-bold text-slate-900 uppercase mb-2">Education & Certifications</h2>
            <div class="mb-1">
              <span class="font-semibold text-slate-900">MBA, Marketing</span>
              <span class="text-slate-600 text-xs"> - Columbia Business School (2018)</span>
            </div>
            <div>
              <span class="font-semibold text-slate-900">Google Analytics Certified</span>
              <span class="text-slate-600 text-xs"> (2022)</span>
            </div>
          </div>
        </div>
      `
    },
    {
      id: 'creative',
      name: 'Creative Modern',
      score: 95,
      description: 'Eye-catching design for creative roles',
      color: 'from-purple-500 to-pink-600',
      preview: `
        <div class="bg-white p-6 rounded shadow-sm text-xs">
          <div class="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 -m-6 mb-4 rounded-t">
            <h1 class="text-lg font-bold">ALEX RIVERA</h1>
            <p class="font-semibold">UI/UX Designer & Creative Director</p>
            <div class="flex gap-3 text-xs mt-2">
              <span>📧 alex.rivera@email.com</span>
              <span>📱 (555) 246-8102</span>
              <span>📍 Los Angeles, CA</span>
            </div>
          </div>
          
          <div class="mb-3">
            <h2 class="text-sm font-bold text-purple-600 flex items-center gap-2 mb-2">
              <span class="w-8 h-0.5 bg-purple-600"></span>
              CREATIVE PROFILE
            </h2>
            <p class="text-slate-700">Award-winning designer with 7+ years creating intuitive digital experiences. Specialized in user-centered design and brand identity.</p>
          </div>
          
          <div class="mb-3">
            <h2 class="text-sm font-bold text-purple-600 flex items-center gap-2 mb-2">
              <span class="w-8 h-0.5 bg-purple-600"></span>
              EXPERIENCE
            </h2>
            <div class="mb-2">
              <div class="flex justify-between items-start">
                <div>
                  <p class="font-semibold text-slate-900">Senior UX Designer</p>
                  <p class="text-purple-600 text-xs">Creative Studios, Los Angeles, CA</p>
                </div>
                <span class="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs">2021 - Now</span>
              </div>
              <ul class="list-none pl-0 text-slate-700 mt-1">
                <li>→ Redesigned mobile app increasing user retention by 60%</li>
                <li>→ Led design system implementation across 5 products</li>
              </ul>
            </div>
          </div>
          
          <div class="mb-3">
            <h2 class="text-sm font-bold text-purple-600 flex items-center gap-2 mb-2">
              <span class="w-8 h-0.5 bg-purple-600"></span>
              DESIGN SKILLS
            </h2>
            <div class="space-y-1">
              <div>
                <div class="flex justify-between text-xs mb-0.5">
                  <span class="text-slate-700">Figma & Adobe XD</span>
                  <span class="text-purple-600">Expert</span>
                </div>
                <div class="w-full bg-slate-200 rounded-full h-1.5">
                  <div class="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-full" style="width: 95%"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-xs mb-0.5">
                  <span class="text-slate-700">UI/UX Design</span>
                  <span class="text-purple-600">Expert</span>
                </div>
                <div class="w-full bg-slate-200 rounded-full h-1.5">
                  <div class="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-full" style="width: 90%"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h2 class="text-sm font-bold text-purple-600 flex items-center gap-2 mb-2">
              <span class="w-8 h-0.5 bg-purple-600"></span>
              EDUCATION
            </h2>
            <p class="font-semibold text-slate-900">B.A. Graphic Design</p>
            <p class="text-slate-700 text-xs">Art Center College of Design • 2016</p>
          </div>
        </div>
      `
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -right-40 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute -top-40 left-20 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-gradient-to-br from-pink-400/20 to-rose-400/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <PageHeader userName={userName} currentPage="resume" onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="relative z-10 max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mb-6">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            100% ATS-Optimized Resume Templates
          </h1>
          <p className="text-xl text-slate-700 max-w-3xl mx-auto">
            Create a professional resume in minutes with our AI-powered templates that pass Applicant Tracking Systems
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl w-fit mb-4">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">100% ATS Compatible</h3>
            <p className="text-slate-600">
              All templates are optimized to pass Applicant Tracking Systems with a 98%+ success rate
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl w-fit mb-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">AI-Powered Suggestions</h3>
            <p className="text-slate-600">
              Get intelligent content suggestions and keyword optimization for your target role
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl w-fit mb-4">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">85% Interview Rate</h3>
            <p className="text-slate-600">
              Users report 85% higher interview callback rates with our optimized templates
            </p>
          </div>
        </div>

        {/* Template Selection */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-12 border border-white/20">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Choose Your Template</h2>
          <p className="text-slate-600 mb-8">Select a template that matches your industry and style preferences</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {templates.map((template) => (
              <div
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`cursor-pointer rounded-xl border-2 transition-all duration-300 ${
                  selectedTemplate === template.id
                    ? 'border-purple-500 shadow-2xl scale-105'
                    : 'border-white/50 hover:border-purple-300 hover:shadow-xl'
                }`}
              >
                <div className={`bg-gradient-to-r ${template.color} p-4 rounded-t-xl`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-white">{template.name}</h3>
                    {selectedTemplate === template.id && (
                      <CheckCircle className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-300 fill-current" />
                      <span className="text-white font-bold">{template.score}%</span>
                    </div>
                    <span className="text-white/90 text-sm">ATS Score</span>
                  </div>
                </div>
                
                <div className="p-4 bg-white rounded-b-xl">
                  <p className="text-slate-600 text-sm mb-4">{template.description}</p>
                  
                  {/* Template Preview */}
                  <div 
                    className="border border-slate-200 rounded-lg overflow-hidden transform scale-75 origin-top-left"
                    style={{ width: '133%', height: '400px' }}
                    dangerouslySetInnerHTML={{ __html: template.preview }}
                  />
                  
                  <div className="mt-4 flex gap-2">
                    <button className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
                      <Eye className="w-4 h-4" />
                      Preview
                    </button>
                    <button className="flex-1 border-2 border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition-all duration-300 flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Use
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ATS Tips */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl shadow-2xl p-12 mb-12">
          <h2 className="text-3xl font-bold text-white text-center mb-8">ATS Optimization Tips</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Use Keywords</h3>
                  <p className="text-white/90">
                    Include relevant keywords from the job description in your resume to match ATS algorithms
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-white/20 rounded-lg">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Simple Format</h3>
                  <p className="text-white/90">
                    Avoid complex formatting, tables, and graphics that ATS systems cannot read
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Quantify Achievements</h3>
                  <p className="text-white/90">
                    Use numbers and metrics to demonstrate your impact and accomplishments
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-white/20 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Standard Headings</h3>
                  <p className="text-white/90">
                    Use conventional section titles like "Experience" and "Education" for better ATS parsing
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-12 text-center border border-white/20">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Ready to Build Your Resume?</h2>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Join thousands of job seekers who have landed their dream jobs with our ATS-optimized templates
          </p>
          <button className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-12 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 mx-auto">
            <Sparkles className="w-6 h-6" />
            Start Building Now
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

export default ResumeBuild;
