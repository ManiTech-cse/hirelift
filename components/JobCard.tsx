import React, { useState } from 'react';
import { MatchedJob, CompanyDetails } from '../types';
import { fetchCompanyDetails } from '../services/geminiService';
import { getCachedCompanyDetails, setCachedCompanyDetails } from '../services/companyCache';
import { getCompanyInfo } from '../services/companyDatabase';
import { CheckCircle, MapPin, Building2, Briefcase, Zap, AlertCircle, ExternalLink, Check, BrainCircuit, Info, Users, Factory, ChevronDown, ChevronUp, Globe } from 'lucide-react';
import Button from './Button';

interface JobCardProps {
  job: MatchedJob;
  onAutoApply: (job: MatchedJob) => void;
  isApplying?: boolean;
  isApplied?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ job, onAutoApply, isApplying = false, isApplied = false }) => {
  const [showCompanyInfo, setShowCompanyInfo] = useState(false);
  // Initialize from cache if available
  const [companyDetails, setCompanyDetails] = useState<CompanyDetails | null>(
    getCachedCompanyDetails(job.company) || null
  );
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  const isHighMatch = job.match_percentage >= 90;
  const isMidMatch = job.match_percentage >= 75 && job.match_percentage < 90;
  
  const scoreColor = isHighMatch ? 'text-green-600 bg-green-50' : (isMidMatch ? 'text-blue-600 bg-blue-50' : 'text-amber-600 bg-amber-50');

  // Determine source badge color
  const getSourceBadge = (source: string) => {
    if (source.includes('LinkedIn')) return 'bg-blue-100 text-blue-700 hover:bg-blue-200';
    if (source.includes('Naukri')) return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
    if (source.includes('Superset')) return 'bg-orange-100 text-orange-800 hover:bg-orange-200';
    return 'bg-purple-100 text-purple-700 hover:bg-purple-200'; // Default
  };

  // Logic update: Ensure button is enabled for ALL jobs if they haven't been applied to yet.
  // We prioritize the "Auto Apply" simulation.
  const isEligibleForAutoApply = job.auto_apply_eligible || true; // Force true for demo purposes to satisfy user requirement

  const handleToggleCompanyInfo = async () => {
    const isExpanding = !showCompanyInfo;
    setShowCompanyInfo(isExpanding);

    // If expanding and we don't have details yet, fetch them
    if (isExpanding && !companyDetails) {
      setIsLoadingDetails(true);
      try {
        // Double check cache before network call (race condition safety)
        const cached = getCachedCompanyDetails(job.company);
        if (cached) {
          setCompanyDetails(cached);
        } else {
          const details = await fetchCompanyDetails(job.company);
          if (details) {
            setCompanyDetails(details);
            setCachedCompanyDetails(job.company, details);
          }
        }
      } catch (error) {
        console.error("Failed to fetch details", error);
      } finally {
        setIsLoadingDetails(false);
      }
    }
  };
  const handleSourceClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = job.apply_url && job.apply_url.startsWith('http') 
      ? job.apply_url 
      : `https://www.google.com/search?q=${encodeURIComponent(`${job.job_title} ${job.company} careers ${job.job_source}`)}`;
    window.open(url, '_blank');
  };

  const handleCareersPageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const companyInfo = getCompanyInfo(job.company);
    if (companyInfo?.careersUrl) {
      window.open(companyInfo.careersUrl, '_blank');
    }
  };

  const companyInfo = getCompanyInfo(job.company);

  return (
    <div className={`bg-white rounded-xl border p-6 hover:shadow-lg transition-shadow duration-300 relative overflow-hidden group ${isApplied ? 'border-green-200 bg-green-50/30' : 'border-slate-200'}`}>
      {/* Top Banner for Auto Apply Eligible */}
      {job.auto_apply_eligible && !isApplied && (
        <div className="absolute top-0 right-0 bg-gradient-to-l from-blue-600 to-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1 shadow-sm z-10">
          <Zap size={12} fill="currentColor" /> AUTO-APPLY READY
        </div>
      )}
      
      {isApplied && (
        <div className="absolute top-0 right-0 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1 shadow-sm z-10">
          <Check size={12} /> APPLIED
        </div>
      )}      <div className="flex flex-col md:flex-row gap-6">
        {/* Left: Job Info */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-900 leading-tight">{job.job_title}</h3>
              <div className="flex items-center gap-2 mt-2 text-slate-600 flex-wrap">
                <Building2 size={16} />
                <span className="font-medium">{job.company}</span>
                <span className="text-blue-500 mx-1">•</span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle size={10} /> Verified
                </span>
              </div>
            </div>
            
            {/* Company Logo & Careers Link - Right side on desktop */}
            {companyInfo && (
              <div className="flex flex-col items-end gap-2 ml-4">
                <div className="bg-white border border-slate-200 rounded-lg p-2 h-12 w-12 flex items-center justify-center hover:shadow-md transition-shadow">
                  <img 
                    src={companyInfo.logo} 
                    alt={companyInfo.name}
                    className="max-h-10 max-w-10 object-contain"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23475569"%3E%3Crect width="24" height="24" fill="%23f1f5f9"/%3E%3Ctext x="12" y="14" font-size="10" text-anchor="middle" fill="%23475569" font-weight="bold"%3E{job.company.substring(0, 2).toUpperCase()}%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </div>
                <button
                  onClick={handleCareersPageClick}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1 transition-colors"
                  title={`Visit ${companyInfo.name} Careers Page`}
                >
                  <Globe size={12} /> Careers
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-y-2 gap-x-4 mt-3 text-sm text-slate-500">
            <div className="flex items-center gap-1">
              <MapPin size={16} /> {job.location}
            </div>
            {/* Clickable Source Badge */}
            <button 
              onClick={handleSourceClick}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium cursor-pointer transition-colors ${getSourceBadge(job.job_source)}`}
              title="Click to view original job posting"
            >
              <ExternalLink size={12} /> Source: {job.job_source}
            </button>
          </div>

          {/* Reasoning Section */}
          {job.reasoning && (
            <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-100 text-sm text-slate-700 flex items-start gap-2">
               <BrainCircuit size={16} className="text-blue-500 mt-0.5 shrink-0" />
               <p><span className="font-semibold text-slate-900">AI Reasoning:</span> {job.reasoning}</p>
            </div>
          )}

          {/* Skills Section */}
          <div className="mt-4">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Matched Skills</h4>
            <div className="flex flex-wrap gap-2">
              {job.matched_skills.map((skill, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-md border border-slate-200">
                  {skill}
                </span>
              ))}
              {job.matched_skills.length === 0 && <span className="text-sm text-slate-400 italic">No direct skill matches found.</span>}
            </div>
          </div>

          {job.missing_skills.length > 0 && (
            <div className="mt-3">
               <h4 className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-2">Missing Skills (Penalty Applied)</h4>
               <div className="flex flex-wrap gap-2">
                {job.missing_skills.map((skill, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-red-50 text-red-600 text-xs font-medium rounded-md border border-red-100 flex items-center gap-1">
                     {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Company Details Toggle */}
          <div className="mt-5 pt-4 border-t border-slate-100">
            <button 
              onClick={handleToggleCompanyInfo}
              className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors focus:outline-none"
            >
              {showCompanyInfo ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              {showCompanyInfo ? 'Hide Company Profile' : 'View Company Profile'}
            </button>

            {showCompanyInfo && (
              <div className="mt-3 bg-slate-50 rounded-lg border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                {isLoadingDetails ? (
                   // Skeleton Loading State
                   <div className="p-4 space-y-3">
                     <div className="flex gap-6">
                        <div className="h-4 bg-slate-200 rounded w-1/3 animate-pulse"></div>
                        <div className="h-4 bg-slate-200 rounded w-1/4 animate-pulse"></div>
                     </div>
                     <div className="h-16 bg-slate-200 rounded w-full animate-pulse"></div>
                   </div>
                ) : companyDetails ? (
                  <div className="p-4 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                      <div className="flex items-center gap-2 text-sm text-slate-700">
                        <Factory size={16} className="text-slate-400" />
                        <span className="font-medium">Industry:</span> {companyDetails.industry}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-700">
                        <Users size={16} className="text-slate-400" />
                        <span className="font-medium">Size:</span> {companyDetails.size}
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-slate-600 bg-white p-3 rounded border border-slate-100">
                      <Info size={16} className="text-blue-400 shrink-0 mt-0.5" />
                      <p>{companyDetails.description}</p>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 text-sm text-slate-500">
                    Unable to retrieve details at this moment.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right: Match Score & Action */}
        <div className="w-full md:w-48 flex flex-col items-center justify-between border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
          <div className="text-center mb-4">
            <span className="text-sm font-medium text-slate-500">Match Score</span>
            <div className={`mt-2 w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold border-4 ${scoreColor.replace('bg-', 'border-').replace('text-', '')} ${scoreColor}`}>
              {job.match_percentage}%
            </div>
          </div>
          
          <Button 
            onClick={() => onAutoApply(job)}
            variant={isApplied ? 'outline' : 'primary'} 
            className={`w-full ${
              isApplied 
                ? 'border-green-600 text-green-700 bg-green-50' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
            disabled={isApplying || isApplied}
            isLoading={isApplying}
          >
            {isApplied ? (
              <span className="flex items-center gap-2"><Check size={16} /> Applied</span>
            ) : (
              <span className="flex items-center gap-2"><Zap size={16} /> Apply Now</span>
            )}
          </Button>
          {!isEligibleForAutoApply && (
             <p className="text-[10px] text-center text-slate-400 mt-2">Score low, but you can still apply.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCard;