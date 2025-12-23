import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Briefcase, GraduationCap, Award, Plus, Trash2, Download, Eye, Sparkles } from 'lucide-react';
import { ATSTemplate } from './ATSResumeTemplates';

interface ResumeData {
  // Personal Info
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  portfolio: string;
  title: string;
  
  // Summary
  summary: string;
  
  // Experience
  experiences: {
    jobTitle: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    achievements: string[];
  }[];
  
  // Education
  education: {
    degree: string;
    school: string;
    location: string;
    graduationYear: string;
    gpa?: string;
  }[];
  
  // Skills
  skills: string[];
  
  // Certifications
  certifications: {
    name: string;
    issuer: string;
    year: string;
  }[];
}

interface ResumeFormBuilderProps {
  template: ATSTemplate;
  onSave: (data: ResumeData) => void;
  onPreview: (data: ResumeData) => void;
  initialData?: Partial<ResumeData>;
}

const ResumeFormBuilder = ({ 
  template, 
  onSave, 
  onPreview,
  initialData 
}: ResumeFormBuilderProps) => {
  const [resumeData, setResumeData] = useState({
    fullName: initialData?.fullName || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    location: initialData?.location || '',
    linkedin: initialData?.linkedin || '',
    portfolio: initialData?.portfolio || '',
    title: initialData?.title || '',
    summary: initialData?.summary || '',
    experiences: initialData?.experiences || [{
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      achievements: ['']
    }],
    education: initialData?.education || [{
      degree: '',
      school: '',
      location: '',
      graduationYear: '',
      gpa: ''
    }],
    skills: initialData?.skills || [''],
    certifications: initialData?.certifications || []
  });

  const [aiSuggesting, setAiSuggesting] = useState(false);

  const updateField = (field: keyof ResumeData, value: any) => {
    setResumeData(prev => ({ ...prev, [field]: value }));
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experiences: [...prev.experiences, {
        jobTitle: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        achievements: ['']
      }]
    }));
  };

  const removeExperience = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.filter((_, i) => i !== index)
    }));
  };

  const updateExperience = (index: number, field: string, value: any) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const addAchievement = (expIndex: number) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.map((exp, i) => 
        i === expIndex ? { ...exp, achievements: [...exp.achievements, ''] } : exp
      )
    }));
  };

  const updateAchievement = (expIndex: number, achIndex: number, value: string) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.map((exp, i) => 
        i === expIndex ? {
          ...exp,
          achievements: exp.achievements.map((ach, j) => j === achIndex ? value : ach)
        } : exp
      )
    }));
  };

  const removeAchievement = (expIndex: number, achIndex: number) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.map((exp, i) => 
        i === expIndex ? {
          ...exp,
          achievements: exp.achievements.filter((_, j) => j !== achIndex)
        } : exp
      )
    }));
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, {
        degree: '',
        school: '',
        location: '',
        graduationYear: '',
        gpa: ''
      }]
    }));
  };

  const removeEducation = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const updateEducation = (index: number, field: string, value: any) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const addSkill = () => {
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, '']
    }));
  };

  const updateSkill = (index: number, value: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) => i === index ? value : skill)
    }));
  };

  const removeSkill = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const addCertification = () => {
    setResumeData(prev => ({
      ...prev,
      certifications: [...prev.certifications, { name: '', issuer: '', year: '' }]
    }));
  };

  const updateCertification = (index: number, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.map((cert, i) => 
        i === index ? { ...cert, [field]: value } : cert
      )
    }));
  };

  const removeCertification = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }));
  };

  const getAISuggestions = async (field: string, context: any) => {
    setAiSuggesting(true);
    // TODO: Integrate with Gemini AI for suggestions
    setTimeout(() => {
      setAiSuggesting(false);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="mb-6">
        <div className={`bg-gradient-to-r ${template.color} text-white p-4 rounded-lg flex items-center justify-between`}>
          <div>
            <h2 className="text-2xl font-bold">{template.name}</h2>
            <p className="text-sm opacity-90">Fill in your details below</p>
          </div>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-full">
            <Award className="w-5 h-5" />
            <span className="font-bold">{template.atsScore}% ATS</span>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <section className="mb-8">
        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600" />
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name *</label>
            <input
              type="text"
              value={resumeData.fullName}
              onChange={(e) => updateField('fullName', e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Professional Title *</label>
            <input
              type="text"
              value={resumeData.title}
              onChange={(e) => updateField('title', e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Senior Software Engineer"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Email *</label>
            <input
              type="email"
              value={resumeData.email}
              onChange={(e) => updateField('email', e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Phone *</label>
            <input
              type="tel"
              value={resumeData.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="(555) 123-4567"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Location *</label>
            <input
              type="text"
              value={resumeData.location}
              onChange={(e) => updateField('location', e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="San Francisco, CA"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">LinkedIn Profile</label>
            <input
              type="url"
              value={resumeData.linkedin}
              onChange={(e) => updateField('linkedin', e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="linkedin.com/in/johndoe"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-1">Portfolio/Website</label>
            <input
              type="url"
              value={resumeData.portfolio}
              onChange={(e) => updateField('portfolio', e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="www.johndoe.com"
            />
          </div>
        </div>
      </section>

      {/* Professional Summary */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-600" />
            Professional Summary
          </h3>
          <button
            onClick={() => getAISuggestions('summary', resumeData)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm font-semibold"
          >
            <Sparkles className="w-4 h-4" />
            {aiSuggesting ? 'Generating...' : 'AI Suggestions'}
          </button>
        </div>
        <textarea
          value={resumeData.summary}
          onChange={(e) => updateField('summary', e.target.value)}
          rows={4}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Write a compelling 2-3 sentence summary highlighting your experience and expertise..."
        />
        <p className="text-xs text-slate-500 mt-1">Tip: Focus on years of experience, key skills, and main achievements</p>
      </section>

      {/* Experience Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-600" />
            Work Experience
          </h3>
          <button
            onClick={addExperience}
            className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-semibold"
          >
            <Plus className="w-4 h-4" />
            Add Experience
          </button>
        </div>

        {resumeData.experiences.map((exp, expIndex) => (
          <div key={expIndex} className="mb-6 p-6 border-2 border-slate-200 rounded-lg bg-slate-50">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-semibold text-slate-900">Experience #{expIndex + 1}</h4>
              {resumeData.experiences.length > 1 && (
                <button
                  onClick={() => removeExperience(expIndex)}
                  className="text-red-600 hover:text-red-700 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Job Title *</label>
                <input
                  type="text"
                  value={exp.jobTitle}
                  onChange={(e) => updateExperience(expIndex, 'jobTitle', e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  placeholder="Senior Software Engineer"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Company *</label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => updateExperience(expIndex, 'company', e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  placeholder="Tech Corp"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Location</label>
                <input
                  type="text"
                  value={exp.location}
                  onChange={(e) => updateExperience(expIndex, 'location', e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  placeholder="San Francisco, CA"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Start Date *</label>
                  <input
                    type="text"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(expIndex, 'startDate', e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    placeholder="Jan 2020"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">End Date</label>
                  <input
                    type="text"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(expIndex, 'endDate', e.target.value)}
                    disabled={exp.current}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white disabled:bg-slate-100"
                    placeholder="Dec 2023"
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={(e) => updateExperience(expIndex, 'current', e.target.checked)}
                  className="rounded border-slate-300"
                />
                I currently work here
              </label>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-slate-700">Achievements & Responsibilities *</label>
                <button
                  onClick={() => addAchievement(expIndex)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  Add Achievement
                </button>
              </div>
              {exp.achievements.map((achievement, achIndex) => (
                <div key={achIndex} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={achievement}
                    onChange={(e) => updateAchievement(expIndex, achIndex, e.target.value)}
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    placeholder="Led development of microservices architecture serving 2M+ users..."
                  />
                  {exp.achievements.length > 1 && (
                    <button
                      onClick={() => removeAchievement(expIndex, achIndex)}
                      className="text-red-600 hover:text-red-700 p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <p className="text-xs text-slate-500 mt-1">Tip: Start with action verbs and include measurable results</p>
            </div>
          </div>
        ))}
      </section>

      {/* Education Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-blue-600" />
            Education
          </h3>
          <button
            onClick={addEducation}
            className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-semibold"
          >
            <Plus className="w-4 h-4" />
            Add Education
          </button>
        </div>

        {resumeData.education.map((edu, index) => (
          <div key={index} className="mb-4 p-6 border-2 border-slate-200 rounded-lg bg-slate-50">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-semibold text-slate-900">Education #{index + 1}</h4>
              {resumeData.education.length > 1 && (
                <button
                  onClick={() => removeEducation(index)}
                  className="text-red-600 hover:text-red-700 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Degree *</label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  placeholder="B.S. Computer Science"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">School/University *</label>
                <input
                  type="text"
                  value={edu.school}
                  onChange={(e) => updateEducation(index, 'school', e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  placeholder="Stanford University"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Location</label>
                <input
                  type="text"
                  value={edu.location}
                  onChange={(e) => updateEducation(index, 'location', e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  placeholder="Stanford, CA"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Graduation Year *</label>
                <input
                  type="text"
                  value={edu.graduationYear}
                  onChange={(e) => updateEducation(index, 'graduationYear', e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  placeholder="2020"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-1">GPA (Optional)</label>
                <input
                  type="text"
                  value={edu.gpa}
                  onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  placeholder="3.8/4.0"
                />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Skills Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-600" />
            Skills
          </h3>
          <button
            onClick={addSkill}
            className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-semibold"
          >
            <Plus className="w-4 h-4" />
            Add Skill
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {resumeData.skills.map((skill, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={skill}
                onChange={(e) => updateSkill(index, e.target.value)}
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="React, Python, AWS..."
              />
              {resumeData.skills.length > 1 && (
                <button
                  onClick={() => removeSkill(index)}
                  className="text-red-600 hover:text-red-700 p-2"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Certifications Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-600" />
            Certifications (Optional)
          </h3>
          <button
            onClick={addCertification}
            className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-semibold"
          >
            <Plus className="w-4 h-4" />
            Add Certification
          </button>
        </div>

        {resumeData.certifications.map((cert, index) => (
          <div key={index} className="mb-3 p-4 border border-slate-200 rounded-lg flex gap-3 items-start bg-slate-50">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                type="text"
                value={cert.name}
                onChange={(e) => updateCertification(index, 'name', e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                placeholder="Certification Name"
              />
              <input
                type="text"
                value={cert.issuer}
                onChange={(e) => updateCertification(index, 'issuer', e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                placeholder="Issuing Organization"
              />
              <input
                type="text"
                value={cert.year}
                onChange={(e) => updateCertification(index, 'year', e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                placeholder="Year"
              />
            </div>
            <button
              onClick={() => removeCertification(index)}
              className="text-red-600 hover:text-red-700 p-2"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </section>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-end pt-6 border-t border-slate-200">
        <button
          onClick={() => onPreview(resumeData)}
          className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-semibold"
        >
          <Eye className="w-5 h-5" />
          Preview Resume
        </button>
        <button
          onClick={() => onSave(resumeData)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
        >
          <Download className="w-5 h-5" />
          Save & Download
        </button>
      </div>
    </div>
  );
};

export default ResumeFormBuilder;
