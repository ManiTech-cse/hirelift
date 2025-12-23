// Daily Jobs Agent Component - Shows fresh daily job opportunities
import React, { useEffect, useState } from 'react';
import { Sparkles, RefreshCw, Calendar, MapPin, Briefcase, ExternalLink, TrendingUp } from 'lucide-react';
import { getDailyJobs, getLastUpdateTime, needsRefresh } from '../services/dailyJobsAgent';
import { Job } from '../types';

interface DailyJobsAgentProps {
  onJobClick?: (job: Job) => void;
}

export default function DailyJobsAgent({ onJobClick }: DailyJobsAgentProps) {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    loadDailyJobs();
  }, []);

  const loadDailyJobs = async (forceRefresh = false) => {
    try {
      setIsLoading(true);
      const dailyJobs = await getDailyJobs(forceRefresh);
      setJobs(dailyJobs);
      setLastUpdate(getLastUpdateTime());
    } catch (error) {
      console.error('Failed to load daily jobs:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadDailyJobs(true);
  };

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-6 shadow-lg border border-blue-100">
        <div className="flex items-center justify-center gap-3 py-8">
          <RefreshCw className="w-6 h-6 text-blue-600 animate-spin" />
          <span className="text-slate-600 font-medium">Loading fresh opportunities...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-6 shadow-lg border border-blue-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-pink-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-xl shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Daily Jobs Agent
              </h3>
              <p className="text-sm text-slate-600 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Fresh opportunities • Updated {lastUpdate}
              </p>
            </div>
          </div>
          
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 bg-white hover:bg-blue-50 text-blue-600 px-4 py-2 rounded-lg shadow-sm border border-blue-200 transition-all hover:shadow-md disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className="text-sm font-medium hidden sm:inline">Refresh</span>
          </button>
        </div>

        {/* Live badge */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-xs font-semibold">
            <TrendingUp className="w-4 h-4" />
            <span>🔴 LIVE • {jobs.length} New Jobs Today</span>
          </div>
          <span className="text-xs text-slate-500">Real-time from multiple sources</span>
        </div>

        {/* Jobs Grid */}
        {jobs.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <p className="mb-2">No jobs available right now</p>
            <button
              onClick={handleRefresh}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium underline"
            >
              Try refreshing
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {jobs.map((job, idx) => (
              <button
                key={job.id}
                onClick={() => onJobClick?.(job)}
                className="group bg-white hover:bg-gradient-to-br hover:from-white hover:to-blue-50 rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200 hover:border-blue-300 text-left relative"
              >
                {/* New badge for first 5 jobs */}
                {idx < 5 && (
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                    NEW
                  </div>
                )}

                <div className="flex items-start gap-3 mb-2">
                  <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                    <Briefcase className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-900 text-sm mb-1 truncate group-hover:text-blue-600 transition-colors">
                      {job.job_title}
                    </h4>
                    <p className="text-xs text-slate-600 font-medium mb-1">{job.company}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate">{job.location}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mb-3 line-clamp-2">
                  {job.description}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {job.required_skills.slice(0, 3).map((skill, i) => (
                    <span
                      key={i}
                      className="bg-purple-50 text-purple-700 text-xs px-2 py-0.5 rounded-full font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                  {job.required_skills.length > 3 && (
                    <span className="text-xs text-slate-500">+{job.required_skills.length - 3} more</span>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">{job.experience_required}</span>
                  <div className="flex items-center gap-1 text-blue-600 text-xs font-medium group-hover:gap-2 transition-all">
                    <span>View Details</span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Footer Info */}
        <div className="mt-4 pt-4 border-t border-slate-200">
          <p className="text-xs text-slate-500 text-center">
            Jobs sourced from <span className="font-semibold">Remotive</span>, <span className="font-semibold">Arbeitnow</span>, and other verified platforms
          </p>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
}
