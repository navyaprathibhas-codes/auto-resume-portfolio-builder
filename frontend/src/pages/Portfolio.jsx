import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { apiGenerateAIPortfolio, apiSavePortfolio } from '../services/api';
import { Globe, Mail, ExternalLink, Code2, Briefcase, GraduationCap, Award, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../components/Icons';
import { Footer } from '../components/Footer';

export const Portfolio = () => {
  const { resumeData } = useApp();
  const { personalInfo, careerInfo, education, skills, projects, workExperience, certifications, achievements } = resumeData;

  const [aiHeadline, setAiHeadline] = useState('');
  const [aiAboutMe, setAiAboutMe] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');
  const [aiSuccessMessage, setAiSuccessMessage] = useState('');

  const handleGenerateAIPortfolio = async () => {
    if (isAiLoading) return;
    try {
      setIsAiLoading(true);
      setAiError('');
      setAiSuccessMessage('');
      const res = await apiGenerateAIPortfolio(resumeData);
      if (res.success && res.data) {
        setAiHeadline(res.data.headline || '');
        setAiAboutMe(res.data.aboutMe || '');

        // Persist AI generated portfolio data to backend
        await apiSavePortfolio({
          title: res.data.headline || `${personalInfo.fullName || 'Candidate'}'s Portfolio`,
          bio: res.data.aboutMe || '',
          theme: 'modern'
        });

        setAiSuccessMessage('Gemini AI successfully generated customized portfolio content and saved to your profile!');
        setTimeout(() => setAiSuccessMessage(''), 5000);
      }
    } catch (err) {
      setAiError(err.message || 'Gemini AI portfolio copy generation failed.');
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Top Banner Control */}
      <div className="no-print" style={{ backgroundColor: 'var(--dark)', color: '#ffffff', padding: '0.75rem 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.875rem', color: '#94a3b8' }}>✨ Live Web Portfolio Showcase</span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={handleGenerateAIPortfolio}
              className="btn btn-primary btn-sm"
              disabled={isAiLoading}
              style={{ background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' }}
            >
              {isAiLoading ? <RefreshCw size={14} className="spin" /> : <Sparkles size={14} />}
              {isAiLoading ? 'AI Writing Copy...' : 'Generate Portfolio Copy with Gemini AI'}
            </button>
            <Link to="/builder" className="btn btn-secondary btn-sm">
              Customize Data
            </Link>
          </div>
        </div>
      </div>

      {aiSuccessMessage && (
        <div className="container" style={{ marginTop: '1rem' }}>
          <div className="alert alert-success">
            <Sparkles size={18} />
            <span>{aiSuccessMessage}</span>
          </div>
        </div>
      )}

      {aiError && (
        <div className="container" style={{ marginTop: '1rem' }}>
          <div className="alert alert-danger">
            <AlertCircle size={18} />
            <span>{aiError}</span>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section style={{ backgroundColor: '#ffffff', padding: '4rem 0 3rem', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
          <div style={{ maxWidth: '650px' }}>
            <div className="badge badge-primary" style={{ marginBottom: '1rem' }}>
              {aiHeadline || careerInfo.targetRole || 'Full Stack Software Engineer'}
            </div>
            <h1 style={{ fontSize: '2.75rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
              Hi, I'm <span style={{ color: 'var(--primary)' }}>{personalInfo.fullName || 'Alex Morgan'}</span>
            </h1>
            <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '1.75rem' }}>
              {aiAboutMe || careerInfo.professionalSummary || 'Software engineer passionate about building modern web applications.'}
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {personalInfo.email && (
                <a href={`mailto:${personalInfo.email}`} className="btn btn-primary btn-sm">
                  <Mail size={16} /> Contact Me
                </a>
              )}
              {personalInfo.github && (
                <a href={`https://${personalInfo.github}`} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm">
                  <GithubIcon size={16} /> GitHub
                </a>
              )}
              {personalInfo.linkedin && (
                <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm">
                  <LinkedinIcon size={16} /> LinkedIn
                </a>
              )}
            </div>
          </div>
          <div style={{ width: '160px', height: '160px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.5rem', fontWeight: 800, boxShadow: 'var(--shadow-lg)' }}>
            {personalInfo.fullName ? personalInfo.fullName.charAt(0) : 'A'}
          </div>
        </div>
      </section>

      {/* Skills Showcase */}
      {skills && skills.length > 0 && (
        <section style={{ padding: '3.5rem 0', backgroundColor: '#ffffff', borderBottom: '1px solid var(--border)' }}>
          <div className="container">
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Code2 color="var(--primary)" size={22} /> Skills & Technical Stack
            </h2>
            <div className="skills-pill-group">
              {skills.map((skill, index) => (
                <span key={skill.id || index} className="skill-pill" style={{ padding: '0.5rem 1rem', fontSize: '0.95rem' }}>
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Showcase */}
      {projects && projects.length > 0 && (
        <section style={{ padding: '4rem 0' }}>
          <div className="container">
            <h2 style={{ fontSize: '1.75rem', marginBottom: '2rem' }}>Featured Projects</h2>
            <div className="grid-3">
              {projects.map((proj, index) => (
                <div key={proj.id || index} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{proj.title}</h3>
                    <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '0.75rem' }}>
                      {proj.techStack}
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                      {proj.description}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                    {proj.projectUrl && (
                      <a href={proj.projectUrl} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">
                        Live Demo <ExternalLink size={14} />
                      </a>
                    )}
                    {proj.githubUrl && (
                      <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm">
                        Code <GithubIcon size={14} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Work Experience Timeline */}
      {workExperience && workExperience.length > 0 && (
        <section style={{ padding: '4rem 0', backgroundColor: '#ffffff', borderTop: '1px solid var(--border)' }}>
          <div className="container">
            <h2 style={{ fontSize: '1.75rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Briefcase color="var(--primary)" size={22} /> Work Experience
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {workExperience.map((exp, index) => (
                <div key={exp.id || index} className="card" style={{ borderLeft: '4px solid var(--primary)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.15rem' }}>{exp.role}</h3>
                    <span className="badge badge-secondary">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <div style={{ fontWeight: 600, color: 'var(--primary)', marginBottom: '0.75rem' }}>{exp.company} • {exp.location}</div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem' }}>{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Education & Certifications */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <div className="grid-3">
            {/* Education Card */}
            {education && education.length > 0 && (
              <div className="card">
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <GraduationCap color="var(--primary)" size={20} /> Education
                </h3>
                {education.map((edu, index) => (
                  <div key={edu.id || index} style={{ marginBottom: '1rem' }}>
                    <div style={{ fontWeight: 700 }}>{edu.degree}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{edu.institution} ({edu.startYear} - {edu.endYear})</div>
                    {edu.gpa && <div style={{ fontSize: '0.85rem', color: 'var(--primary)', marginTop: '0.2rem' }}>GPA: {edu.gpa}</div>}
                  </div>
                ))}
              </div>
            )}

            {/* Certifications Card */}
            {certifications && certifications.length > 0 && (
              <div className="card">
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Award color="var(--primary)" size={20} /> Certifications
                </h3>
                {certifications.map((cert, index) => (
                  <div key={cert.id || index} style={{ marginBottom: '0.85rem' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{cert.name}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{cert.issuer} ({cert.issueDate})</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
