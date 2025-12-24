// Authentication API Service
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function for API calls with auth
async function authApiCall(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}/auth${endpoint}`;

  // Get token from localStorage
  const token = localStorage.getItem('token');

  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || data.message || `HTTP ${response.status}`);
    }

    return data;
  } catch (error: any) {
    console.error('Auth API call error:', error);
    throw error;
  }
}

// Register new user
export async function register(name: string, email: string, password: string) {
  const response = await authApiCall('/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });

  // Save token to localStorage
  if (response.token) {
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
  }

  return response;
}

// Login user
export async function login(email: string, password: string) {
  const response = await authApiCall('/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  // Save token to localStorage
  if (response.token) {
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
  }

  return response;
}

// Get current user
export async function getCurrentUser() {
  const response = await authApiCall('/me', {
    method: 'GET',
  });

  // Update user in localStorage
  if (response.user) {
    localStorage.setItem('user', JSON.stringify(response.user));
  }

  return response;
}

// Update user profile
export async function updateUserProfile(name?: string, profile?: any) {
  const response = await authApiCall('/profile', {
    method: 'PUT',
    body: JSON.stringify({ name, profile }),
  });

  // Update user in localStorage
  if (response.user) {
    localStorage.setItem('user', JSON.stringify(response.user));
  }

  return response;
}

// Logout user
export async function logout() {
  try {
    await authApiCall('/logout', {
      method: 'POST',
    });
  } catch (error) {
    // Continue with logout even if API call fails
  } finally {
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  const token = localStorage.getItem('token');
  return !!token;
}

// Get stored user
export function getStoredUser() {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch (error) {
      return null;
    }
  }
  return null;
}

// Get token
export function getToken(): string | null {
  return localStorage.getItem('token');
}

// Export API base URL for direct access if needed
export { API_BASE_URL };
