const API_BASE_URL = '/api';

function getAuthHeaders() {
  const token = localStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
}

async function handleResponse(response) {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'API Request failed');
  }
  return data;
}

// Auth API Calls
export async function apiRegister(name, email, password) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
  return handleResponse(response);
}

export async function apiLogin(email, password) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return handleResponse(response);
}

export async function apiGetMe() {
  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    method: 'GET',
    headers: getAuthHeaders()
  });
  return handleResponse(response);
}

export async function apiUpdateProfile(profileData) {
  const response = await fetch(`${API_BASE_URL}/auth/profile`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(profileData)
  });
  return handleResponse(response);
}

// Resume API Calls
export async function apiGetResumes() {
  const response = await fetch(`${API_BASE_URL}/resumes`, {
    method: 'GET',
    headers: getAuthHeaders()
  });
  return handleResponse(response);
}

export async function apiSaveResume(resumeData) {
  const response = await fetch(`${API_BASE_URL}/resumes`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(resumeData)
  });
  return handleResponse(response);
}

export async function apiDeleteResume(id) {
  const response = await fetch(`${API_BASE_URL}/resumes/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  return handleResponse(response);
}

// Portfolio API Calls
export async function apiGetPortfolio() {
  const response = await fetch(`${API_BASE_URL}/portfolios`, {
    method: 'GET',
    headers: getAuthHeaders()
  });
  return handleResponse(response);
}

export async function apiSavePortfolio(portfolioData) {
  const response = await fetch(`${API_BASE_URL}/portfolios`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(portfolioData)
  });
  return handleResponse(response);
}

// Gemini AI API Calls
export async function apiGenerateAIResume(resumeData) {
  const response = await fetch(`${API_BASE_URL}/ai/generate-resume`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ resumeData })
  });
  return handleResponse(response);
}

export async function apiEnhanceAIBullet(bulletText, targetRole) {
  const response = await fetch(`${API_BASE_URL}/ai/enhance-bullet`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ bulletText, targetRole })
  });
  return handleResponse(response);
}

export async function apiGenerateAIPortfolio(resumeData) {
  const response = await fetch(`${API_BASE_URL}/ai/generate-portfolio`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ resumeData })
  });
  return handleResponse(response);
}
