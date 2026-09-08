import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  apiLogin,
  apiRegister,
  apiGetMe,
  apiUpdateProfile,
  apiGetResumes,
  apiSaveResume,
  apiGetPortfolio,
  apiSavePortfolio
} from '../services/api';

const AppContext = createContext();

const initialResumeData = {
  id: 'resume-default',
  title: 'My Primary Resume',
  template: 'modern',
  personalInfo: {
    fullName: 'Alex Morgan',
    email: 'alex.morgan@example.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alexmorgan',
    github: 'github.com/alexmorgan',
    portfolioWebsite: 'alexmorgan.dev'
  },
  careerInfo: {
    targetRole: 'Full Stack Software Engineer',
    professionalSummary: 'Passionate and results-driven Software Engineer with 2+ years of experience building modern web applications using React, Node.js, Express, and cloud infrastructure.',
    careerObjective: 'Seeking a challenging Full Stack Engineer role to build scalable web applications.'
  },
  education: [
    {
      id: 'edu-1',
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University of California, Berkeley',
      fieldOfStudy: 'Computer Science',
      startYear: '2020',
      endYear: '2024',
      gpa: '3.85 / 4.0'
    }
  ],
  skills: [
    { id: 'sk-1', name: 'JavaScript / ES6+', category: 'Technical' },
    { id: 'sk-2', name: 'React.js', category: 'Technical' },
    { id: 'sk-3', name: 'Node.js & Express', category: 'Technical' },
    { id: 'sk-4', name: 'TypeScript', category: 'Technical' },
    { id: 'sk-5', name: 'HTML5 & CSS3', category: 'Technical' },
    { id: 'sk-6', name: 'REST APIs', category: 'Technical' },
    { id: 'sk-7', name: 'Git / GitHub', category: 'Tools' },
    { id: 'sk-8', name: 'Agile & Teamwork', category: 'Soft Skills' }
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'AI Resume & Portfolio Builder',
      description: 'Full-stack platform enabling job seekers to generate ATS-friendly resumes and dynamic web portfolios.',
      techStack: 'React, Express, Node.js, Vite',
      projectUrl: 'https://demo-resume-builder.com',
      githubUrl: 'https://github.com/alexmorgan/resume-builder'
    }
  ],
  workExperience: [
    {
      id: 'exp-1',
      company: 'TechNova Solutions',
      role: 'Frontend Engineering Intern',
      location: 'San Francisco, CA',
      startDate: 'Jun 2023',
      endDate: 'Dec 2023',
      current: false,
      description: 'Collaborated with senior engineers to design and implement responsive React components.'
    }
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services',
      issueDate: 'Jan 2024',
      credentialUrl: 'https://aws.amazon.com/verify'
    }
  ],
  achievements: [
    {
      id: 'ach-1',
      title: '1st Place - UC Berkeley Hackathon 2023',
      description: 'Awarded top prize out of 40+ teams for creating an accessible educational app.',
      date: 'Nov 2023'
    }
  ]
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [resumeData, setResumeData] = useState(initialResumeData);
  const [builderStep, setBuilderStep] = useState(1);

  // Check auth session on startup
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const data = await apiGetMe();
          setUser(data.user);
          setIsLoggedIn(true);
          await loadUserResumes();
        } catch (error) {
          console.warn('Session expired or invalid:', error.message);
          localStorage.removeItem('authToken');
          setUser(null);
          setIsLoggedIn(false);
        }
      }
      setIsLoadingAuth(false);
    };
    initAuth();
  }, []);

  const loadUserResumes = async () => {
    try {
      const res = await apiGetResumes();
      if (res.resumes && res.resumes.length > 0) {
        setResumeData(res.resumes[0]);
      }
    } catch (err) {
      console.error('Failed to load user resumes:', err);
    }
  };

  const loginUser = async (email, password) => {
    const res = await apiLogin(email, password);
    localStorage.setItem('authToken', res.token);
    setUser(res.user);
    setIsLoggedIn(true);
    await loadUserResumes();
    return res;
  };

  const registerUser = async (name, email, password) => {
    const res = await apiRegister(name, email, password);
    localStorage.setItem('authToken', res.token);
    setUser(res.user);
    setIsLoggedIn(true);
    return res;
  };

  const logoutUser = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setIsLoggedIn(false);
    setResumeData(initialResumeData);
  };

  const saveResumeToBackend = async (dataToSave = resumeData) => {
    if (!isLoggedIn) return;
    try {
      const res = await apiSaveResume(dataToSave);
      if (res.resume) {
        setResumeData(res.resume);
      }
      return res;
    } catch (err) {
      console.error('Failed to save resume:', err);
      throw err;
    }
  };

  const updateUserProfile = async (profileData) => {
    if (isLoggedIn) {
      const res = await apiUpdateProfile(profileData);
      setUser(res.user);
      return res.user;
    } else {
      setUser((prev) => ({ ...prev, ...profileData }));
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser: updateUserProfile,
        isLoggedIn,
        isLoadingAuth,
        loginUser,
        registerUser,
        logoutUser,
        resumeData,
        setResumeData,
        saveResumeToBackend,
        builderStep,
        setBuilderStep
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
