// Authentication API Service with JWT Token Interceptor
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Token management
const TOKEN_KEY = 'jwt_token';
const USER_KEY = 'user_data';

// Get token from localStorage
const getStoredToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

// Save token to localStorage
const saveToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

// Save user data to localStorage
const saveUser = (user: any): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

// Remove token from localStorage
const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

// API Interceptor - Automatically adds JWT token to requests
async function apiRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getStoredToken();

  // Merge headers with authorization token
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(options.headers || {}),
  };

  // Add Authorization header if token exists
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const requestOptions: RequestInit = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();

    // Handle unauthorized - token expired or invalid
    if (response.status === 401) {
      removeToken();
      throw new Error('Session expired. Please login again.');
    }

    if (!response.ok) {
      throw new Error(data.error || data.message || `HTTP ${response.status}`);
    }

    return data;
  } catch (error: any) {
    console.error('API Request Error:', error);
    throw error;
  }
}

// Register new user
export async function register(name: string, email: string, password: string) {
  const response = await apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });

  // Save token and user data to localStorage
  if (response.token) {
    saveToken(response.token);
  }
  if (response.user) {
    saveUser(response.user);
  }

  return response;
}

// Login user
export async function login(email: string, password: string) {
  const response = await apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  // Save token and user data to localStorage
  if (response.token) {
    saveToken(response.token);
  }
  if (response.user) {
    saveUser(response.user);
  }

  return response;
}

// Get current user (Protected - requires JWT token)
export async function getCurrentUser() {
  const response = await apiRequest('/auth/me', {
    method: 'GET',
  });

  // Update user in localStorage
  if (response.user) {
    saveUser(response.user);
  }

  return response;
}

// Update user profile (Protected - requires JWT token)
export async function updateUserProfile(name?: string, profile?: any) {
  const response = await apiRequest('/auth/profile', {
    method: 'PUT',
    body: JSON.stringify({ name, profile }),
  });

  // Update user in localStorage
  if (response.user) {
    saveUser(response.user);
  }

  return response;
}

// Logout user
export async function logout() {
  try {
    await apiRequest('/auth/logout', {
      method: 'POST',
    });
  } catch (error) {
    // Continue with logout even if API call fails
    console.error('Logout API error:', error);
  } finally {
    // Clear localStorage
    removeToken();
  }
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  const token = getStoredToken();
  return !!token;
}

// Get stored user
export function getStoredUser() {
  const userStr = localStorage.getItem(USER_KEY);
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
  return getStoredToken();
}

// Export API base URL for direct access if needed
export { API_BASE_URL };
