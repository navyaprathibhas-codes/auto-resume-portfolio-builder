import React from 'react';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from './Icons';

// 1. MODERN TEMPLATE
export const ModernTemplate = ({ resumeData }) => {
  const { personalInfo = {}, careerInfo = {}, education = [], skills = [], projects = [], workExperience = [], certifications = [], achievements = [] } = resumeData;

  return (
    <div className="resume-paper resume-modern">
      <div className="resume-header">
        <h1 className="resume-name">{personalInfo.fullName || 'Your Name'}</h1>
        <div className="resume-target">{careerInfo.targetRole || 'Software Engineer'}</div>

        <div className="resume-contact">
          {personalInfo.email && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Mail size={14} /> {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Phone size={14} /> {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={14} /> {personalInfo.location}
            </span>
          )}
          {personalInfo.linkedin && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <LinkedinIcon size={14} /> {personalInfo.linkedin}
            </span>
          )}
          {personalInfo.github && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <GithubIcon size={14} /> {personalInfo.github}
            </span>
          )}
        </div>
      </div>

      {careerInfo.professionalSummary && (
        <div className="resume-section">
          <h3 className="resume-section-title">Professional Summary</h3>
          <p style={{ fontSize: '0.95rem', color: '#374151' }}>{careerInfo.professionalSummary}</p>
        </div>
      )}

      {skills && skills.length > 0 && (
        <div className="resume-section">
          <h3 className="resume-section-title">Skills & Competencies</h3>
          <div className="skills-pill-group">
            {skills.map((skill, index) => (
              <span key={skill.id || index} className="skill-pill">
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {workExperience && workExperience.length > 0 && (
        <div className="resume-section">
          <h3 className="resume-section-title">Work Experience</h3>
          {workExperience.map((exp, index) => (
            <div key={exp.id || index} style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1rem' }}>
                <span>{exp.role} — <span style={{ color: 'var(--primary)' }}>{exp.company}</span></span>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{exp.startDate} - {exp.endDate}</span>
              </div>
              {exp.location && <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>{exp.location}</div>}
              <p style={{ fontSize: '0.9rem', color: '#374151', whiteSpace: 'pre-line' }}>{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {projects && projects.length > 0 && (
        <div className="resume-section">
          <h3 className="resume-section-title">Key Projects</h3>
          {projects.map((proj, index) => (
            <div key={proj.id || index} style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 700, fontSize: '0.98rem' }}>{proj.title}</span>
                <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>{proj.techStack}</span>
              </div>
              <p style={{ fontSize: '0.9rem', color: '#374151', margin: '0.25rem 0' }}>{proj.description}</p>
            </div>
          ))}
        </div>
      )}

      {education && education.length > 0 && (
        <div className="resume-section">
          <h3 className="resume-section-title">Education</h3>
          {education.map((edu, index) => (
            <div key={edu.id || index} style={{ marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontWeight: 700 }}>{edu.degree}</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{edu.institution} {edu.gpa ? `• GPA: ${edu.gpa}` : ''}</div>
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                {edu.startYear} - {edu.endYear}
              </div>
            </div>
          ))}
        </div>
      )}

      {certifications && certifications.length > 0 && (
        <div className="resume-section">
          <h3 className="resume-section-title">Certifications</h3>
          {certifications.map((cert, index) => (
            <div key={cert.id || index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.9rem' }}>
              <span><strong>{cert.name}</strong> — {cert.issuer}</span>
              <span style={{ color: 'var(--text-muted)' }}>{cert.issueDate}</span>
            </div>
          ))}
        </div>
      )}

      {achievements && achievements.length > 0 && (
        <div className="resume-section" style={{ marginBottom: 0 }}>
          <h3 className="resume-section-title">Honors & Achievements</h3>
          {achievements.map((ach, index) => (
            <div key={ach.id || index} style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>
              <div style={{ fontWeight: 700 }}>{ach.title} <span style={{ fontWeight: 400, color: 'var(--text-muted)', fontSize: '0.85rem' }}>({ach.date})</span></div>
              <div style={{ color: '#374151' }}>{ach.description}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// 2. EXECUTIVE TEMPLATE
export const ExecutiveTemplate = ({ resumeData }) => {
  const { personalInfo = {}, careerInfo = {}, education = [], skills = [], projects = [], workExperience = [], certifications = [], achievements = [] } = resumeData;

  return (
    <div className="resume-paper resume-executive" style={{ borderTop: '6px solid #1e293b' }}>
      <div style={{ textAlign: 'center', paddingBottom: '1.5rem', marginBottom: '1.75rem', borderBottom: '2px double #cbd5e1' }}>
        <h1 style={{ fontSize: '2.4rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0f172a', fontWeight: 800 }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div style={{ fontSize: '1.1rem', color: '#475569', fontWeight: 700, letterSpacing: '0.05em', marginTop: '0.25rem', textTransform: 'uppercase' }}>
          {careerInfo.targetRole || 'Software Engineer'}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap', marginTop: '0.75rem', fontSize: '0.875rem', color: '#475569' }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
        </div>
      </div>

      {careerInfo.professionalSummary && (
        <div className="resume-section">
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, textTransform: 'uppercase', color: '#0f172a', borderBottom: '1.5px solid #0f172a', paddingBottom: '0.2rem', marginBottom: '0.65rem' }}>
            Executive Profile
          </h3>
          <p style={{ fontSize: '0.95rem', color: '#334155', lineHeight: '1.6' }}>{careerInfo.professionalSummary}</p>
        </div>
      )}

      {workExperience && workExperience.length > 0 && (
        <div className="resume-section">
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, textTransform: 'uppercase', color: '#0f172a', borderBottom: '1.5px solid #0f172a', paddingBottom: '0.2rem', marginBottom: '0.65rem' }}>
            Professional Experience
          </h3>
          {workExperience.map((exp, index) => (
            <div key={exp.id || index} style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', fontWeight: 700 }}>
                <span>{exp.company} — <span style={{ fontStyle: 'italic', fontWeight: 600 }}>{exp.role}</span></span>
                <span style={{ fontSize: '0.875rem', color: '#64748b' }}>{exp.startDate} - {exp.endDate}</span>
              </div>
              <p style={{ fontSize: '0.9rem', color: '#334155', marginTop: '0.3rem' }}>{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {skills && skills.length > 0 && (
        <div className="resume-section">
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, textTransform: 'uppercase', color: '#0f172a', borderBottom: '1.5px solid #0f172a', paddingBottom: '0.2rem', marginBottom: '0.65rem' }}>
            Core Competencies & Skills
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', fontSize: '0.9rem', color: '#1e293b', fontWeight: 600 }}>
            {skills.map((skill, index) => (
              <span key={skill.id || index} style={{ background: '#f1f5f9', padding: '0.3rem 0.65rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}>
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {projects && projects.length > 0 && (
        <div className="resume-section">
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, textTransform: 'uppercase', color: '#0f172a', borderBottom: '1.5px solid #0f172a', paddingBottom: '0.2rem', marginBottom: '0.65rem' }}>
            Key Projects & Initiatives
          </h3>
          {projects.map((proj, index) => (
            <div key={proj.id || index} style={{ marginBottom: '1rem' }}>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{proj.title} <span style={{ fontWeight: 400, color: '#64748b', fontSize: '0.85rem' }}>({proj.techStack})</span></div>
              <p style={{ fontSize: '0.9rem', color: '#334155' }}>{proj.description}</p>
            </div>
          ))}
        </div>
      )}

      {education && education.length > 0 && (
        <div className="resume-section">
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, textTransform: 'uppercase', color: '#0f172a', borderBottom: '1.5px solid #0f172a', paddingBottom: '0.2rem', marginBottom: '0.65rem' }}>
            Education
          </h3>
          {education.map((edu, index) => (
            <div key={edu.id || index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
              <span><strong>{edu.degree}</strong>, {edu.institution}</span>
              <span style={{ color: '#64748b' }}>{edu.startYear} - {edu.endYear}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// 3. MINIMALIST TEMPLATE
export const MinimalistTemplate = ({ resumeData }) => {
  const { personalInfo = {}, careerInfo = {}, education = [], skills = [], projects = [], workExperience = [], certifications = [], achievements = [] } = resumeData;

  return (
    <div className="resume-paper resume-minimalist" style={{ fontFamily: '"Courier New", Courier, monospace', lineHeight: '1.4' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div style={{ fontSize: '1rem', fontWeight: 600, marginTop: '0.2rem' }}>
          {careerInfo.targetRole || 'Software Engineer'}
        </div>
        <div style={{ fontSize: '0.85rem', color: '#4b5563', marginTop: '0.4rem' }}>
          {[personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.linkedin, personalInfo.github].filter(Boolean).join(' | ')}
        </div>
      </div>

      {careerInfo.professionalSummary && (
        <div className="resume-section" style={{ marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #000', paddingBottom: '0.1rem', marginBottom: '0.5rem' }}>
            01. SUMMARY
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#111827' }}>{careerInfo.professionalSummary}</p>
        </div>
      )}

      {skills && skills.length > 0 && (
        <div className="resume-section" style={{ marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #000', paddingBottom: '0.1rem', marginBottom: '0.5rem' }}>
            02. TECHNICAL SKILLS
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#111827' }}>
            {skills.map((s) => s.name).join(' • ')}
          </p>
        </div>
      )}

      {workExperience && workExperience.length > 0 && (
        <div className="resume-section" style={{ marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #000', paddingBottom: '0.1rem', marginBottom: '0.5rem' }}>
            03. EXPERIENCE
          </h3>
          {workExperience.map((exp, index) => (
            <div key={exp.id || index} style={{ marginBottom: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.9rem' }}>
                <span>{exp.role} @ {exp.company}</span>
                <span>{exp.startDate} - {exp.endDate}</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#111827', marginTop: '0.2rem' }}>{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {projects && projects.length > 0 && (
        <div className="resume-section" style={{ marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #000', paddingBottom: '0.1rem', marginBottom: '0.5rem' }}>
            04. PROJECTS
          </h3>
          {projects.map((proj, index) => (
            <div key={proj.id || index} style={{ marginBottom: '0.75rem' }}>
              <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>{proj.title} [{proj.techStack}]</div>
              <p style={{ fontSize: '0.85rem', color: '#111827' }}>{proj.description}</p>
            </div>
          ))}
        </div>
      )}

      {education && education.length > 0 && (
        <div className="resume-section">
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #000', paddingBottom: '0.1rem', marginBottom: '0.5rem' }}>
            05. EDUCATION
          </h3>
          {education.map((edu, index) => (
            <div key={edu.id || index} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
              <span>{edu.degree} - {edu.institution}</span>
              <span>{edu.startYear} - {edu.endYear}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Main Dynamic Wrapper
export const ResumeTemplates = ({ template = 'modern', resumeData }) => {
  switch (template) {
    case 'executive':
      return <ExecutiveTemplate resumeData={resumeData} />;
    case 'minimalist':
      return <MinimalistTemplate resumeData={resumeData} />;
    case 'modern':
    default:
      return <ModernTemplate resumeData={resumeData} />;
  }
};
