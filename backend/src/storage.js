import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '..', 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const RESUMES_FILE = path.join(DATA_DIR, 'resumes.json');
const PORTFOLIOS_FILE = path.join(DATA_DIR, 'portfolios.json');

// Ensure directory and JSON files exist
function ensureStorage() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([]), 'utf8');
  }
  if (!fs.existsSync(RESUMES_FILE)) {
    fs.writeFileSync(RESUMES_FILE, JSON.stringify([]), 'utf8');
  }
  if (!fs.existsSync(PORTFOLIOS_FILE)) {
    fs.writeFileSync(PORTFOLIOS_FILE, JSON.stringify([]), 'utf8');
  }
}

function readJSON(filePath) {
  ensureStorage();
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data || '[]');
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return [];
  }
}

function writeJSON(filePath, data) {
  ensureStorage();
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

// User Storage Operations
export function getUsers() {
  return readJSON(USERS_FILE);
}

export function findUserByEmail(email) {
  const users = getUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function findUserById(id) {
  const users = getUsers();
  return users.find((u) => u.id === id);
}

export function createUser(userData) {
  const users = getUsers();
  users.push(userData);
  writeJSON(USERS_FILE, users);
  return userData;
}

export function updateUser(id, updates) {
  const users = getUsers();
  const index = users.findIndex((u) => u.id === id);
  if (index !== -1) {
    users[index] = { ...users[index], ...updates };
    writeJSON(USERS_FILE, users);
    return users[index];
  }
  return null;
}

// Resume Storage Operations
export function getResumes() {
  return readJSON(RESUMES_FILE);
}

export function getResumesByUserId(userId) {
  const resumes = getResumes();
  return resumes.filter((r) => r.userId === userId);
}

export function getResumeById(id) {
  const resumes = getResumes();
  return resumes.find((r) => r.id === id);
}

export function saveOrUpdateResume(resumeData) {
  const resumes = getResumes();
  const index = resumes.findIndex((r) => r.id === resumeData.id);
  if (index !== -1) {
    resumes[index] = { ...resumes[index], ...resumeData, updatedAt: new Date().toISOString() };
    writeJSON(RESUMES_FILE, resumes);
    return resumes[index];
  } else {
    const newResume = {
      ...resumeData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    resumes.push(newResume);
    writeJSON(RESUMES_FILE, resumes);
    return newResume;
  }
}

export function deleteResume(id, userId) {
  const resumes = getResumes();
  const filtered = resumes.filter((r) => !(r.id === id && r.userId === userId));
  const deleted = resumes.length !== filtered.length;
  if (deleted) {
    writeJSON(RESUMES_FILE, filtered);
  }
  return deleted;
}

// Portfolio Storage Operations
export function getPortfolios() {
  return readJSON(PORTFOLIOS_FILE);
}

export function getPortfolioByUserId(userId) {
  const portfolios = getPortfolios();
  return portfolios.find((p) => p.userId === userId);
}

export function saveOrUpdatePortfolio(portfolioData) {
  const portfolios = getPortfolios();
  const index = portfolios.findIndex((p) => p.userId === portfolioData.userId);
  if (index !== -1) {
    portfolios[index] = { ...portfolios[index], ...portfolioData, updatedAt: new Date().toISOString() };
    writeJSON(PORTFOLIOS_FILE, portfolios);
    return portfolios[index];
  } else {
    const newPortfolio = {
      ...portfolioData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    portfolios.push(newPortfolio);
    writeJSON(PORTFOLIOS_FILE, portfolios);
    return newPortfolio;
  }
}

export function deletePortfolio(userId) {
  const portfolios = getPortfolios();
  const filtered = portfolios.filter((p) => p.userId !== userId);
  const deleted = portfolios.length !== filtered.length;
  if (deleted) {
    writeJSON(PORTFOLIOS_FILE, filtered);
  }
  return deleted;
}
