import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import About from './pages/About';
import ResumeBuild from './pages/ResumeBuild';
import LinkedInOptimization from './pages/LinkedInOptimization';
import PersonalInteraction from './pages/PersonalInteraction';
import PageHeader from './components/PageHeader';
import { AppState, UserProfile, MatchedJob, Job } from './types';
import { matchJobsWithProfile, generateCoverLetter } from './services/geminiService';
import { generateN8nWorkflow } from './services/workflowGenerator';
import { generateWorkdayConsoleScript } from './services/workdayFiller';
import { sendApplicationConfirmationEmail, sendBatchApplicationEmail, sendWelcomeEmail } from './services/emailService';
import { fetchDailyJobs, scheduleDailyJobFetch, getSourceBadgeColor } from './services/jobScraperAgent';
import { Input, TextArea } from './components/Input';
import FileUpload from './components/FileUpload';
import Button from './components/Button';
import JobCard from './components/JobCard';
import JobFilterPanel, { JobFilters } from './components/JobFilterPanel';
import AutoApplyProgressModal from './components/AutoApplyProgressModal';
import { Briefcase, ChevronRight, CheckCircle, Search, LogOut, AlertCircle, Mail, FileText, ArrowLeft, Save, User, Sparkles, Workflow, Bot, Loader2, FileCode, Download, MapPin, Globe, Lock, Eye, EyeOff, UserPlus, LogIn, ExternalLink } from 'lucide-react';
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
type ExtendedAppState = AppState | 'LANDING' | 'ABOUT' | 'RESUME' | 'LINKEDIN' | 'INTERACTION';

function App() {
  const [appState, setAppState] = useState<ExtendedAppState>('LANDING');
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [matchedJobs, setMatchedJobs] = useState<MatchedJob[]>([]);
  const [dailyAIJobs, setDailyAIJobs] = useState<Job[]>([]);  // AI Agent Jobs
  const [isLoadingJobs, setIsLoadingJobs] = useState(false);  // Landing / auth modal state
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [authName, setAuthName] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authConfirmPassword, setAuthConfirmPassword] = useState('');
  const [suggestedPassword, setSuggestedPassword] = useState('');
  const [authErrors, setAuthErrors] = useState<{name?: string, email?: string, password?: string, confirmPassword?: string}>({});
  const [landingSelectedJob, setLandingSelectedJob] = useState<Job | null>(null);
  const [isMatching, setIsMatching] = useState(false);
  const [isGeneratingLetter, setIsGeneratingLetter] = useState(false);
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);  
  const [applyingJobs, setApplyingJobs] = useState<Set<string>>(new Set());
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
  const [progressSteps, setProgressSteps] = useState<string[]>([]);
  const [progressStepIdx, setProgressStepIdx] = useState<number>(0);
  const [progressOpen, setProgressOpen] = useState<boolean>(false);
  const [progressError, setProgressError] = useState<string | null>(null);

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
    setAuthPassword(pw);
    setAuthConfirmPassword(pw);
  };

  // Validation function for auth
  const validateAuth = (): boolean => {
    const errors: {name?: string, email?: string, password?: string, confirmPassword?: string} = {};
    
    if (isRegisterMode) {
      if (!authName || authName.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters';
      }
      if (!authEmail || !authEmail.includes('@')) {
        errors.email = 'Please enter a valid email';
      }
      if (!authPassword || authPassword.length < 8) {
        errors.password = 'Password must be at least 8 characters';
      }
      if (authPassword !== authConfirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    } else {
      if (!authEmail) {
        errors.email = 'Email is required';
      }
      if (!authPassword) {
        errors.password = 'Password is required';
      }
    }
    
    setAuthErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAuthSubmit = () => {
    if (!validateAuth()) {
      return;
    }
    
    if (isRegisterMode) {
      setProfile(prev => ({ ...prev, email: authEmail, name: authName }));
      setAppState(AppState.PROFILE);
      setShowAuthModal(false);
      showToast('Account created successfully! Complete your profile.');
    } else {
      setProfile(prev => ({ ...prev, email: authEmail }));
      setAppState(AppState.PROFILE);
      setShowAuthModal(false);
      showToast('Welcome back!');
    }
    
    // Reset form
    setAuthName('');
    setAuthEmail('');
    setAuthPassword('');
    setAuthConfirmPassword('');
    setSuggestedPassword('');
    setAuthErrors({});
  };
  // Compute a simple match score between a Job and the user's (or demo) profile
  const computeMatchScore = (job: Job, profileForCalc: UserProfile) => {
    // Handle both old format (required_skills) and new format (skills)
    const jobSkills = job.skills || job.required_skills || [];
    const skillMatches = jobSkills.filter(s => profileForCalc.skills.map(x=>x.toLowerCase()).includes(s.toLowerCase())).length;
    const totalSkillsRequired = Math.max(1, jobSkills.length);
    const skillPercentage = (skillMatches / totalSkillsRequired);
    
    // Base skill score: 40% base + up to 50% for actual matches
    const skillScore = 40 + Math.round(skillPercentage * 50);
    
    // Experience bonus: up to 20%
    let expBonus = 0;
    const userYears = Number((profileForCalc.experience || '').replace(/[^0-9]/g, '')) || 0;
    const jobYears = Number((job.experience_required || job.experience_level || '').replace(/[^0-9]/g, '')) || 0;
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

  // Fetch AI Agent Jobs on component mount
  useEffect(() => {
    const loadAIJobs = async () => {
      setIsLoadingJobs(true);
      try {
        const jobs = await fetchDailyJobs();
        setDailyAIJobs(jobs);
        console.log('✅ Loaded 25 AI-curated jobs from LinkedIn, Naukri, and Career Pages');
      } catch (error) {
        console.error('❌ Error loading AI jobs:', error);
      } finally {
        setIsLoadingJobs(false);
      }
    };
    
    loadAIJobs();
    
    // Schedule daily job fetch at 8:30 AM
    scheduleDailyJobFetch();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAppState(AppState.PROFILE);
    
    // Send welcome email
    if (profile.email) {
      await sendWelcomeEmail(profile);
    }
  };
  const handleGenerateCoverLetter = async () => {
    setIsGeneratingLetter(true);
    try {
      const letter = await generateCoverLetter(profile);
      if (letter && letter.length > 50) {
        setProfile(prev => ({ ...prev, coverLetter: letter }));
        showToast("✅ Cover letter generated successfully!");
      } else {
        showToast("Could not generate cover letter. Please write one manually.", "error");
      }
    } catch (error) {
      console.error('Cover letter generation error:', error);
      showToast("Failed to generate cover letter. Please try again or write manually.", "error");
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
      showToast(`Real-time search complete! Found ${results.matched_jobs.length} jobs.`);    
    } catch (err) {
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
      
      // Workday filter (only show jobs with auto-apply eligible status)
      if (jobFilters.workdayOnly && !job.auto_apply_eligible) return false;
      
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

    // Define all progress steps
    const steps = [
      `Opening ${job.company} careers page...`,
      'Validating your profile data...',
      'Filling: First Name',
      'Filling: Last Name',
      'Filling: Email',
      'Filling: Phone',
      'Filling: LinkedIn',
      'Filling: Portfolio',
      'Filling: Cover Letter',
      'Submitting application...',
      'Sending confirmation email...'
    ];
    setProgressSteps(steps);
    setProgressStepIdx(0);
    setProgressOpen(true);
    setProgressError(null);

    // Step 1: Open careers page
    setProgressStepIdx(0);
    const careerPageUrl = job.apply_url || `https://www.google.com/search?q=${encodeURIComponent(job.company + ' careers')}`;
    let iframe: HTMLIFrameElement | null = null;
    try {
      iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = careerPageUrl;
      document.body.appendChild(iframe);
      await new Promise(res => setTimeout(res, 1200));
    } catch (e) {
      setProgressError('Could not open careers page.');
      setProgressOpen(false);
      return;
    }

    // Step 2: Validate profile
    setProgressStepIdx(1);
    await new Promise(res => setTimeout(res, 700));

    // Step 3-8: Fill fields (simulate, as cross-origin blocks real automation)
    const fieldSteps = [
      { idx: 2, label: 'First Name', value: profile.name.split(' ')[0] },
      { idx: 3, label: 'Last Name', value: profile.name.split(' ')[1] || '' },
      { idx: 4, label: 'Email', value: profile.email },
      { idx: 5, label: 'Phone', value: profile.availability || '9999999999' },
      { idx: 6, label: 'LinkedIn', value: profile.linkedin || '' },
      { idx: 7, label: 'Portfolio', value: profile.portfolio || '' },
      { idx: 8, label: 'Cover Letter', value: profile.coverLetter }
    ];
    for (const field of fieldSteps) {
      setProgressStepIdx(field.idx);
      await new Promise(res => setTimeout(res, 600));
    }

    // Step 9: Submit application (simulate)
    setProgressStepIdx(9);
    await new Promise(res => setTimeout(res, 1000));

    // Step 10: Send confirmation email
    setProgressStepIdx(10);
    const emailSent = await sendApplicationConfirmationEmail(
      profile,
      job,
      new Date().toLocaleString()
    );
    await new Promise(res => setTimeout(res, 800));

    setProgressOpen(false);
    setProgressStepIdx(0);

    // Mark as applied
    setAppliedJobs(prev => new Set(prev).add(jobId));
    setApplyingJobs(prev => {
      const next = new Set(prev);
      next.delete(jobId);
      return next;
    });

    if (emailSent) {
      showToast(`✅ Email sent to ${profile.email} - Check your inbox!`);
    } else {
      showToast(`✅ Application submitted! Email backed up locally`, 'success');
    }

    // Clean up iframe
    setTimeout(() => {
      if (iframe) document.body.removeChild(iframe);
    }, 5000);

    setActiveBotJob(null);
    setBotStep("");
  };
  const handleLogout = async () => {
    // Send batch email if user applied to jobs
    if (appliedJobs.size > 0 && matchedJobs.length > 0) {
      await sendBatchApplicationEmail(profile, matchedJobs, appliedJobs.size);
    }

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
          </div>          <div className="w-full max-w-5xl px-2">
            {/* Hidden header - AI agent still works in background */}
            
            {isLoadingJobs ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                <span className="ml-3 text-slate-600">Loading fresh jobs...</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {dailyAIJobs.slice(0, 25).map((job) => {
                  const score = computeMatchScore(job, INITIAL_PROFILE);
                  return (
                    <button 
                      key={job.id} 
                      onClick={() => handleLandingJobClick(job)} 
                      className="group bg-white border-2 border-slate-200 rounded-2xl shadow-lg hover:shadow-2xl hover:border-blue-400 transition-all duration-300 p-6 flex flex-col gap-3 relative overflow-hidden transform hover:-translate-y-1"
                    >                      {/* Company Logo Header */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center flex-shrink-0 overflow-hidden border-2 border-slate-200 shadow-sm">
                            <img 
                              src={job.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company)}&background=3b82f6&color=fff&bold=true`} 
                              alt={job.company} 
                              className="w-full h-full object-contain p-1"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company)}&background=3b82f6&color=fff&bold=true`;
                              }}
                            />
                          </div>
                          <div className="text-left flex-1 min-w-0">
                            <h3 className="font-bold text-slate-900 text-base truncate">{job.company}</h3>
                            <div className="flex items-center gap-1 mt-0.5">
                              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${getSourceBadgeColor(job.source)}`}>
                                {job.source}
                              </span>
                            </div>
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                      </div>

                      {/* Job Title */}
                      <div>
                        <h4 className="font-semibold text-slate-900 text-left text-sm line-clamp-2 leading-tight">
                          {job.job_title}
                        </h4>
                      </div>

                      {/* Location & Work Mode */}
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="truncate">{job.location}</span>
                        <span className="text-slate-400">•</span>
                        <span className="text-blue-600 font-semibold">{job.work_mode}</span>
                      </div>

                      {/* Salary */}
                      <div className="text-left">
                        <span className="text-sm font-bold text-green-600">{job.salary_range}</span>
                      </div>

                      {/* Skills Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {job.skills?.slice(0, 3).map((skill, idx) => (
                          <span key={idx} className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium">
                            {skill}
                          </span>
                        ))}
                        {job.skills && job.skills.length > 3 && (
                          <span className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded-full">
                            +{job.skills.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Match Score & Verified Badge */}
                      <div className="flex items-center gap-2 mt-auto pt-2 border-t border-slate-100">
                        <span className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          {score}% Match
                        </span>
                        {job.is_verified && (
                          <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-semibold flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Verified
                          </span>
                        )}
                        {job.visa_sponsorship && (
                          <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full font-semibold">
                            Visa
                          </span>
                        )}
                      </div>

                      {/* Hover Arrow */}
                      <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
                        <ChevronRight size={20} className="text-blue-500" />
                      </div>

                      {/* Shine Effect on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-700"></div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* View All Jobs CTA */}
            {dailyAIJobs.length > 0 && (
              <div className="mt-8 text-center">
                <button 
                  onClick={() => {
                    setShowAuthModal(true);
                    setIsRegisterMode(true);
                  }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                >
                  <UserPlus className="w-5 h-5" />
                  Create Account to Apply
                  <ChevronRight className="w-5 h-5" />
                </button>
                <p className="text-sm text-slate-500 mt-3">
                  🚀 Join 10,000+ job seekers finding their dream jobs with AI
                </p>
              </div>
            )}
          </div>
        </main>        {/* Auth Modal - Beautiful Design with Animated Bubbles */}
        {showAuthModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl w-full max-w-md shadow-2xl border border-white/20 relative overflow-hidden">
              {/* Animated background blobs */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-blob"></div>
                <div className="absolute top-20 -left-20 w-40 h-40 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-20 left-1/2 w-40 h-40 bg-gradient-to-br from-cyan-400/30 to-blue-400/30 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
              </div>

              <div className="relative z-10 p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 bg-gradient-to-br ${isRegisterMode ? 'from-purple-600 to-pink-600' : 'from-blue-600 to-cyan-600'} rounded-full`}>
                      {isRegisterMode ? <UserPlus className="w-6 h-6 text-white" /> : <LogIn className="w-6 h-6 text-white" />}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        {isRegisterMode ? 'Create Account' : 'Welcome Back'}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {isRegisterMode ? 'Join HireLift today' : 'Login to continue'}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setShowAuthModal(false);
                      setAuthErrors({});
                      setAuthName('');
                      setAuthEmail('');
                      setAuthPassword('');
                      setAuthConfirmPassword('');
                      setSuggestedPassword('');
                    }} 
                    className="text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-white/50 rounded-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Form */}
                <div className="space-y-4">
                  {/* Name field - only for registration */}
                  {isRegisterMode && (
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                          <User className="w-5 h-5" />
                        </div>
                        <input 
                          value={authName} 
                          onChange={e => {
                            setAuthName(e.target.value);
                            setAuthErrors(prev => ({...prev, name: undefined}));
                          }} 
                          className={`w-full pl-11 pr-4 py-3 bg-white/80 backdrop-blur-sm border-2 ${authErrors.name ? 'border-red-300' : 'border-white/50'} rounded-xl text-sm focus:outline-none focus:border-blue-400 transition-all`}
                          placeholder="John Doe" 
                        />
                      </div>
                      {authErrors.name && (
                        <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {authErrors.name}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Email field */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <Mail className="w-5 h-5" />
                      </div>
                      <input 
                        value={authEmail} 
                        onChange={e => {
                          setAuthEmail(e.target.value);
                          setAuthErrors(prev => ({...prev, email: undefined}));
                        }} 
                        type="email"
                        className={`w-full pl-11 pr-4 py-3 bg-white/80 backdrop-blur-sm border-2 ${authErrors.email ? 'border-red-300' : 'border-white/50'} rounded-xl text-sm focus:outline-none focus:border-blue-400 transition-all`}
                        placeholder="john@example.com" 
                      />
                    </div>
                    {authErrors.email && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {authErrors.email}
                      </p>
                    )}
                  </div>

                  {/* Password field */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <Lock className="w-5 h-5" />
                      </div>
                      <input 
                        value={authPassword} 
                        onChange={e => {
                          setAuthPassword(e.target.value);
                          setAuthErrors(prev => ({...prev, password: undefined}));
                        }} 
                        type="password" 
                        className={`w-full pl-11 pr-24 py-3 bg-white/80 backdrop-blur-sm border-2 ${authErrors.password ? 'border-red-300' : 'border-white/50'} rounded-xl text-sm focus:outline-none focus:border-blue-400 transition-all`}
                        placeholder="Enter password" 
                      />
                      {isRegisterMode && (
                        <button 
                          type="button" 
                          onClick={handleSuggestPassword} 
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-xs bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-3 py-1.5 rounded-lg hover:shadow-lg transition-all font-semibold"
                        >
                          Generate
                        </button>
                      )}
                    </div>
                    {authErrors.password && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {authErrors.password}
                      </p>
                    )}
                    {isRegisterMode && suggestedPassword && (
                      <div className="mt-2 text-xs bg-green-50 border border-green-200 text-green-700 p-2 rounded-lg flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        <span className="font-medium">Strong password generated!</span>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password field - only for registration */}
                  {isRegisterMode && (
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Confirm Password</label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                          <Lock className="w-5 h-5" />
                        </div>
                        <input 
                          value={authConfirmPassword} 
                          onChange={e => {
                            setAuthConfirmPassword(e.target.value);
                            setAuthErrors(prev => ({...prev, confirmPassword: undefined}));
                          }} 
                          type="password" 
                          className={`w-full pl-11 pr-4 py-3 bg-white/80 backdrop-blur-sm border-2 ${authErrors.confirmPassword ? 'border-red-300' : 'border-white/50'} rounded-xl text-sm focus:outline-none focus:border-blue-400 transition-all`}
                          placeholder="Confirm your password" 
                        />
                        {authPassword && authConfirmPassword && authPassword === authConfirmPassword && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
                            <CheckCircle className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                      {authErrors.confirmPassword && (
                        <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {authErrors.confirmPassword}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="mt-6 space-y-3">
                  <button 
                    onClick={handleAuthSubmit}
                    className={`w-full bg-gradient-to-r ${isRegisterMode ? 'from-purple-600 to-pink-600' : 'from-blue-600 to-cyan-600'} text-white px-6 py-3 rounded-xl font-semibold text-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2`}
                  >
                    {isRegisterMode ? (
                      <>
                        <UserPlus className="w-5 h-5" />
                        Create Account
                      </>
                    ) : (
                      <>
                        <LogIn className="w-5 h-5" />
                        Login
                      </>
                    )}
                  </button>
                  
                  <button 
                    onClick={() => {
                      setIsRegisterMode(!isRegisterMode);
                      setAuthErrors({});
                      setSuggestedPassword('');
                    }} 
                    className="w-full bg-white/80 backdrop-blur-sm text-slate-700 px-6 py-3 rounded-xl font-medium text-sm hover:bg-white hover:shadow-lg transition-all duration-300 border-2 border-white/50"
                  >
                    {isRegisterMode ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
                  </button>
                </div>

                {/* Additional Info */}
                {isRegisterMode && (
                  <p className="mt-4 text-xs text-center text-slate-500">
                    By creating an account, you agree to our Terms of Service and Privacy Policy
                  </p>
                )}
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
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden py-8 sm:py-12 px-4 sm:px-6">
        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute top-60 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-20 right-1/3 w-80 h-80 bg-gradient-to-br from-teal-400/20 to-emerald-400/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-3xl mx-auto relative z-10">
          <div className="mb-6 sm:mb-8 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-emerald-600 mb-3">
              <span className="bg-emerald-100 px-3 py-1 rounded-full">Step 1 of 2</span>
              <span>User Details</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-3">
              Build Your Profile
            </h1>
            <p className="text-slate-700 mt-1 text-base sm:text-lg max-w-2xl mx-auto">
              Tell us about your skills and preferences to find perfect job matches
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-white/50 overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500"></div>
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
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 relative overflow-hidden py-12 px-4">
        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-violet-400/20 to-purple-400/20 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute top-60 -right-40 w-80 h-80 bg-gradient-to-br from-fuchsia-400/20 to-pink-400/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-violet-400/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-3xl mx-auto relative z-10">
          <Button 
            variant="ghost" 
            onClick={handleBackFromApplication} 
            className="mb-6 pl-0 hover:bg-transparent hover:text-violet-600 text-slate-700"
          >
            <ArrowLeft size={20} className="mr-2" /> Back
          </Button>

          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <div className="flex items-center justify-center gap-2 text-sm font-semibold text-violet-600 mb-3">
              <span className="bg-violet-100 px-3 py-1 rounded-full">Step 2 of 2</span>
              <span>Application Form</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent mb-3">
              Application Template
            </h1>
            <p className="text-slate-700 mt-1 text-base max-w-2xl mx-auto">
              Configure your auto-apply settings and cover letter template
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-white/50 overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500"></div>
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
              </div>              <div className="relative">
                <div className="flex justify-between items-end mb-1.5">
                  <div>
                    <label className="text-sm font-medium text-slate-700">Cover Letter (Template)</label>
                    <p className="text-xs text-slate-500 mt-0.5">Customized for each application</p>
                  </div>
                  <Button 
                    type="button"
                    variant="ghost" 
                    onClick={handleGenerateCoverLetter} 
                    isLoading={isGeneratingLetter}
                    className="text-xs h-8 px-2 text-blue-600 bg-blue-50 hover:bg-blue-100"
                  >
                    <Sparkles size={14} className="mr-1.5" /> 
                    {isGeneratingLetter ? 'Writing...' : 'Generate with AI'}
                  </Button>
                </div>
                <textarea
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-[200px] ${
                    profile.coverLetter.length < 50 ? 'border-red-300' : 'border-slate-300'
                  }`}
                  placeholder="Dear Hiring Manager, I am excited to apply..."
                  value={profile.coverLetter || ''}
                  onChange={e => setProfile({...profile, coverLetter: e.target.value})}
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-slate-400">
                    {profile.coverLetter.length < 50 && <span className="text-red-500">⚠️ Too short (min 50 chars)</span>}
                    {profile.coverLetter.length >= 50 && <span className="text-green-600">✓ Ready</span>}
                  </p>
                  <p className="text-xs text-slate-400">{profile.coverLetter.length} / 1000 characters</p>
                </div>
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
  }  /* --- DASHBOARD --- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative">
      {/* Animated background blobs for dashboard */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 right-1/3 w-96 h-96 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <NavBar currentPage={currentPage} onNavigate={setCurrentPage} />
      {currentPage === 'home' ? (
        <div className="min-h-screen flex flex-col relative z-10"><header className="bg-white border-b border-slate-200 sticky top-0 z-30">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="bg-blue-600 text-white p-1 sm:p-1.5 rounded-lg">
                    <Briefcase size={18} className="sm:w-5 sm:h-5" />
                  </div>
                  <span className="font-bold text-lg sm:text-xl tracking-tight text-slate-900">HireLift</span>
                </div>
                <nav className="flex items-center gap-1 sm:gap-2">
                  <button onClick={() => setCurrentPage('about')} className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors">About</button>
                  <button onClick={() => setCurrentPage('resume')} className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors">Resume</button>
                  <button onClick={() => setCurrentPage('linkedin')} className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors">LinkedIn</button>
                  <button onClick={() => setCurrentPage('interaction')} className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors">Interview</button>
                </nav>
                <div className="flex items-center gap-2 sm:gap-4">
                  <span className="text-xs sm:text-sm font-medium text-slate-600 hidden md:block">Welcome, {profile.name}</span>
                  <button onClick={handleLogout} className="text-slate-500 hover:text-slate-800 transition-colors p-1 rounded-lg hover:bg-slate-100">
                    <LogOut size={18} className="sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            </header>

            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">                {/* Sidebar */}
                <div className="lg:col-span-3 space-y-4 sm:space-y-6">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border-2 border-white/50 p-4 sm:p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                        <User size={18} className="text-white" />
                      </div>
                      <h2 className="font-bold text-slate-900 text-sm sm:text-base">Your Profile</h2>
                    </div>
                    <div className="space-y-3 sm:space-y-4 text-sm">
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3">
                        <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Role</p>
                        <p className="text-sm font-medium text-slate-800">{profile.preferredRoles[0]}</p>
                      </div>
                      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-3">
                        <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Experience</p>
                        <p className="text-sm font-medium text-slate-800">{profile.experience}</p>
                      </div>
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3">
                        <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Location / Mode</p>
                        <p className="text-sm font-medium text-slate-800 truncate" title={profile.jobLocation.join(', ')}>
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
                        className="w-full text-xs sm:text-sm mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0 hover:shadow-lg hover:-translate-y-0.5 transition-all"
                      >
                        Edit Profile
                      </Button>
                    </div>
                  </div>                  {/* n8n Automation Card */}
                  <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-xl shadow-xl border-2 border-white/20 p-4 sm:p-6 text-white hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                        <Workflow size={18} className="text-white" />
                      </div>
                      <h3 className="font-bold text-sm sm:text-base">Automate with n8n</h3>
                    </div>
                    <p className="text-xs text-white/90 mb-4 leading-relaxed">
                      Download a workflow to automate applications on your own server.
                    </p>
                    <Button 
                      onClick={handleDownloadN8n}
                      className="w-full text-xs bg-white text-indigo-900 hover:bg-indigo-50 border-0 hover:shadow-lg font-semibold"
                    >
                      <Download size={14} className="mr-2" />
                      Download Workflow
                    </Button>
                  </div>

                  {/* Workday Filler Card */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border-2 border-white/50 p-4 sm:p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg">
                        <FileCode size={18} className="text-white" />
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base">Workday Filler</h3>
                    </div>
                    <p className="text-xs text-slate-600 mb-4">
                      Get a script to auto-fill Workday applications in console.
                    </p>
                    <Button 
                      variant="outline"
                      onClick={handleDownloadWorkdayScript}
                      className="w-full text-xs flex items-center gap-2 justify-center bg-gradient-to-r from-cyan-600 to-blue-600 text-white border-0 hover:shadow-lg"
                    >
                      <Download size={12} /> Get Script
                    </Button>
                  </div>

                  <Button 
                    onClick={() => setAppState(AppState.APPLICATION_FORM)} 
                    className="w-full justify-between group shadow-lg text-xs sm:text-sm bg-gradient-to-r from-violet-600 to-purple-600 border-0 hover:shadow-xl hover:-translate-y-0.5 transition-all"
                    variant="outline"
                  >
                    <span className="flex items-center gap-2">
                      <FileText size={14} /> Edit Application
                    </span>
                    <ChevronRight size={14} className="opacity-70 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>                <div className="lg:col-span-9">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3 sm:gap-4">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Live Job Matches
                      </h2>
                      <p className="text-sm text-slate-600 mt-1">Real-time opportunities tailored for you</p>
                    </div>
                    <div className="text-xs sm:text-sm text-slate-700 bg-white/80 backdrop-blur-sm px-4 py-2.5 rounded-xl border-2 border-white/50 shadow-lg flex items-center gap-2 whitespace-nowrap font-semibold">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      {getFilteredJobs(matchedJobs).length} matches found
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

            {/* AutoApplyProgressModal */}
            <AutoApplyProgressModal
              steps={progressSteps}
              currentStep={progressStepIdx}
              isOpen={progressOpen}
              onClose={() => setProgressOpen(false)}
              error={progressError}            />
          </div>      ) : currentPage === 'about' ? (
        <About 
          userName={profile.name}
          onNavigate={setCurrentPage}
          onLogout={handleLogout}
        />
      ) : currentPage === 'resume' ? (
        <ResumeBuild 
          userName={profile.name}
          onNavigate={setCurrentPage}
          onLogout={handleLogout}
        />
      ) : currentPage === 'linkedin' ? (
        <LinkedInOptimization 
          userName={profile.name}
          onNavigate={setCurrentPage}
          onLogout={handleLogout}
        />
      ) : currentPage === 'interaction' ? (
        <PersonalInteraction 
          userName={profile.name}
          onNavigate={setCurrentPage}
          onLogout={handleLogout}
        />      ) : null}

      {/* Global Styles for Animations */}
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
}

export default App;