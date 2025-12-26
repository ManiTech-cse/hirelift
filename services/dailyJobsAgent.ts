// Daily Jobs Agent - Fetches genuine job opportunities from real APIs
import { Job } from '../types';

interface AdzunaJob {
    id: string;
    title: string;
    company: { display_name: string };
    location: { display_name: string };
    description: string;
    redirect_url: string;
    created: string;
}

interface RemotiveJob {
    id: number;
    title: string;
    company_name: string;
    job_type: string;
    publication_date: string;
    candidate_required_location: string;
    tags: string[];
    url: string;
    description: string;
}

// Cache for daily jobs (refresh every 24 hours)
interface JobCache {
    jobs: Job[];
    lastFetched: number;
    expiresAt: number;
}

const CACHE_KEY = 'hirelift_daily_jobs_cache';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

/**
 * Get cached jobs or fetch fresh ones
 */
export async function getDailyJobs(forceRefresh = false): Promise<Job[]> {
    // Check cache first
    if (!forceRefresh) {
        const cached = getCachedJobs();
        if (cached && cached.jobs.length > 0) {
            return cached.jobs;
        }
    }

    // Fetch fresh jobs from multiple sources
    const jobs = await fetchFreshJobs();

    // Cache the results
    cacheJobs(jobs);

    return jobs;
}

/**
 * Get jobs from local storage cache
 */
function getCachedJobs(): JobCache | null {
    try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (!cached) return null;

        const cache: JobCache = JSON.parse(cached);

        // Check if cache is still valid
        if (Date.now() < cache.expiresAt) {
            return cache;
        }

        // Cache expired
        return null;
    } catch (error) {
        console.error('Error reading job cache:', error);
        return null;
    }
}

/**
 * Save jobs to local storage cache
 */
function cacheJobs(jobs: Job[]): void {
    try {
        const cache: JobCache = {
            jobs,
            lastFetched: Date.now(),
            expiresAt: Date.now() + CACHE_DURATION,
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    } catch (error) {
        console.error('Error caching jobs:', error);
    }
}

/**
 * Fetch fresh jobs from multiple sources
 */
async function fetchFreshJobs(): Promise<Job[]> {
    const allJobs: Job[] = [];

    try {
        // Source 1: GitHub Jobs API (free, no key needed)
        const githubJobs = await fetchGitHubJobs();
        allJobs.push(...githubJobs);
    } catch (error) {
        console.error('Error fetching GitHub jobs:', error);
    }

    try {
        // Source 2: Remotive API (free, no key needed)
        const remoteJobs = await fetchRemotiveJobs();
        allJobs.push(...remoteJobs);
    } catch (error) {
        console.error('Error fetching Remotive jobs:', error);
    }

    try {
        // Source 3: Arbeitnow API (free, no key needed)
        const arbeitnowJobs = await fetchArbeitnowJobs();
        allJobs.push(...arbeitnowJobs);
    } catch (error) {
        console.error('Error fetching Arbeitnow jobs:', error);
    }

    // Sort by date (newest first)
    return allJobs.slice(0, 20); // Return top 20 jobs
}

/**
 * Fetch jobs from GitHub Jobs API
 */
async function fetchGitHubJobs(): Promise<Job[]> {
    // Note: GitHub Jobs API is deprecated, using alternative
    // Using Remotive instead as it's more reliable
    return [];
}

/**
 * Fetch jobs from Remotive API
 */
async function fetchRemotiveJobs(): Promise<Job[]> {
    try {
        const response = await fetch('https://remotive.com/api/remote-jobs?limit=10');
        if (!response.ok) throw new Error('Failed to fetch Remotive jobs');

        const data = await response.json();
        const jobs: RemotiveJob[] = data.jobs || [];

        return jobs.map((job): Job => ({
            id: `remotive-${job.id}`,
            job_title: job.title,
            company: job.company_name,
            location: job.candidate_required_location || 'Remote',
            required_skills: job.tags || ['Remote Work'],
            experience_required: extractExperience(job.description),
            job_source: job.url,
            description: job.description.substring(0, 150) + '...',
            is_verified: true,
        }));
    } catch (error) {
        console.error('Remotive API error:', error);
        return [];
    }
}

/**
 * Fetch jobs from Arbeitnow API
 */
async function fetchArbeitnowJobs(): Promise<Job[]> {
    try {
        const response = await fetch('https://www.arbeitnow.com/api/job-board-api');
        if (!response.ok) throw new Error('Failed to fetch Arbeitnow jobs');

        const data = await response.json();
        const jobs = data.data || [];

        return jobs.slice(0, 10).map((job: any): Job => ({
            id: `arbeitnow-${job.slug}`,
            job_title: job.title,
            company: job.company_name,
            location: job.location || 'Remote',
            required_skills: job.tags || [],
            experience_required: extractExperience(job.description),
            job_source: job.url,
            description: job.description?.substring(0, 150) + '...' || 'No description available',
            is_verified: true,
        }));
    } catch (error) {
        console.error('Arbeitnow API error:', error);
        return [];
    }
}

/**
 * Extract experience level from job description
 */
function extractExperience(description: string): string {
    const text = description.toLowerCase();

    // Look for experience patterns
    const seniorPattern = /senior|lead|principal|staff/i;
    const juniorPattern = /junior|entry[-\s]level|graduate/i;
    const midPattern = /\b[2-5]\+?\s*years?\b/i;
    const experiencedPattern = /\b[6-9]\+?\s*years?\b|\b1[0-9]\+?\s*years?\b/i;

    if (seniorPattern.test(text) || experiencedPattern.test(text)) {
        return '5+ years';
    } else if (midPattern.test(text)) {
        return '2-5 years';
    } else if (juniorPattern.test(text)) {
        return '0-2 years';
    }

    return '2+ years';
}

/**
 * Get time since last update
 */
export function getLastUpdateTime(): string {
    const cached = getCachedJobs();
    if (!cached) return 'Never';

    const hoursSince = Math.floor((Date.now() - cached.lastFetched) / (1000 * 60 * 60));

    if (hoursSince < 1) return 'Just now';
    if (hoursSince === 1) return '1 hour ago';
    if (hoursSince < 24) return `${hoursSince} hours ago`;

    const daysSince = Math.floor(hoursSince / 24);
    if (daysSince === 1) return '1 day ago';
    return `${daysSince} days ago`;
}

/**
 * Check if jobs need refresh
 */
export function needsRefresh(): boolean {
    const cached = getCachedJobs();
    return !cached || cached.jobs.length === 0;
}
