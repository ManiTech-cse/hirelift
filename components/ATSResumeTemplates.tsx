import React from 'react';
import { FileText, Award, Briefcase, Code, Palette, GraduationCap } from 'lucide-react';

export interface ATSTemplate {
  id: string;
  name: string;
  category: string;
  atsScore: number;
  description: string;
  color: string;
  icon: React.JSX.Element;
  preview: string;
  bestFor: string[];
}

export const ATS_TEMPLATES: ATSTemplate[] = [
  {
    id: 'tech-modern',
    name: 'Tech Modern',
    category: 'Technology',
    atsScore: 100,
    description: 'Perfect for software engineers and developers',
    color: 'from-blue-500 to-blue-700',
    icon: <Code className="w-5 h-5" />,
    bestFor: ['Software Engineer', 'Developer', 'DevOps', 'Tech Lead'],
    preview: `
      <div class="bg-white p-4 text-xs font-sans">
        <div class="border-l-4 border-blue-600 pl-3 mb-3">
          <h1 class="text-base font-bold text-slate-900">[YOUR NAME]</h1>
          <p class="text-blue-600 font-semibold text-sm">[YOUR TITLE]</p>
          <p class="text-slate-600">[EMAIL] | [PHONE] | [LOCATION] | [LINKEDIN]</p>
        </div>
        <div class="mb-2">
          <h2 class="text-xs font-bold text-blue-600 border-b border-blue-200 pb-1 mb-1 uppercase">Professional Summary</h2>
          <p class="text-slate-700">[2-3 sentences about your experience and expertise]</p>
        </div>
        <div class="mb-2">
          <h2 class="text-xs font-bold text-blue-600 border-b border-blue-200 pb-1 mb-1 uppercase">Technical Skills</h2>
          <p class="text-slate-700"><strong>Languages:</strong> [Your programming languages]</p>
          <p class="text-slate-700"><strong>Frameworks:</strong> [Your frameworks]</p>
          <p class="text-slate-700"><strong>Tools:</strong> [Your tools]</p>
        </div>
        <div class="mb-2">
          <h2 class="text-xs font-bold text-blue-600 border-b border-blue-200 pb-1 mb-1 uppercase">Experience</h2>
          <div class="mb-2">
            <div class="flex justify-between"><span class="font-semibold">[JOB TITLE]</span><span>[DATES]</span></div>
            <p class="text-blue-600">[COMPANY NAME], [LOCATION]</p>
            <ul class="list-disc pl-4 mt-1">
              <li>[Achievement with metrics]</li>
              <li>[Achievement with metrics]</li>
            </ul>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'executive-classic',
    name: 'Executive Classic',
    category: 'Business',
    atsScore: 99,
    description: 'Professional format for senior roles',
    color: 'from-slate-600 to-slate-800',
    icon: <Briefcase className="w-5 h-5" />,
    bestFor: ['Manager', 'Director', 'VP', 'C-Level', 'Consultant'],
    preview: `
      <div class="bg-white p-4 text-xs font-serif">
        <div class="text-center mb-3 border-b-2 border-slate-800 pb-2">
          <h1 class="text-base font-bold">[YOUR NAME]</h1>
          <p class="text-slate-700 font-semibold">[YOUR TITLE]</p>
          <p class="text-slate-600">[EMAIL] | [PHONE] | [LOCATION]</p>
        </div>
        <div class="mb-2">
          <h2 class="text-xs font-bold uppercase mb-1">Executive Summary</h2>
          <p class="text-slate-700">[Your executive summary highlighting leadership experience]</p>
        </div>
        <div class="mb-2">
          <h2 class="text-xs font-bold uppercase mb-1">Professional Experience</h2>
          <div class="mb-2">
            <div class="flex justify-between"><span class="font-semibold">[POSITION]</span><span>[DATES]</span></div>
            <p class="italic">[COMPANY NAME], [LOCATION]</p>
            <ul class="list-disc pl-4 mt-1">
              <li>[Leadership achievement]</li>
              <li>[Strategic initiative]</li>
            </ul>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'creative-modern',
    name: 'Creative Modern',
    category: 'Creative',
    atsScore: 97,
    description: 'Stand out in creative industries',
    color: 'from-purple-500 to-pink-600',
    icon: <Palette className="w-5 h-5" />,
    bestFor: ['Designer', 'Artist', 'Content Creator', 'Marketing'],
    preview: `
      <div class="bg-white p-4 text-xs">
        <div class="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 -m-4 mb-3">
          <h1 class="text-base font-bold">[YOUR NAME]</h1>
          <p class="font-semibold">[YOUR TITLE]</p>
          <p class="text-xs mt-1">[EMAIL] | [PHONE] | [PORTFOLIO]</p>
        </div>
        <div class="mb-2">
          <h2 class="text-xs font-bold text-purple-600 flex items-center gap-2 mb-1">
            <span class="w-6 h-0.5 bg-purple-600"></span>CREATIVE PROFILE
          </h2>
          <p class="text-slate-700">[Your creative profile and expertise]</p>
        </div>
        <div class="mb-2">
          <h2 class="text-xs font-bold text-purple-600 flex items-center gap-2 mb-1">
            <span class="w-6 h-0.5 bg-purple-600"></span>EXPERIENCE
          </h2>
          <div class="flex justify-between items-start mb-1">
            <div>
              <p class="font-semibold">[ROLE]</p>
              <p class="text-purple-600">[COMPANY]</p>
            </div>
            <span class="bg-purple-100 text-purple-700 px-2 py-0.5 rounded">[DATES]</span>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'minimal-ats',
    name: 'Minimal ATS',
    category: 'Universal',
    atsScore: 100,
    description: 'Maximum ATS compatibility, any industry',
    color: 'from-green-500 to-green-700',
    icon: <Award className="w-5 h-5" />,
    bestFor: ['Any Role', 'Career Change', 'Entry Level'],
    preview: `
      <div class="bg-white p-4 text-xs font-sans">
        <h1 class="text-base font-bold mb-0">[YOUR NAME]</h1>
        <p class="text-slate-700 mb-1">[EMAIL] | [PHONE] | [LOCATION] | [LINKEDIN]</p>
        <div class="mb-2">
          <h2 class="text-xs font-bold uppercase border-b border-slate-300 pb-1 mb-1">Summary</h2>
          <p class="text-slate-700">[Your professional summary]</p>
        </div>
        <div class="mb-2">
          <h2 class="text-xs font-bold uppercase border-b border-slate-300 pb-1 mb-1">Skills</h2>
          <p class="text-slate-700">[Skill 1] • [Skill 2] • [Skill 3] • [Skill 4]</p>
        </div>
        <div class="mb-2">
          <h2 class="text-xs font-bold uppercase border-b border-slate-300 pb-1 mb-1">Experience</h2>
          <p class="font-semibold">[JOB TITLE] | [COMPANY] | [DATES]</p>
          <ul class="list-disc pl-4">
            <li>[Achievement]</li>
            <li>[Achievement]</li>
          </ul>
        </div>
      </div>
    `
  },
  {
    id: 'academic-research',
    name: 'Academic Research',
    category: 'Education',
    atsScore: 98,
    description: 'For researchers and academics',
    color: 'from-indigo-500 to-indigo-700',
    icon: <GraduationCap className="w-5 h-5" />,
    bestFor: ['Researcher', 'Professor', 'PhD', 'Academic'],
    preview: `
      <div class="bg-white p-4 text-xs">
        <div class="mb-3">
          <h1 class="text-base font-bold">[YOUR NAME]</h1>
          <p class="text-slate-700">[YOUR TITLE], [SPECIALIZATION]</p>
          <p class="text-slate-600">[EMAIL] | [PHONE] | [WEBSITE]</p>
        </div>
        <div class="mb-2">
          <h2 class="text-xs font-bold text-indigo-600 uppercase border-b-2 border-indigo-600 pb-1 mb-1">Education</h2>
          <p class="font-semibold">[DEGREE], [FIELD]</p>
          <p class="text-slate-700">[UNIVERSITY], [YEAR]</p>
        </div>
        <div class="mb-2">
          <h2 class="text-xs font-bold text-indigo-600 uppercase border-b-2 border-indigo-600 pb-1 mb-1">Publications</h2>
          <p class="text-slate-700">[Author], "[Title]", [Journal], [Year]</p>
        </div>
        <div class="mb-2">
          <h2 class="text-xs font-bold text-indigo-600 uppercase border-b-2 border-indigo-600 pb-1 mb-1">Research Experience</h2>
          <p class="font-semibold">[POSITION] | [INSTITUTION] | [DATES]</p>
        </div>
      </div>
    `
  }
];

interface ATSResumeTemplatesProps {
  onSelectTemplate: (template: ATSTemplate) => void;
  selectedTemplateId?: string;
}

const ATSResumeTemplates = ({ onSelectTemplate, selectedTemplateId }: ATSResumeTemplatesProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Choose Your ATS Resume Template</h2>
        <p className="text-slate-600">All templates are 95%+ ATS-compatible and optimized for applicant tracking systems</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ATS_TEMPLATES.map((template) => (
          <div
            key={template.id}
            onClick={() => onSelectTemplate(template)}
            className={`cursor-pointer rounded-xl border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
              selectedTemplateId === template.id
                ? 'border-blue-500 shadow-xl ring-4 ring-blue-100'
                : 'border-slate-200 hover:border-blue-300'
            }`}
          >
            <div className={`bg-gradient-to-r ${template.color} text-white p-4 rounded-t-xl`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {template.icon}
                  <h3 className="font-bold text-lg">{template.name}</h3>
                </div>
                <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                  <Award className="w-4 h-4" />
                  <span className="text-sm font-bold">{template.atsScore}%</span>
                </div>
              </div>
              <p className="text-sm opacity-90">{template.description}</p>
              <div className="mt-2">
                <p className="text-xs font-semibold opacity-75">Best for:</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {template.bestFor.map((role, idx) => (
                    <span key={idx} className="bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded text-xs">
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-slate-50">
              <div 
                className="border border-slate-200 rounded overflow-hidden"
                dangerouslySetInnerHTML={{ __html: template.preview }}
              />
            </div>

            <div className="p-4 bg-white rounded-b-xl">
              <button className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${
                selectedTemplateId === template.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-600'
              }`}>
                {selectedTemplateId === template.id ? '✓ Selected' : 'Use This Template'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ATSResumeTemplates;
