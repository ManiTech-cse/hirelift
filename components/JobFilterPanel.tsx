import React, { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';

export interface JobFilters {
  matchPercentage: number; // 50-100
  jobType: string[]; // 'Full-time', 'Contract', 'Internship'
  visaSponsorship: boolean;
  salaryMin?: number;
  salaryMax?: number;
  remote: boolean;
}

interface JobFilterPanelProps {
  filters: JobFilters;
  onFilterChange: (filters: JobFilters) => void;
  resultCount?: number;
}

export const JobFilterPanel: React.FC<JobFilterPanelProps> = ({
  filters,
  onFilterChange,
  resultCount = 0,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMatchPercentageChange = (value: number) => {
    onFilterChange({ ...filters, matchPercentage: value });
  };

  const handleJobTypeToggle = (type: string) => {
    const newTypes = filters.jobType.includes(type)
      ? filters.jobType.filter(t => t !== type)
      : [...filters.jobType, type];
    onFilterChange({ ...filters, jobType: newTypes });
  };

  const handleSalaryChange = (type: 'min' | 'max', value: number) => {
    if (type === 'min') {
      onFilterChange({ ...filters, salaryMin: value });
    } else {
      onFilterChange({ ...filters, salaryMax: value });
    }
  };
  const handleReset = () => {
    onFilterChange({
      matchPercentage: 0,
      jobType: [],
      visaSponsorship: false,
      salaryMin: undefined,
      salaryMax: undefined,
      remote: false,
    });
  };

  const hasActiveFilters = 
    filters.matchPercentage > 0 || 
    filters.jobType.length > 0 || 
    filters.visaSponsorship || 
    filters.remote ||
    filters.salaryMin !== undefined ||
    filters.salaryMax !== undefined;

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors"
      >
        <span className="font-semibold text-slate-900 flex items-center gap-2">
          🔍 Filters
          {hasActiveFilters && (
            <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">Active</span>
          )}
        </span>
        <ChevronDown
          size={18}
          className={`text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="border-t border-slate-200 p-4 space-y-4">
          
          {/* Match Percentage */}
          <div>            <label className="text-sm font-semibold text-slate-700 block mb-2">
              Minimum Match: {filters.matchPercentage}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={filters.matchPercentage}
              onChange={(e) => handleMatchPercentageChange(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Job Type */}
          <div>
            <label className="text-sm font-semibold text-slate-700 block mb-2">Job Type</label>
            <div className="flex flex-wrap gap-2">
              {['Full-time', 'Contract', 'Internship'].map(type => (
                <button
                  key={type}
                  onClick={() => handleJobTypeToggle(type)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    filters.jobType.includes(type)
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Remote & Visa */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.remote}
                onChange={(e) => onFilterChange({ ...filters, remote: e.target.checked })}
                className="w-4 h-4 rounded text-blue-600"
              />
              <span className="text-sm text-slate-700 font-medium">Remote Only</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.visaSponsorship}
                onChange={(e) => onFilterChange({ ...filters, visaSponsorship: e.target.checked })}
                className="w-4 h-4 rounded text-blue-600"
              />
              <span className="text-sm text-slate-700 font-medium">Visa Sponsorship</span>
            </label>
          </div>

          {/* Salary Range */}
          <div>
            <label className="text-sm font-semibold text-slate-700 block mb-2">Salary Range (USD)</label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.salaryMin || ''}
                onChange={(e) => handleSalaryChange('min', Number(e.target.value))}
                className="flex-1 px-2 py-1.5 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.salaryMax || ''}
                onChange={(e) => handleSalaryChange('max', Number(e.target.value))}
                className="flex-1 px-2 py-1.5 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Reset Button */}
          {hasActiveFilters && (
            <button
              onClick={handleReset}
              className="w-full px-3 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center justify-center gap-1"
            >
              <X size={14} /> Clear All Filters
            </button>
          )}

          <div className="pt-2 border-t border-slate-200 text-xs text-slate-600">
            {resultCount} jobs match your criteria
          </div>
        </div>
      )}
    </div>
  );
};

export default JobFilterPanel;
