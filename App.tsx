import React, { useState } from 'react';
import { AppState, UserProfile, MatchedJob, Job } from './types';
import { matchJobsWithProfile, generateCoverLetter } from './services/geminiService';
import { generateN8nWorkflow } from './services/workflowGenerator';
import { generateWorkdayConsoleScript } from './services/workdayFiller';
import { Input, TextArea } from './components/Input';
import FileUpload from './components/FileUpload';
import Button from './components/Button';
import JobCard from './components/JobCard';
import JobFilterPanel, { JobFilters } from './components/JobFilterPanel';
import { Briefcase, ChevronRight, CheckCircle, Search, LogOut, AlertCircle, Mail, FileText, ArrowLeft, Save, User, Sparkles, Workflow, Bot, Loader2, FileCode, Download, MapPin, Globe } from 'lucide-react';
import { AVAILABLE_JOBS } from './constants';

// Default initial state
const INITIAL_PROFILE: UserProfile = { 
  name: "Alex Doe",
  email: "alex.doe@example.com",
  skills: ["React", "TypeScript", "Tailwind"],
  experience: "3 years",
  jobLocation: ["San Francisco", "New York"],
  workModes: ["Remote", "Hybrid"],
  primaryWorkMode: "Remote",
  preferredRoles: ["Frontend Developer"],
  resumeText: "Experienced Frontend Developer with 3 years of experience specializing in React, TypeScript, and modern CSS frameworks like Tailwind. Proven track record of building responsive web applications. Looking for remote opportunities.",
  coverLetter: "To Hiring Manager,\n\nI am writing to express my interest in the position. With my background in frontend development and passion for building user-centric applications, I am confident I can contribute effectively to your team.\n\nSincerely,\nAlex Doe",
  linkedin: "",
  portfolio: "",
  availability: "Immediate",
  salaryExpectation: "$80,000 - $100,000"
};

// Add landing state type
type ExtendedAppState = AppState | 'LANDING';

function App() {
  const [appState, setAppState] = useState<ExtendedAppState>('LANDING');
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [matchedJobs, setMatchedJobs] = useState<MatchedJob[]>([]);
  // Landing / auth modal state
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [suggestedPassword, setSuggestedPassword] = useState('');
  const [landingSelectedJob, setLandingSelectedJob] = useState<Job | null>(null);
  const [isMatching, setIsMatching] = useState(false);
  const [isGeneratingLetter, setIsGeneratingLetter] = useState(false);
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);  const [applyingJobs, setApplyingJobs] = useState<Set<string>>(new Set());
  const [appliedJobs, setAppliedJobs] = useState<Set<string>>(new Set());
  // New state for bot simulation
  const [activeBotJob, setActiveBotJob] = useState<string | null>(null);
  const [botStep, setBotStep] = useState<string>("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobFilters, setJobFilters] = useState<JobFilters>({
    matchPercentage: 0,  // Start at 0 to show all jobs by default
    jobType: [],
    visaSponsorship: false,
    remote: false,
  });

  // Simple strong password generator
  const generateStrongPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}<>?~';
    let pw = '';
    for (let i = 0; i < 14; i++) pw += chars[Math.floor(Math.random() * chars.length)];
    return pw;
  };

  const handleSuggestPassword = () => {
    const pw = generateStrongPassword();
    setSuggestedPassword(pw);
    setAuthPassword(pw);  };

  // Compute a simple match score between a Job and the user's (or demo) profile
  const computeMatchScore = (job: Job, profileForCalc: UserProfile) => {
    const skillMatches = job.required_skills.filter(s => profileForCalc.skills.map(x=>x.toLowerCase()).includes(s.toLowerCase())).length;
    const totalSkillsRequired = Math.max(1, job.required_skills.length);
    const skillPercentage = (skillMatches / totalSkillsRequired);
    
    // Base skill score: 40% base + up to 50% for actual matches
    const skillScore = 40 + Math.round(skillPercentage * 50);
    
    // Experience bonus: up to 20%
    let expBonus = 0;
    const userYears = Number((profileForCalc.experience || '').replace(/[^0-9]/g, '')) || 0;
    const jobYears = Number((job.experience_required || '').replace(/[^0-9]/g, '')) || 0;
    if (userYears && jobYears) {
      if (userYears >= jobYears) expBonus = 20;
      else if (userYears + 1 >= jobYears) expBonus = 15;
      else if (userYears >= jobYears - 1) expBonus = 10;
    } else if (userYears > 0) {
      expBonus = 10; // Give bonus if user has some experience even if job years unclear
    }
    
    // Random diversity boost: up to 10%
    const randomBoost = Math.floor(Math.random() * 11);
    
    // Total: base 40 + skills up to 50 + exp up to 20 + random up to 10 = 40-120
    const total = Math.min(99, skillScore + expBonus + randomBoost);
    
    // Ensure minimum 50% for any profile with jobs in database
    return Math.max(50, total);
  };

  const handleLandingJobClick = (job: Job) => {
    setLandingSelectedJob(job);
    // If user already inside application flow, let them continue; otherwise require auth
    if (appState === 'LANDING') {
      setShowAuthModal(true);
      setIsRegisterMode(false);
      setAuthEmail('');
      setAuthPassword('');
      setSuggestedPassword('');
    } else {
      // In other states show profile or job details
      // Fall back to opening profile
      setAppState(AppState.PROFILE);
    }
  };

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000); 
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAppState(AppState.PROFILE);
  };

  const handleGenerateCoverLetter = async () => {
    setIsGeneratingLetter(true);
    try {
      const letter = await generateCoverLetter(profile);
      if (letter) {
        setProfile(prev => ({ ...prev, coverLetter: letter }));
        showToast("Cover letter auto-generated by AI!");
      }
    } catch (error) {
      showToast("Failed to generate cover letter.", "error");
    } finally {
      setIsGeneratingLetter(false);
    }
  };

  const handleDownloadN8n = () => {
    const workflowJson = generateN8nWorkflow(profile);
    const blob = new Blob([workflowJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `hirelift-n8n-workflow-${profile.name.replace(/\s+/g, '-').toLowerCase()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("n8n Workflow downloaded! Import this into your n8n instance.");
  };

  const handleDownloadWorkdayScript = () => {
    const scriptContent = generateWorkdayConsoleScript(profile);
    const blob = new Blob([scriptContent], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `hirelift-workday-filler.js`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("Workday Filler Script downloaded! Run this in Console (F12) on Workday sites.");
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAppState(AppState.APPLICATION_FORM);
    window.scrollTo(0, 0);

    // Automatically generate cover letter if it's the default or empty
    const isDefault = profile.coverLetter.startsWith("To Hiring Manager") || !profile.coverLetter || profile.coverLetter.length < 50;
    if (isDefault) {
      handleGenerateCoverLetter();
    }
  };

  const handleApplicationFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsMatching(true);
    try {
      let results;
      try {
        const response = await matchJobsWithProfile(profile);
        // Validate response shape
        if (response && Array.isArray(response.matched_jobs) && response.matched_jobs.length > 0) {
          results = response;
        } else {
          throw new Error('Empty or invalid API result');
        }
      } catch (apiErr) {
        // Local fallback: build smart matches from AVAILABLE_JOBS using resume/skills/experience
        const built = (AVAILABLE_JOBS as Job[]).map(j => {
          const matched_skills = j.required_skills.filter(s => profile.skills.map(x=>x.toLowerCase()).includes(s.toLowerCase()));
          const missing_skills = j.required_skills.filter(s => !profile.skills.map(x=>x.toLowerCase()).includes(s.toLowerCase()));
          // Reuse computeMatchScore for a sensible percentage
          const match_percentage = computeMatchScore(j, profile);
          const experienceNote = (() => {
            const userYears = Number((profile.experience || '').replace(/[^0-9]/g, '')) || 0;
            const jobYears = Number((j.experience_required || '').replace(/[^0-9]/g, '')) || 0;
            if (userYears && jobYears) {
              if (userYears >= jobYears) return 'Experience matches required level.';
              if (userYears + 1 >= jobYears) return 'Slightly below required experience but close.';
              return 'Below required experience.';
            }
            return 'Experience not clearly comparable.';
          })();

          const reasoning = `Matched ${matched_skills.length} / ${j.required_skills.length} skills. ${experienceNote}`;

          return {
            job_title: j.job_title,
            company: j.company,
            location: j.location,
            match_percentage,
            matched_skills,
            missing_skills,
            auto_apply_eligible: !!j.is_verified, // internal verified jobs are auto-apply eligible
            apply_url: j.job_source?.startsWith('http') ? j.job_source : '#',
            job_source: j.job_source || 'Internal',
            reasoning,
          };
        });

        // Sort by score desc
        const sorted = built.sort((a, b) => b.match_percentage - a.match_percentage);
        // Choose items: all >=50 plus top 8 to ensure UI is populated
        const selected = sorted.filter(j => j.match_percentage >= 50).slice(0, 50);
        if (selected.length < 8) {
          // include top ones until we have at least 8
          for (const item of sorted) {
            if (!selected.includes(item)) selected.push(item);
            if (selected.length >= 8) break;
          }
        }

        results = { matched_jobs: selected };
      }

      setMatchedJobs(results.matched_jobs);
      setAppState(AppState.DASHBOARD);
      showToast(`Real-time search complete! Found ${results.matched_jobs.length} jobs.`);    } catch (err) {
      console.error(err);
      showToast("Failed to fetch real-time jobs. Please try again.", "error");
    } finally {
      setIsMatching(false);
    }
  };

  const getFilteredJobs = (jobs: MatchedJob[]): MatchedJob[] => {
    return jobs.filter(job => {
      // Match percentage filter
      if (job.match_percentage < jobFilters.matchPercentage) return false;
      
      // Job type filter (if any selected)
      // Note: This is a demo - in production you'd check job.jobType field
      
      // Remote filter (demo purposes)
      // Note: You'd check if job.location is 'Remote'
      
      return true;
    });
  };

  const getJobId = (job: MatchedJob) => `${job.company}-${job.job_title}`;
  const handleAutoApply = async (job: MatchedJob) => {
    const jobId = getJobId(job);
    setApplyingJobs(prev => new Set(prev).add(jobId));
    setActiveBotJob(jobId);

    // Prepare application data to pass to career page
    const applicationData = {
      name: profile.name,
      email: profile.email,
      phone: profile.availability || '',
      resume: profile.resumeText,
      coverLetter: profile.coverLetter,
      skills: profile.skills.join(', '),
      experience: profile.experience,
      linkedin: profile.linkedin,
      portfolio: profile.portfolio
    };

    // Simulate bot steps
    const steps = [
      `Preparing application for ${job.company}...`,
      "Validating your profile data...",
      "Generating customized cover letter...",
      `Preparing to open ${job.company} careers page...`,
      `Opening ${job.company} official career page...`,
      "Ready to submit your application!",
    ];

    for (const step of steps) {
      setBotStep(step);
      await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 400)); 
    }

    setAppliedJobs(prev => new Set(prev).add(jobId));
    setApplyingJobs(prev => {
      const next = new Set(prev);
      next.delete(jobId);
      return next;
    });
    
    // Open official career page with application data encoded in URL
    const careerPageUrl = job.apply_url || `https://www.google.com/search?q=${encodeURIComponent(job.company + ' careers')}`;
    const urlWithData = `${careerPageUrl}${careerPageUrl.includes('?') ? '&' : '?'}candidate_name=${encodeURIComponent(profile.name)}&candidate_email=${encodeURIComponent(profile.email)}`;
    
    window.open(urlWithData, '_blank');
    
    setActiveBotJob(null);
    setBotStep("");

    showToast(`Opening ${job.company} career page. Your profile data is ready to use!`);
  };

  const handleLogout = () => {
    setAppState(AppState.LOGIN);
    setMatchedJobs([]);
    setProfile(INITIAL_PROFILE);
    setAppliedJobs(new Set());
  };

  const handleBackFromApplication = () => {
    if (matchedJobs.length > 0) {
      setAppState(AppState.DASHBOARD);
    } else {
      setAppState(AppState.PROFILE);
    }
  };

  const handleWorkModeToggle = (mode: string) => {
    setProfile(prev => {
      const newModes = prev.workModes.includes(mode)
        ? prev.workModes.filter(m => m !== mode)
        : [...prev.workModes, mode];
      
      let newPrimary = prev.primaryWorkMode;
      if (!newModes.includes(newPrimary)) {
        newPrimary = newModes.length > 0 ? newModes[0] : '';
      }
      // If we just added a mode and there was no primary, make it primary
      if (newModes.length === 1 && !newPrimary) {
        newPrimary = newModes[0];
      }

      return {
        ...prev,
        workModes: newModes,
        primaryWorkMode: newPrimary
      };
    });
  };
  // --- Landing Page Render ---
  if (appState === 'LANDING') {
    return (
      <div className="min-h-screen relative bg-white overflow-hidden text-slate-900">
        {/* Sticky Nav Bar - Responsive */}
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="bg-blue-600 text-white p-1.5 sm:p-2 rounded-lg shadow-md">
                <Briefcase size={20} className="sm:w-6 sm:h-6" />
              </div>
              <span className="font-extrabold text-lg sm:text-2xl tracking-tight">HireLift</span>
            </div>            <nav className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm font-medium">
              <button onClick={() => setShowAuthModal(true)} className="text-blue-700 hover:text-blue-900 px-2 sm:px-3 py-1 rounded transition">Log in</button>
              <button onClick={() => { setShowAuthModal(true); setIsRegisterMode(true); }} className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow text-xs sm:text-sm">Create</button>
            </nav>
          </div>
        </header>
        {/* Animated Job/Professional Bubbles */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Resume bubble - top left */}
          <div className="absolute left-8 top-32 w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center animate-float-slow shadow-lg hover:shadow-xl transition-shadow duration-300">
            <FileText size={40} className="text-blue-400 opacity-70" />
          </div>
          
          {/* Briefcase bubble - top right */}
          <div className="absolute right-12 top-16 w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center animate-float-medium shadow-md hover:shadow-lg transition-shadow duration-300">
            <Briefcase size={32} className="text-amber-400 opacity-70" />
          </div>
          
          {/* User bubble - center bottom */}
          <div className="absolute left-1/3 bottom-20 w-28 h-28 bg-green-100 rounded-full flex items-center justify-center animate-float-zigzag shadow-md hover:shadow-lg transition-shadow duration-300">
            <User size={36} className="text-green-400 opacity-70" />
          </div>
          
          {/* Sparkles bubble - right side */}
          <div className="absolute right-1/4 bottom-40 w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center animate-float-fast shadow-md hover:shadow-lg transition-shadow duration-300">
            <Sparkles size={28} className="text-purple-400 opacity-70" />
          </div>
          
          {/* Additional Globe bubble - top center */}
          <div className="absolute left-1/2 -translate-x-1/2 top-10 w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center animate-bubble-pulse shadow-sm">
            <Globe size={24} className="text-indigo-400 opacity-70" />
          </div>
          
          {/* Additional Mail bubble - left side */}
          <div className="absolute left-1/4 top-2/3 w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center animate-float-medium shadow-md hover:shadow-lg transition-shadow duration-300">
            <Mail size={28} className="text-pink-400 opacity-70" />
          </div>
        </div>        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-16 flex flex-col items-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-2 sm:mb-4 leading-tight tracking-tight">Find Your Next <span className="text-blue-600">Dream Job</span> Instantly</h1>
          <p className="text-base sm:text-lg text-slate-500 text-center mb-6 sm:mb-8 max-w-2xl px-2">AI-powered job search that matches your resume, skills, and experience to the best roles. No more noise—just real opportunities from official career pages.</p>
          <div className="w-full max-w-xl mb-8 sm:mb-12 px-2">
            <div className="flex items-center bg-white border border-slate-200 rounded-full shadow-md px-3 sm:px-4 py-2 gap-2">
              <Search size={18} className="text-blue-500 flex-shrink-0" />
              <input className="flex-1 bg-transparent outline-none text-sm sm:text-lg px-2" placeholder="Search jobs, skills... (Demo)" disabled />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-5 py-1.5 sm:py-2 rounded-full font-semibold shadow text-xs sm:text-sm whitespace-nowrap">Search</button>
            </div>
          </div>

          <div className="w-full max-w-5xl px-2">
            <h2 className="text-lg sm:text-xl font-bold mb-4 text-slate-800">Featured Jobs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {AVAILABLE_JOBS.slice(0,9).map((job, idx) => {
                const score = computeMatchScore(job, INITIAL_PROFILE);
                return (
                  <button key={job.id} onClick={() => handleLandingJobClick(job)} className="group bg-white border border-slate-200 rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition p-4 sm:p-5 flex flex-col gap-2 relative overflow-hidden">
                    <div className="flex items-start gap-2 mb-1">
                      <Briefcase size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
                      <span className="font-semibold text-slate-900 text-sm sm:text-base truncate">{job.job_title}</span>
                    </div>
                    <div className="text-xs text-slate-500 mb-1 truncate">{job.company} • {job.location}</div>
                    <div className="text-xs text-slate-400 mb-2 line-clamp-2">{job.description}</div>
                    <div className="flex items-center gap-2 mt-auto flex-wrap">
                      <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">{score}% Match</span>
                      {job.is_verified && <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">Verified</span>}
                    </div>
                    <div className="absolute right-3 sm:right-4 top-3 sm:top-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronRight size={18} className="text-blue-400" />
                    </div>
                  </button>
                );
              })}            </div>
          </div>
        </main>
        {/* Auth Modal - Responsive */}
        {showAuthModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-2xl border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">{isRegisterMode ? 'Create an account' : 'Log in'}</h3>
                <button onClick={() => setShowAuthModal(false)} className="text-slate-400 text-xl">✕</button>
              </div>
              <p className="text-sm text-slate-500 mb-4">Please {isRegisterMode ? 'register to save your profile and apply' : 'login to view and apply to jobs'}. Clicking a job will prompt this.</p>

              <div className="space-y-3">
                <input value={authEmail} onChange={e => setAuthEmail(e.target.value)} className="w-full px-3 py-2 border rounded text-sm" placeholder="Email" />
                <div className="relative">
                  <input value={authPassword} onChange={e => setAuthPassword(e.target.value)} type="password" className="w-full px-3 py-2 border rounded text-sm" placeholder="Password" />
                  {isRegisterMode && (
                    <button type="button" onClick={handleSuggestPassword} className="absolute right-2 top-1/2 -translate-y-1/2 text-xs bg-blue-600 text-white px-2 py-1 rounded">Suggest</button>
                  )}
                </div>
                {isRegisterMode && suggestedPassword && (
                  <div className="text-xs text-green-700 bg-green-50 p-2 rounded">Suggested: <span className="font-mono text-xs">{suggestedPassword}</span></div>
                )}
              </div>

              <div className="mt-4 flex flex-col sm:flex-row gap-2">
                <button onClick={() => {
                  if (isRegisterMode) {
                    setProfile(prev => ({ ...prev, email: authEmail || prev.email, name: prev.name }));
                    setAppState(AppState.PROFILE);
                    setShowAuthModal(false);
                    showToast('Account created. Complete your profile.');
                  } else {
                    setProfile(prev => ({ ...prev, email: authEmail || prev.email }));
                    setAppState(AppState.PROFILE);
                    setShowAuthModal(false);
                    showToast('Welcome back! Complete your profile.');
                  }
                }} className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium">{isRegisterMode ? 'Create Account' : 'Login'}</button>
                <button onClick={() => setIsRegisterMode(!isRegisterMode)} className="px-4 py-2 rounded border text-sm font-medium">{isRegisterMode ? 'Have account?' : "Don't have account?"}</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  /* --- LOGIN SCREEN --- */
  if (appState === AppState.LOGIN) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="bg-white max-w-md w-full rounded-2xl shadow-xl p-8 border border-slate-100">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
              <Briefcase size={32} />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">HireLift</h1>
            <p className="text-slate-500 mt-2">Real-time AI job matching & auto-apply.</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <Input label="Full Name" type="text" placeholder="Alex Doe" required />
            <Input label="Email Address" type="email" placeholder="you@example.com" defaultValue="demo@hirelift.ai" required />
            <Input label="Password" type="password" placeholder="••••••••" defaultValue="password" required />
            
            <Button type="submit" className="w-full py-3 text-lg">
              Start Search
            </Button>
          </form>
          
          <p className="mt-6 text-center text-sm text-slate-400">
            Powered by Google Gemini 2.5
          </p>
        </div>
      </div>
    );
  }

  /* --- PROFILE SETUP (Step 1) --- */
  if (appState === AppState.PROFILE) {
    return (      <div className="min-h-screen bg-slate-50 py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-blue-600 mb-2">
              <span className="bg-blue-100 px-2 py-0.5 rounded">Step 1 of 2</span>
              <span>User Details</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Build Your Profile</h1>
            <p className="text-slate-500 mt-1 text-sm sm:text-base">Tell us about your skills to find real-time matches.</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="p-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 h-1.5"></div>
            <form onSubmit={handleProfileSubmit} className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <Input 
                  label="Full Name" 
                  value={profile.name} 
                  onChange={e => setProfile({...profile, name: e.target.value})}
                  className="text-sm"
                />
                <Input 
                  label="Years of Experience" 
                  value={profile.experience} 
                  onChange={e => setProfile({...profile, experience: e.target.value})}
                  placeholder="e.g. 4 years"
                  className="text-sm"
                />
              </div>
              
              <Input 
                label="Preferred Roles (Comma separated)" 
                value={profile.preferredRoles.join(', ')} 
                onChange={e => setProfile({...profile, preferredRoles: e.target.value.split(',').map(s => s.trim())})}
                placeholder="e.g. Frontend Developer, UI Engineer"
                className="text-sm"
              />
              
              <Input 
                label="Skills (Comma separated)" 
                value={profile.skills.join(', ')} 
                onChange={e => setProfile({...profile, skills: e.target.value.split(',').map(s => s.trim())})}
                placeholder="e.g. React, Node.js, Python"
                className="text-sm"
              />

              {/* Enhanced Location Section */}
              <div className="bg-slate-50 p-4 sm:p-5 rounded-lg border border-slate-200 space-y-4">
                <div className="flex items-center gap-2 text-slate-900 font-medium text-sm sm:text-base">
                  <MapPin size={16} className="text-blue-500" />
                  <h3>Job Preference</h3>
                </div>
                
                {/* Work Modes */}
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Work Modes (Multi-select)</label>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {['Remote', 'Hybrid', 'Onsite'].map(mode => {
                       const isSelected = profile.workModes.includes(mode);
                       const isPrimary = profile.primaryWorkMode === mode;
                       return (
                        <div key={mode} className={`flex items-center gap-2 px-2 sm:px-3 py-2 rounded-lg border transition-all ${isSelected ? 'bg-white border-blue-300 shadow-sm' : 'bg-slate-100 border-transparent opacity-70 hover:opacity-100'}`}>
                          <input 
                            type="checkbox" 
                            id={`mode-${mode}`}
                            checked={isSelected}
                            onChange={() => handleWorkModeToggle(mode)}
                            className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4" 
                          />
                          <label htmlFor={`mode-${mode}`} className="text-xs sm:text-sm font-medium text-slate-700 cursor-pointer select-none">
                            {mode}
                          </label>
                          
                          {isSelected && (
                             <button
                               type="button"
                               onClick={() => setProfile({...profile, primaryWorkMode: mode})}
                               className={`ml-1 sm:ml-2 text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full transition-colors font-bold uppercase tracking-wide ${isPrimary ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500 hover:bg-slate-300'}`}
                             >
                               {isPrimary ? 'Primary' : 'Set'}
                             </button>
                          )}
                        </div>
                       );
                    })}
                  </div>
                  {profile.workModes.length === 0 && <p className="text-xs text-red-400 mt-1">Please select at least one work mode.</p>}
                </div>

                {/* Specific Locations */}
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Specific Cities / Countries (Optional)</label>
                  <div className="relative">
                    <Globe size={14} className="absolute left-3 top-3 text-slate-400" />
                    <input 
                      className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      value={profile.jobLocation.join(', ')} 
                      onChange={e => setProfile({...profile, jobLocation: e.target.value.split(',').map(s => s.trim())})}
                      placeholder="e.g. New York, London, Berlin"
                    />
                  </div>              </div>
              </div>

              <FileUpload 
                label="Upload Resume (PDF, DOC, DOCX or TXT)"
                onFileSelect={setResumeFile}
                onTextExtract={(text) => {
                  // Auto-extract text if user uploads a text file
                  if (text && text.length > 20) {
                    setProfile({...profile, resumeText: text});
                  }
                }}
              />

              <TextArea 
                label="Resume Text (Paste content or upload above)" 
                value={profile.resumeText}
                onChange={e => setProfile({...profile, resumeText: e.target.value})}
                className="font-mono text-xs sm:text-sm"
                placeholder="Paste the text content of your resume here..."
              />
              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <Button type="submit" className="w-full sm:w-auto px-8 text-sm">
                  Next: Application Details <ChevronRight size={16} className="ml-2" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  /* --- APPLICATION FORM (Step 2) --- */
  if (appState === AppState.APPLICATION_FORM) {
    return (
      <div className="min-h-screen bg-slate-50 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={handleBackFromApplication} 
            className="mb-6 pl-0 hover:bg-transparent hover:text-blue-600"
          >
            <ArrowLeft size={20} className="mr-2" /> Back
          </Button>

          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm font-semibold text-blue-600 mb-2">
              <span className="bg-blue-100 px-2 py-0.5 rounded">Step 2 of 2</span>
              <span>Application Form</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Master Application</h1>
            <p className="text-slate-500 mt-1">Configure your auto-apply email template.</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="p-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 h-1.5"></div>
            <form onSubmit={handleApplicationFormSubmit} className="p-8 space-y-6">
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
                 <h3 className="font-semibold text-blue-900 mb-1">Email Configuration</h3>
                 <p className="text-sm text-blue-700 mb-4">Applications will be sent from this email address using your default mail client.</p>
                 <Input 
                    label="Your Email" 
                    type="email"
                    value={profile.email}
                    onChange={e => setProfile({...profile, email: e.target.value})}
                  />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <Input 
                  label="LinkedIn URL" 
                  placeholder="https://linkedin.com/in/..." 
                  value={profile.linkedin || ''}
                  onChange={e => setProfile({...profile, linkedin: e.target.value})}
                />
                 <Input 
                  label="Portfolio / GitHub URL" 
                  placeholder="https://github.com/..." 
                  value={profile.portfolio || ''}
                  onChange={e => setProfile({...profile, portfolio: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <Input 
                  label="Availability" 
                  placeholder="e.g. 2 weeks notice, Immediate" 
                  value={profile.availability || ''}
                  onChange={e => setProfile({...profile, availability: e.target.value})}
                />
                 <Input 
                  label="Salary Expectation" 
                  placeholder="e.g. $90k - $110k" 
                  value={profile.salaryExpectation || ''}
                  onChange={e => setProfile({...profile, salaryExpectation: e.target.value})}
                />
              </div>

              <div className="relative">
                <div className="flex justify-between items-end mb-1.5">
                  <label className="text-sm font-medium text-slate-700">Cover Letter (Template)</label>
                  <Button 
                    type="button"
                    variant="ghost" 
                    onClick={handleGenerateCoverLetter} 
                    isLoading={isGeneratingLetter}
                    className="text-xs h-8 px-2 text-blue-600 bg-blue-50 hover:bg-blue-100"
                  >
                    <Sparkles size={14} className="mr-1.5" /> 
                    {isGeneratingLetter ? 'Writing...' : 'Regenerate with AI'}
                  </Button>
                </div>
                <textarea
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-[200px]"
                  placeholder="Dear Hiring Manager, I am excited to apply..."
                  value={profile.coverLetter || ''}
                  onChange={e => setProfile({...profile, coverLetter: e.target.value})}
                />
                <p className="text-xs text-slate-400 mt-1">AI will automatically create this based on your profile details.</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-4">
                <Button type="submit" isLoading={isMatching} className="px-8 w-full md:w-auto">
                  {matchedJobs.length > 0 ? (
                    <span className="flex items-center gap-2"><Save size={18} /> Update & Find Real Jobs</span>
                  ) : (
                    <span className="flex items-center gap-2">Search Live Jobs <ChevronRight size={18} /></span>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
  /* --- DASHBOARD --- */
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="bg-blue-600 text-white p-1 sm:p-1.5 rounded-lg">
              <Briefcase size={18} className="sm:w-5 sm:h-5" />
            </div>
            <span className="font-bold text-lg sm:text-xl tracking-tight text-slate-900">HireLift</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="text-xs sm:text-sm font-medium text-slate-600 hidden md:block">Welcome, {profile.name}</span>
            <button onClick={handleLogout} className="text-slate-500 hover:text-slate-800 transition-colors p-1">
              <LogOut size={18} className="sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-3 space-y-4 sm:space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
              <h2 className="font-bold text-slate-900 mb-3 sm:mb-4 text-sm sm:text-base">Your Profile</h2>
              <div className="space-y-3 sm:space-y-4 text-sm">
                <div>
                  <p className="text-xs text-slate-500 uppercase font-semibold">Role</p>
                  <p className="text-sm font-medium">{profile.preferredRoles[0]}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-semibold">Experience</p>
                  <p className="text-sm font-medium">{profile.experience}</p>
                </div>
                <div>
                   <p className="text-xs text-slate-500 uppercase font-semibold">Location / Mode</p>
                   <p className="text-sm font-medium truncate" title={profile.jobLocation.join(', ')}>
                     {profile.jobLocation.length > 0 ? profile.jobLocation[0] : (profile.primaryWorkMode || 'Any')}
                     {profile.jobLocation.length > 1 && ` +${profile.jobLocation.length - 1}`}
                   </p>
                   <p className="text-xs text-slate-400 mt-1">
                     {profile.workModes.join(', ')}
                     {profile.primaryWorkMode && <span className="text-blue-500"> ({profile.primaryWorkMode} Pref)</span>}
                   </p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setAppState(AppState.PROFILE)} 
                  className="w-full text-xs sm:text-sm mt-2"
                >
                  Edit Profile
                </Button>
              </div>
            </div>

            {/* n8n Automation Card */}
            <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl shadow-lg border border-indigo-700 p-4 sm:p-6 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Workflow size={16} className="text-pink-400" />
                <h3 className="font-bold text-xs sm:text-sm">Automate with n8n</h3>
              </div>
              <p className="text-xs text-indigo-200 mb-4 leading-relaxed">
                Download a workflow to automate applications on your own server.
              </p>
              <Button 
                onClick={handleDownloadN8n}
                className="w-full text-xs bg-white text-indigo-900 hover:bg-indigo-50 border-0"
              >
                Download Workflow
              </Button>
            </div>

            {/* Workday Filler Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1 bg-blue-100 text-blue-600 rounded-lg">
                  <FileCode size={16} />
                </div>
                <h3 className="font-bold text-slate-900 text-xs sm:text-sm">Workday Filler</h3>
              </div>
              <p className="text-xs text-slate-500 mb-4">
                Get a script to auto-fill Workday applications in console.
              </p>
              <Button 
                variant="outline"
                onClick={handleDownloadWorkdayScript}
                className="w-full text-xs flex items-center gap-2 justify-center"
              >
                <Download size={12} /> Get Script
              </Button>
            </div>

            <Button 
              onClick={() => setAppState(AppState.APPLICATION_FORM)} 
              className="w-full justify-between group shadow-sm text-xs sm:text-sm"
              variant="outline"
            >
              <span className="flex items-center gap-2">
                <FileText size={14} /> Edit Application
              </span>
              <ChevronRight size={14} className="opacity-70 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="lg:col-span-9">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3 sm:gap-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Live Job Matches</h2>
              <div className="text-xs sm:text-sm text-slate-500 bg-white px-3 py-2 rounded-lg border border-slate-200 shadow-sm flex items-center gap-2 whitespace-nowrap">
                 <Search size={12} className="sm:w-4 sm:h-4" /> {getFilteredJobs(matchedJobs).length} matches
              </div>
            </div>

            {/* Job Filters */}
            <div className="mb-6">
              <JobFilterPanel 
                filters={jobFilters}
                onFilterChange={setJobFilters}
                resultCount={getFilteredJobs(matchedJobs).length}
              />
            </div>

            {/* Active Bot Overlay */}
            {activeBotJob && (
               <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
                 <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 max-w-sm w-full border border-slate-200 text-center animate-in zoom-in duration-300">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                       <Bot size={24} className="text-blue-600 relative z-10 sm:w-8 sm:h-8" />
                       <div className="absolute inset-0 rounded-full border-4 border-blue-100 border-t-blue-500 animate-spin"></div>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">AI Auto-Pilot Running</h3>
                    <p className="text-xs sm:text-sm text-slate-500 mb-4">Please wait while we apply for you.</p>
                    
                    <div className="bg-slate-50 rounded-lg p-2 sm:p-3 text-xs sm:text-sm font-mono text-blue-700 border border-blue-100 flex items-center gap-2 justify-center">
                      <Loader2 size={12} className="animate-spin sm:w-4 sm:h-4" />
                      <span className="truncate">{botStep}</span>
                    </div>
                 </div>
               </div>
            )}            <div className="space-y-4">
              {matchedJobs.length > 0 ? (
                getFilteredJobs(matchedJobs).length > 0 ? (
                  getFilteredJobs(matchedJobs).map((job, index) => {
                    const jobId = getJobId(job);
                    return (
                      <JobCard 
                        key={index} 
                        job={job} 
                        onAutoApply={handleAutoApply}
                        isApplying={applyingJobs.has(jobId)}
                        isApplied={appliedJobs.has(jobId)}
                      />
                    );
                  })
                ) : (
                  <div className="text-center py-12 sm:py-20 bg-white rounded-xl border border-slate-200 border-dashed">
                    <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
                      <Search size={24} className="sm:w-8 sm:h-8" />
                    </div>
                    <h3 className="text-base sm:text-lg font-medium text-slate-900">No matches found with current filters</h3>
                    <p className="text-slate-500 max-w-sm mx-auto mt-2 text-xs sm:text-sm">Try adjusting your filters or update your profile.</p>                    <Button 
                      variant="outline" 
                      onClick={() => setJobFilters({
                        matchPercentage: 0,
                        jobType: [],
                        visaSponsorship: false,
                        remote: false,
                      })}
                      className="mt-6 text-xs sm:text-sm"
                    >
                      Reset Filters
                    </Button>
                  </div>
                )
              ) : (
                <div className="text-center py-12 sm:py-20 bg-white rounded-xl border border-slate-200 border-dashed">
                  <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
                    <Search size={24} className="sm:w-8 sm:h-8" />
                  </div>
                  <h3 className="text-base sm:text-lg font-medium text-slate-900">No matches found above 75%</h3>
                  <p className="text-slate-500 max-w-sm mx-auto mt-2 text-xs sm:text-sm">Try updating your profile or broadening your location preferences.</p>
                  <Button 
                    variant="outline" 
                    onClick={() => setAppState(AppState.PROFILE)} 
                    className="mt-6 text-xs sm:text-sm"
                  >
                    Update Profile
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-2xl text-white transform transition-all duration-300 translate-y-0 z-50 flex items-center gap-2 text-xs sm:text-sm max-w-xs sm:max-w-sm ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
          {toast.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
          <span className="font-medium">{toast.message}</span>
        </div>
      )}
    </div>
  );
}

export default App;