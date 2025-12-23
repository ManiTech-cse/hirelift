import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import ATSResumeTemplates, { ATSTemplate } from '../components/ATSResumeTemplates';
import ResumeFormBuilder from '../components/ResumeFormBuilder';
import AIInterviewPrep from '../components/AIInterviewPrep';
import { FileText, ArrowLeft, MessageCircle, Download, CheckCircle, Sparkles } from 'lucide-react';

interface ResumeBuildProps {
  userName?: string;
  userEmail?: string;  onNavigate?: (page: string) => void;
  onLogout?: () => void;
}

type ResumeStep = 'select-template' | 'build-resume' | 'interview-prep' | 'complete';

const ResumeBuildNew = ({ 
  userName = 'User', 
  userEmail = '',
  onNavigate = (_page: string) => {}, 
  onLogout = () => {} 
}: ResumeBuildProps) => {
  const [currentStep, setCurrentStep] = useState('select-template');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [resumeData, setResumeData] = useState(null);

  const handleTemplateSelect = (template: any) => {
    setSelectedTemplate(template);
    setCurrentStep('build-resume');
  };

  const handleResumeSave = (data: any) => {
    setResumeData(data);
    // TODO: Save to backend/local storage
    alert('Resume saved! You can now download it.');
    setCurrentStep('complete');
  };

  const handleResumePreview = (data: any) => {
    // TODO: Generate preview
    alert('Preview feature coming soon!');
  };

  const goToInterviewPrep = () => {
    setCurrentStep('interview-prep');
  };

  const backToTemplates = () => {
    setCurrentStep('select-template');
    setSelectedTemplate(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <PageHeader userName={userName} currentPage="resume" onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            <div className={`flex items-center gap-2 ${currentStep === 'select-template' ? 'text-blue-600 font-bold' : 'text-slate-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep === 'select-template' ? 'bg-blue-600 text-white' : 'bg-slate-200'
              }`}>
                1
              </div>
              <span className="hidden sm:inline">Select Template</span>
            </div>

            <div className="w-12 h-1 bg-slate-200 rounded"></div>

            <div className={`flex items-center gap-2 ${currentStep === 'build-resume' ? 'text-blue-600 font-bold' : 'text-slate-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep === 'build-resume' ? 'bg-blue-600 text-white' : 'bg-slate-200'
              }`}>
                2
              </div>
              <span className="hidden sm:inline">Build Resume</span>
            </div>

            <div className="w-12 h-1 bg-slate-200 rounded"></div>

            <div className={`flex items-center gap-2 ${currentStep === 'interview-prep' ? 'text-blue-600 font-bold' : 'text-slate-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep === 'interview-prep' ? 'bg-blue-600 text-white' : 'bg-slate-200'
              }`}>
                3
              </div>
              <span className="hidden sm:inline">Interview Prep</span>
            </div>
          </div>
        </div>

        {/* Step 1: Template Selection */}
        {currentStep === 'select-template' && (
          <div>
            <ATSResumeTemplates 
              onSelectTemplate={handleTemplateSelect}
              selectedTemplateId={selectedTemplate?.id}
            />
          </div>
        )}

        {/* Step 2: Resume Builder */}
        {currentStep === 'build-resume' && selectedTemplate && (
          <div>
            <button
              onClick={backToTemplates}
              className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Templates
            </button>
            
            <ResumeFormBuilder
              template={selectedTemplate}
              onSave={handleResumeSave}
              onPreview={handleResumePreview}
              initialData={{
                fullName: userName,
                email: userEmail
              }}
            />
          </div>
        )}

        {/* Step 3: Interview Preparation */}
        {currentStep === 'interview-prep' && (
          <div>
            <button
              onClick={backToTemplates}
              className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Resume Builder
            </button>

            <AIInterviewPrep userName={userName} userRole="Software Engineer" />
          </div>
        )}

        {/* Step 4: Completion */}
        {currentStep === 'complete' && (
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-xl p-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Your Resume is Ready!
              </h2>
              <p className="text-slate-600 mb-8">
                Congratulations! Your ATS-optimized resume has been created successfully.
              </p>

              <div className="space-y-4">
                <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />
                  Download Resume (PDF)
                </button>

                <button 
                  onClick={goToInterviewPrep}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Practice Interview Questions
                </button>

                <button 
                  onClick={backToTemplates}
                  className="w-full py-4 bg-slate-100 text-slate-700 rounded-lg font-semibold hover:bg-slate-200 transition-all"
                >
                  Create Another Resume
                </button>                <button 
                  onClick={() => {
                    setCurrentStep('select-template');
                    onNavigate('home');
                  }}
                  className="w-full py-4 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all"
                >
                  Go to Job Search
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quick access button for Interview Prep */}
        {currentStep === 'build-resume' && (
          <div className="fixed bottom-8 right-8 z-50">
            <button
              onClick={goToInterviewPrep}
              className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 flex items-center gap-3"
            >
              <Sparkles className="w-6 h-6 animate-pulse" />
              <span className="font-bold">Try Interview Prep</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeBuildNew;
