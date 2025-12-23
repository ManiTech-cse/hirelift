export interface UserProfile {
  name: string;
  email: string;
  skills: string[];
  experience: string;
  jobLocation: string[]; // Specific cities/countries
  workModes: string[]; // Remote, Hybrid, Onsite
  primaryWorkMode: string; // The primary preference
  preferredRoles: string[];
  resumeText: string;
  // Extended fields for the full application form
  coverLetter?: string;
  linkedin?: string;
  portfolio?: string;
  availability?: string;
  salaryExpectation?: string;
}

export interface Job {
  id: string;
  job_title: string;
  company: string;
  location: string;
  required_skills: string[];
  experience_required: string;
  job_source: string;
  description: string;
  is_verified: boolean;
  // Extended fields for AI Agent jobs
  logo?: string;
  work_mode?: string;
  salary_range?: string;
  requirements?: string[];
  responsibilities?: string[];
  source?: 'LinkedIn' | 'Naukri' | 'Career Page';
  careerPageUrl?: string;
  applyUrl?: string;
  postedDate?: string;
  job_type?: string;
  experience_level?: string;
  skills?: string[];
  visa_sponsorship?: boolean;
}

export interface MatchedJob {
  job_title: string;
  company: string;
  location: string;
  match_percentage: number;
  matched_skills: string[];
  missing_skills: string[];
  auto_apply_eligible: boolean;
  apply_url: string;
  job_source: string;
  reasoning?: string;
}

export interface CompanyDetails {
  industry: string;
  size: string;
  description: string;
}

export interface MatchingResponse {
  matched_jobs: MatchedJob[];
}

export enum AppState {
  LOGIN = 'LOGIN',
  PROFILE = 'PROFILE',
  DASHBOARD = 'DASHBOARD',
  APPLICATION_FORM = 'APPLICATION_FORM'
}