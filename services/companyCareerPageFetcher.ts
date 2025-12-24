// COMPANY CAREER PAGE FETCHER - Fetches GENUINE jobs from real company career pages
// This fetches actual job listings from official company career websites

import { Job } from '../types';

// Top 25 MNC Companies with their official career page APIs/URLs
const COMPANY_CAREER_PAGES = {
  'Google': {
    api: 'https://careers.google.com/api/v3/search/',
    logo: 'https://www.google.com/s2/favicons?domain=google.com&sz=128',
  },
  'Microsoft': {
    api: 'https://careers.microsoft.com/professionals/us/en/search-results',
    logo: 'https://www.google.com/s2/favicons?domain=microsoft.com&sz=128',
  },
  'Amazon': {
    api: 'https://www.amazon.jobs/en/search.json',
    logo: 'https://www.google.com/s2/favicons?domain=amazon.com&sz=128',
  },
  'Apple': {
    api: 'https://jobs.apple.com/api/role/search',
    logo: 'https://www.google.com/s2/favicons?domain=apple.com&sz=128',
  },
  'Meta': {
    api: 'https://www.metacareers.com/graphql',
    logo: 'https://www.google.com/s2/favicons?domain=meta.com&sz=128',
  },
  'Netflix': {
    url: 'https://jobs.netflix.com',
    logo: 'https://www.google.com/s2/favicons?domain=netflix.com&sz=128',
  },
  'Tesla': {
    url: 'https://www.tesla.com/careers',
    logo: 'https://www.google.com/s2/favicons?domain=tesla.com&sz=128',
  },
  'Nvidia': {
    url: 'https://www.nvidia.com/en-us/about-nvidia/careers/',
    logo: 'https://www.google.com/s2/favicons?domain=nvidia.com&sz=128',
  },
  'Adobe': {
    url: 'https://careers.adobe.com',
    logo: 'https://www.google.com/s2/favicons?domain=adobe.com&sz=128',
  },
  'Salesforce': {
    url: 'https://www.salesforce.com/company/careers/',
    logo: 'https://www.google.com/s2/favicons?domain=salesforce.com&sz=128',
  },
  'Oracle': {
    url: 'https://www.oracle.com/careers/',
    logo: 'https://www.google.com/s2/favicons?domain=oracle.com&sz=128',
  },
  'IBM': {
    url: 'https://www.ibm.com/careers',
    logo: 'https://www.google.com/s2/favicons?domain=ibm.com&sz=128',
  },
  'Intel': {
    url: 'https://jobs.intel.com',
    logo: 'https://www.google.com/s2/favicons?domain=intel.com&sz=128',
  },
  'Cisco': {
    url: 'https://jobs.cisco.com',
    logo: 'https://www.google.com/s2/favicons?domain=cisco.com&sz=128',
  },
  'SAP': {
    url: 'https://jobs.sap.com',
    logo: 'https://www.google.com/s2/favicons?domain=sap.com&sz=128',
  },
  'Accenture': {
    url: 'https://www.accenture.com/careers',
    logo: 'https://www.google.com/s2/favicons?domain=accenture.com&sz=128',
  },
  'Deloitte': {
    url: 'https://www2.deloitte.com/careers',
    logo: 'https://www.google.com/s2/favicons?domain=deloitte.com&sz=128',
  },
  'Goldman Sachs': {
    url: 'https://www.goldmansachs.com/careers/',
    logo: 'https://www.google.com/s2/favicons?domain=goldmansachs.com&sz=128',
  },
  'JPMorgan': {
    url: 'https://careers.jpmorgan.com',
    logo: 'https://www.google.com/s2/favicons?domain=jpmorganchase.com&sz=128',
  },
  'LinkedIn': {
    url: 'https://careers.linkedin.com',
    logo: 'https://www.google.com/s2/favicons?domain=linkedin.com&sz=128',
  },
  'Uber': {
    url: 'https://www.uber.com/careers',
    logo: 'https://www.google.com/s2/favicons?domain=uber.com&sz=128',
  },
  'Airbnb': {
    url: 'https://careers.airbnb.com',
    logo: 'https://www.google.com/s2/favicons?domain=airbnb.com&sz=128',
  },
  'Spotify': {
    url: 'https://www.lifeatspotify.com/jobs',
    logo: 'https://www.google.com/s2/favicons?domain=spotify.com&sz=128',
  },
  'Twitter': {
    url: 'https://careers.twitter.com',
    logo: 'https://www.google.com/s2/favicons?domain=twitter.com&sz=128',
  },
  'Snapchat': {
    url: 'https://careers.snap.com',
    logo: 'https://www.google.com/s2/favicons?domain=snap.com&sz=128',
  },
};

// ============================================
// FETCH JOBS FROM AMAZON CAREERS (Official API)
// ============================================
const fetchAmazonJobs = async (): Promise<Job[]> => {
  try {
    console.log('📦 Fetching from Amazon Jobs API (Official)...');
    
    const response = await fetch('https://www.amazon.jobs/en/search.json?offset=0&result_limit=50&sort=recent', {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      console.log('⚠️ Amazon API unavailable');
      return [];
    }

    const data = await response.json();
    const jobs: Job[] = (data.jobs || []).slice(0, 30).map((job: any, index: number) => ({
      id: `amazon-${job.id_icims || index}`,
      company: 'Amazon',
      logo: COMPANY_CAREER_PAGES['Amazon'].logo,
      job_title: job.title || 'Position at Amazon',
      location: job.location || 'Multiple Locations',
      work_mode: job.job_schedule_type === 'Full-time' ? 'Hybrid' : 'On-site',
      job_type: 'Full-time',      salary: 'Competitive',
      experience: 'Mid-Senior',
      postedDate: job.posted_date || new Date().toISOString(),
      skills: (job.basic_qualifications || '').split(',').slice(0, 5).map((s: string) => s.trim()).filter(Boolean),
      description: job.description || 'Join Amazon and work on cutting-edge technology.',
      requirements: job.basic_qualifications || 'Bachelor\'s degree required',
      apply_url: `https://www.amazon.jobs${job.job_path}` || 'https://www.amazon.jobs',
      job_source: 'Amazon Careers',
      sponsorship: true,
    }));

    console.log(`✅ Amazon: ${jobs.length} jobs fetched`);
    return jobs;
  } catch (error) {
    console.error('❌ Amazon API error:', error);
    return [];
  }
};

// ============================================
// FETCH JOBS FROM LEVER API (Used by many companies)
// Companies like Netflix, Spotify, Airbnb use Lever
// ============================================
const fetchLeverJobs = async (company: string, leverDomain: string): Promise<Job[]> => {
  try {
    console.log(`🔧 Fetching from ${company} via Lever API...`);
    
    const response = await fetch(`https://api.lever.co/v0/postings/${leverDomain}?mode=json&limit=30`, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      console.log(`⚠️ ${company} Lever API unavailable`);
      return [];
    }

    const data = await response.json();
    const jobs: Job[] = data.slice(0, 20).map((job: any, index: number) => ({
      id: `${leverDomain}-${job.id || index}`,
      company: company,
      logo: COMPANY_CAREER_PAGES[company as keyof typeof COMPANY_CAREER_PAGES]?.logo || `https://www.google.com/s2/favicons?domain=${leverDomain}.com&sz=128`,
      job_title: job.text || 'Position',
      location: job.categories?.location || job.location || 'Remote',
      work_mode: job.categories?.location?.toLowerCase().includes('remote') ? 'Remote' : 'Hybrid',
      job_type: job.categories?.commitment || 'Full-time',      salary: 'Competitive',
      experience: 'Mid-Senior',
      postedDate: new Date(job.createdAt || Date.now()).toISOString(),
      skills: (job.categories?.team || job.text || '').split(' ').slice(0, 5),
      description: job.description || `Join ${company} and make an impact.`,
      requirements: job.description || 'Relevant experience required',
      apply_url: job.hostedUrl || job.applyUrl || `https://jobs.lever.co/${leverDomain}`,
      job_source: `${company} Careers`,
      sponsorship: true,
    }));

    console.log(`✅ ${company}: ${jobs.length} jobs fetched via Lever`);
    return jobs;
  } catch (error) {
    console.error(`❌ ${company} Lever API error:`, error);
    return [];
  }
};

// ============================================
// FETCH JOBS FROM GREENHOUSE API (Used by many companies)
// Companies like Airbnb, Uber, etc. use Greenhouse
// ============================================
const fetchGreenhouseJobs = async (company: string, boardToken: string): Promise<Job[]> => {
  try {
    console.log(`🌱 Fetching from ${company} via Greenhouse API...`);
    
    const response = await fetch(`https://boards-api.greenhouse.io/v1/boards/${boardToken}/jobs?content=true`, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      console.log(`⚠️ ${company} Greenhouse API unavailable`);
      return [];
    }

    const data = await response.json();
    const jobs: Job[] = (data.jobs || []).slice(0, 25).map((job: any, index: number) => ({
      id: `greenhouse-${boardToken}-${job.id || index}`,
      company: company,
      logo: COMPANY_CAREER_PAGES[company as keyof typeof COMPANY_CAREER_PAGES]?.logo || `https://www.google.com/s2/favicons?domain=${company.toLowerCase()}.com&sz=128`,
      job_title: job.title || 'Position',
      location: job.location?.name || 'Multiple Locations',
      work_mode: job.location?.name?.toLowerCase().includes('remote') ? 'Remote' : 'Hybrid',
      job_type: 'Full-time',      salary: 'Competitive',
      experience: 'Mid-Senior',
      postedDate: new Date(job.updated_at || Date.now()).toISOString(),
      skills: (job.departments || []).map((d: any) => d.name).slice(0, 5),
      description: job.content || `Exciting opportunity at ${company}`,
      requirements: job.content || 'Bachelor\'s degree or equivalent experience',
      apply_url: job.absolute_url || `https://boards.greenhouse.io/${boardToken}`,
      job_source: `${company} Careers`,
      sponsorship: true,
    }));

    console.log(`✅ ${company}: ${jobs.length} jobs fetched via Greenhouse`);
    return jobs;
  } catch (error) {
    console.error(`❌ ${company} Greenhouse API error:`, error);
    return [];
  }
};

// ============================================
// MAIN FUNCTION: FETCH FROM ALL COMPANY CAREER PAGES
// ============================================
export const fetchCompanyCareerJobs = async (query?: string): Promise<Job[]> => {
  console.log('🏢 Fetching GENUINE jobs from REAL company career pages...');
  console.log(`🔍 Search query: "${query || 'all jobs'}"`);
  
  try {
    // Fetch from multiple company career pages in parallel
    const [
      amazonJobs,
      netflixJobs,
      spotifyJobs,
      airbnbJobs,
      uberJobs,
    ] = await Promise.all([
      // Amazon (Official API)
      fetchAmazonJobs(),
      
      // Lever-based companies
      fetchLeverJobs('Netflix', 'netflix'),
      fetchLeverJobs('Spotify', 'spotify'),
      
      // Greenhouse-based companies
      fetchGreenhouseJobs('Airbnb', 'airbnb'),
      fetchGreenhouseJobs('Uber', 'uber'),
    ]);

    // Combine all jobs
    let allJobs = [
      ...amazonJobs,
      ...netflixJobs,
      ...spotifyJobs,
      ...airbnbJobs,
      ...uberJobs,
    ];

    // Remove duplicates
    const uniqueJobs = allJobs.reduce((acc, job) => {
      const key = `${job.job_title}-${job.company}`.toLowerCase();
      const exists = acc.some(j => 
        `${j.job_title}-${j.company}`.toLowerCase() === key
      );
      if (!exists) {
        acc.push(job);
      }
      return acc;
    }, [] as Job[]);

    // Filter by query if provided
    let filteredJobs = uniqueJobs;
    if (query && query.trim()) {
      const searchLower = query.toLowerCase();
      filteredJobs = uniqueJobs.filter(job => 
        job.job_title.toLowerCase().includes(searchLower) ||
        job.company.toLowerCase().includes(searchLower) ||
        job.location.toLowerCase().includes(searchLower) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchLower))
      );
    }    // Sort by posted date (most recent first)
    filteredJobs.sort((a, b) => 
      new Date(b.postedDate || 0).getTime() - new Date(a.postedDate || 0).getTime()
    );

    // Limit to 50 jobs
    const finalJobs = filteredJobs.slice(0, 50);

    console.log(`✅ Successfully fetched ${finalJobs.length} GENUINE jobs from company career pages!`);
    console.log(`   📊 Amazon: ${amazonJobs.length} | Netflix: ${netflixJobs.length} | Spotify: ${spotifyJobs.length}`);
    console.log(`   📊 Airbnb: ${airbnbJobs.length} | Uber: ${uberJobs.length}`);
    
    return finalJobs;
  } catch (error) {
    console.error('❌ Error fetching company career jobs:', error);
    return [];
  }
};

// ============================================
// SEARCH COMPANY CAREER JOBS (WITH KEYWORD)
// ============================================
export const searchCompanyCareerJobs = async (query: string): Promise<Job[]> => {
  if (!query || query.trim() === '') {
    return fetchCompanyCareerJobs();
  }
  return fetchCompanyCareerJobs(query);
};

// ============================================
// GET COMPANY CAREER PAGE URL
// ============================================
export const getCompanyCareerPageUrl = (company: string): string => {
  const companyData = COMPANY_CAREER_PAGES[company as keyof typeof COMPANY_CAREER_PAGES];
  if (!companyData) return `https://${company.toLowerCase()}.com/careers`;
  return ('url' in companyData ? companyData.url : companyData.api) || `https://${company.toLowerCase()}.com/careers`;
};
