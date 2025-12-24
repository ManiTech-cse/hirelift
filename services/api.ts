// API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function for API calls
async function apiCall(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(errorData.error || errorData.message || `HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
}

// Job matching API
export async function matchJobs(resumeText: string, preferences: any = {}) {
  return apiCall('/match-jobs', {
    method: 'POST',
    body: JSON.stringify({ resumeText, preferences }),
  });
}

// Resume analysis API
export async function analyzeResume(resumeText: string) {
  return apiCall('/analyze-resume', {
    method: 'POST',
    body: JSON.stringify({ resumeText }),
  });
}

// LinkedIn optimization API
export async function optimizeLinkedIn(profileData: any, targetRole?: string) {
  return apiCall('/optimize-linkedin', {
    method: 'POST',
    body: JSON.stringify({ profileData, targetRole }),
  });
}

// Application submission API
export async function submitApplication(data: {
  jobId: string;
  resumeData: any;
  coverLetter?: string;
  applicantInfo: any;
}) {
  return apiCall('/submit-application', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// Health check API
export async function checkHealth() {
  return apiCall('/health');
}

// Export API base URL for direct access if needed
export { API_BASE_URL };
