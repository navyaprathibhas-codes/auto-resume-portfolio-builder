import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Stepper } from '../components/Stepper';
import { apiGenerateAIResume, apiEnhanceAIBullet } from '../services/api';
import { Plus, Trash2, ArrowRight, ArrowLeft, Save, Eye, CheckCircle2, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';

export const Builder = () => {
  const { resumeData, setResumeData, saveResumeToBackend, builderStep, setBuilderStep } = useApp();
  const navigate = useNavigate();

  const [saveToast, setSaveToast] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');
  const [aiSuccessMessage, setAiSuccessMessage] = useState('');
  const [enhancingIndex, setEnhancingIndex] = useState(null);

  const handleNext = () => {
    if (builderStep < 8) {
      setBuilderStep(builderStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (builderStep > 1) {
      setBuilderStep(builderStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await saveResumeToBackend();
      setSaveToast(true);
      setTimeout(() => setSaveToast(false), 3000);
    } catch (err) {
      console.error('Failed to save resume:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleGenerateAIResume = async () => {
    if (isAiLoading) return;
    try {
      setIsAiLoading(true);
      setAiError('');
      setAiSuccessMessage('');

      const res = await apiGenerateAIResume(resumeData);
      if (res.success && res.data) {
        const aiData = res.data;
        setResumeData((prev) => ({
          ...prev,
          careerInfo: {
            ...prev.careerInfo,
            professionalSummary: aiData.professionalSummary || prev.careerInfo.professionalSummary,
            careerObjective: aiData.careerObjective || prev.careerInfo.careerObjective
          },
          ...(aiData.improvedSkills && aiData.improvedSkills.length > 0 && {
            skills: aiData.improvedSkills.map((s, idx) => ({ id: `sk-ai-${idx}`, ...s }))
          })
        }));

        setAiSuccessMessage('Gemini AI successfully optimized your resume summary and skill suggestions!');
        setTimeout(() => setAiSuccessMessage(''), 5000);
      }
    } catch (err) {
      setAiError(err.message || 'Gemini AI generation failed.');
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleEnhanceBulletText = async (sectionKey, index, currentText) => {
    if (!currentText || isAiLoading) return;
    try {
      setEnhancingIndex(`${sectionKey}-${index}`);
      setAiError('');
      const targetRole = resumeData.careerInfo.targetRole || 'Software Engineer';
      const res = await apiEnhanceAIBullet(currentText, targetRole);
      if (res.data && res.data.enhancedBullet) {
        const updated = [...resumeData[sectionKey]];
        updated[index] = { ...updated[index], description: res.data.enhancedBullet };
        setResumeData((prev) => ({ ...prev, [sectionKey]: updated }));
      }
    } catch (err) {
      setAiError(err.message || 'Failed to enhance bullet text');
    } finally {
      setEnhancingIndex(null);
    }
  };

  // Helper state updaters
  const handlePersonalInfoChange = (field, value) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const handleCareerInfoChange = (field, value) => {
    setResumeData((prev) => ({
      ...prev,
      careerInfo: { ...prev.careerInfo, [field]: value }
    }));
  };

  const handleArrayItemChange = (sectionKey, index, field, value) => {
    const updated = [...resumeData[sectionKey]];
    updated[index] = { ...updated[index], [field]: value };
    setResumeData((prev) => ({ ...prev, [sectionKey]: updated }));
  };

  const handleAddItem = (sectionKey, newItemTemplate) => {
    const newItem = { id: `${sectionKey}-${Date.now()}`, ...newItemTemplate };
    setResumeData((prev) => ({
      ...prev,
      [sectionKey]: [...prev[sectionKey], newItem]
    }));
  };

  const handleRemoveItem = (sectionKey, index) => {
    const updated = resumeData[sectionKey].filter((_, i) => i !== index);
    setResumeData((prev) => ({ ...prev, [sectionKey]: updated }));
  };

  return (
    <div className="container-narrow" style={{ padding: '2rem 1.5rem' }}>
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem' }}>8-Step Resume Builder</h1>
          <p className="subtitle" style={{ fontSize: '0.95rem' }}>Fill out each section to generate your ATS resume</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={handleGenerateAIResume}
            className="btn btn-primary btn-sm"
            disabled={isAiLoading}
            style={{ background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' }}
          >
            {isAiLoading ? <RefreshCw size={16} className="spin" /> : <Sparkles size={16} />}
            {isAiLoading ? 'AI Generating...' : 'Optimize with Gemini AI'}
          </button>
          <button onClick={handleSave} className="btn btn-secondary btn-sm" disabled={isSaving}>
            <Save size={16} /> {isSaving ? 'Saving...' : 'Save'}
          </button>
          <button onClick={() => navigate('/preview')} className="btn btn-secondary btn-sm">
            <Eye size={16} /> Preview
          </button>
        </div>
      </div>

      {saveToast && (
        <div className="alert alert-success">
          <CheckCircle2 size={18} />
          <span>Resume draft saved successfully to backend storage!</span>
        </div>
      )}

      {aiSuccessMessage && (
        <div className="alert alert-success">
          <Sparkles size={18} />
          <span>{aiSuccessMessage}</span>
        </div>
      )}

      {aiError && (
        <div className="alert alert-danger">
          <AlertCircle size={18} />
          <span>{aiError}</span>
        </div>
      )}

      {/* Stepper Progress Bar */}
      <Stepper currentStep={builderStep} onStepClick={(step) => setBuilderStep(step)} />

      <div className="card" style={{ marginBottom: '2rem' }}>
        {/* Step 1: Personal Information */}
        {builderStep === 1 && (
          <div>
            <h2 className="card-title" style={{ marginBottom: '1.25rem' }}>Step 1: Personal Information</h2>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={resumeData.personalInfo.fullName || ''}
                  onChange={(e) => handlePersonalInfoChange('fullName', e.target.value)}
                  placeholder="e.g. Alex Morgan"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-input"
                  value={resumeData.personalInfo.email || ''}
                  onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                  placeholder="alex.morgan@example.com"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input
                  type="text"
                  className="form-input"
                  value={resumeData.personalInfo.phone || ''}
                  onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Location (City, State/Country)</label>
                <input
                  type="text"
                  className="form-input"
                  value={resumeData.personalInfo.location || ''}
                  onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
                  placeholder="San Francisco, CA"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">LinkedIn Profile URL</label>
                <input
                  type="text"
                  className="form-input"
                  value={resumeData.personalInfo.linkedin || ''}
                  onChange={(e) => handlePersonalInfoChange('linkedin', e.target.value)}
                  placeholder="linkedin.com/in/username"
                />
              </div>
              <div className="form-group">
                <label className="form-label">GitHub Profile URL</label>
                <input
                  type="text"
                  className="form-input"
                  value={resumeData.personalInfo.github || ''}
                  onChange={(e) => handlePersonalInfoChange('github', e.target.value)}
                  placeholder="github.com/username"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Portfolio Website URL</label>
              <input
                type="text"
                className="form-input"
                value={resumeData.personalInfo.portfolioWebsite || ''}
                onChange={(e) => handlePersonalInfoChange('portfolioWebsite', e.target.value)}
                placeholder="yourportfolio.dev"
              />
            </div>
          </div>
        )}

        {/* Step 2: Career Information */}
        {builderStep === 2 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 className="card-title">Step 2: Career Information</h2>
              <button
                type="button"
                onClick={handleGenerateAIResume}
                className="btn btn-outline btn-sm"
                disabled={isAiLoading}
              >
                <Sparkles size={14} /> Auto-Generate with Gemini AI
              </button>
            </div>

            <div className="form-group">
              <label className="form-label">Target Role / Job Title</label>
              <input
                type="text"
                className="form-input"
                value={resumeData.careerInfo.targetRole || ''}
                onChange={(e) => handleCareerInfoChange('targetRole', e.target.value)}
                placeholder="e.g. Full Stack Software Engineer"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Professional Summary</label>
              <textarea
                className="form-textarea"
                rows={4}
                value={resumeData.careerInfo.professionalSummary || ''}
                onChange={(e) => handleCareerInfoChange('professionalSummary', e.target.value)}
                placeholder="Summarize your technical strengths and career passions..."
              />
            </div>
            <div className="form-group">
              <label className="form-label">Career Objective</label>
              <textarea
                className="form-textarea"
                rows={3}
                value={resumeData.careerInfo.careerObjective || ''}
                onChange={(e) => handleCareerInfoChange('careerObjective', e.target.value)}
                placeholder="State your immediate career goals..."
              />
            </div>
          </div>
        )}

        {/* Step 3: Education */}
        {builderStep === 3 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 className="card-title">Step 3: Education</h2>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => handleAddItem('education', { degree: '', institution: '', fieldOfStudy: '', startYear: '', endYear: '', gpa: '' })}
              >
                <Plus size={16} /> Add Education
              </button>
            </div>

            {resumeData.education.map((item, index) => (
              <div key={item.id || index} className="entry-card">
                <div className="entry-card-header">
                  <strong>Education Entry #{index + 1}</strong>
                  {resumeData.education.length > 1 && (
                    <button type="button" className="btn btn-danger-outline btn-sm" onClick={() => handleRemoveItem('education', index)}>
                      <Trash2 size={16} /> Remove
                    </button>
                  )}
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Degree / Qualification</label>
                    <input
                      type="text"
                      className="form-input"
                      value={item.degree || ''}
                      onChange={(e) => handleArrayItemChange('education', index, 'degree', e.target.value)}
                      placeholder="B.S. in Computer Science"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Institution / University</label>
                    <input
                      type="text"
                      className="form-input"
                      value={item.institution || ''}
                      onChange={(e) => handleArrayItemChange('education', index, 'institution', e.target.value)}
                      placeholder="UC Berkeley"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Field of Study</label>
                    <input
                      type="text"
                      className="form-input"
                      value={item.fieldOfStudy || ''}
                      onChange={(e) => handleArrayItemChange('education', index, 'fieldOfStudy', e.target.value)}
                      placeholder="Computer Science"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Start Year</label>
                    <input
                      type="text"
                      className="form-input"
                      value={item.startYear || ''}
                      onChange={(e) => handleArrayItemChange('education', index, 'startYear', e.target.value)}
                      placeholder="2020"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">End Year</label>
                    <input
                      type="text"
                      className="form-input"
                      value={item.endYear || ''}
                      onChange={(e) => handleArrayItemChange('education', index, 'endYear', e.target.value)}
                      placeholder="2024"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">GPA (Optional)</label>
                    <input
                      type="text"
                      className="form-input"
                      value={item.gpa || ''}
                      onChange={(e) => handleArrayItemChange('education', index, 'gpa', e.target.value)}
                      placeholder="3.8 / 4.0"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Step 4: Skills */}
        {builderStep === 4 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 className="card-title">Step 4: Skills</h2>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => handleAddItem('skills', { name: '', category: 'Technical' })}
              >
                <Plus size={16} /> Add Skill
              </button>
            </div>

            {resumeData.skills.map((item, index) => (
              <div key={item.id || index} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.75rem' }}>
                <input
                  type="text"
                  className="form-input"
                  style={{ flex: 2 }}
                  placeholder="e.g. React.js, Python, PostgreSQL..."
                  value={item.name || ''}
                  onChange={(e) => handleArrayItemChange('skills', index, 'name', e.target.value)}
                />
                <select
                  className="form-select"
                  style={{ flex: 1 }}
                  value={item.category || 'Technical'}
                  onChange={(e) => handleArrayItemChange('skills', index, 'category', e.target.value)}
                >
                  <option value="Technical">Technical</option>
                  <option value="Tools">Tools & Frameworks</option>
                  <option value="Soft Skills">Soft Skills</option>
                </select>
                <button type="button" className="btn btn-danger-outline btn-sm" onClick={() => handleRemoveItem('skills', index)}>
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Step 5: Projects */}
        {builderStep === 5 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 className="card-title">Step 5: Projects</h2>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => handleAddItem('projects', { title: '', description: '', techStack: '', projectUrl: '', githubUrl: '' })}
              >
                <Plus size={16} /> Add Project
              </button>
            </div>

            {resumeData.projects.map((item, index) => (
              <div key={item.id || index} className="entry-card">
                <div className="entry-card-header">
                  <strong>Project #{index + 1}</strong>
                  {resumeData.projects.length > 1 && (
                    <button type="button" className="btn btn-danger-outline btn-sm" onClick={() => handleRemoveItem('projects', index)}>
                      <Trash2 size={16} /> Remove
                    </button>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label">Project Title</label>
                  <input
                    type="text"
                    className="form-input"
                    value={item.title || ''}
                    onChange={(e) => handleArrayItemChange('projects', index, 'title', e.target.value)}
                    placeholder="AI Resume Builder"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Tech Stack</label>
                  <input
                    type="text"
                    className="form-input"
                    value={item.techStack || ''}
                    onChange={(e) => handleArrayItemChange('projects', index, 'techStack', e.target.value)}
                    placeholder="React, Node.js, Express, CSS"
                  />
                </div>
                <div className="form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                    <label className="form-label" style={{ margin: 0 }}>Description / Features</label>
                    <button
                      type="button"
                      className="btn btn-outline btn-sm"
                      style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}
                      onClick={() => handleEnhanceBulletText('projects', index, item.description)}
                      disabled={enhancingIndex === `projects-${index}`}
                    >
                      <Sparkles size={12} /> {enhancingIndex === `projects-${index}` ? 'AI Enhancing...' : 'Enhance with AI'}
                    </button>
                  </div>
                  <textarea
                    className="form-textarea"
                    rows={3}
                    value={item.description || ''}
                    onChange={(e) => handleArrayItemChange('projects', index, 'description', e.target.value)}
                    placeholder="Describe problem solved, features built..."
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Step 6: Work Experience */}
        {builderStep === 6 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 className="card-title">Step 6: Work Experience</h2>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => handleAddItem('workExperience', { company: '', role: '', location: '', startDate: '', endDate: '', description: '' })}
              >
                <Plus size={16} /> Add Experience
              </button>
            </div>

            {resumeData.workExperience.map((item, index) => (
              <div key={item.id || index} className="entry-card">
                <div className="entry-card-header">
                  <strong>Work Experience #{index + 1}</strong>
                  {resumeData.workExperience.length > 1 && (
                    <button type="button" className="btn btn-danger-outline btn-sm" onClick={() => handleRemoveItem('workExperience', index)}>
                      <Trash2 size={16} /> Remove
                    </button>
                  )}
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Company</label>
                    <input
                      type="text"
                      className="form-input"
                      value={item.company || ''}
                      onChange={(e) => handleArrayItemChange('workExperience', index, 'company', e.target.value)}
                      placeholder="e.g. Google, Tech Startup..."
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Job Role</label>
                    <input
                      type="text"
                      className="form-input"
                      value={item.role || ''}
                      onChange={(e) => handleArrayItemChange('workExperience', index, 'role', e.target.value)}
                      placeholder="Frontend Developer Intern"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                    <label className="form-label" style={{ margin: 0 }}>Impact & Bullet Points</label>
                    <button
                      type="button"
                      className="btn btn-outline btn-sm"
                      style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}
                      onClick={() => handleEnhanceBulletText('workExperience', index, item.description)}
                      disabled={enhancingIndex === `workExperience-${index}`}
                    >
                      <Sparkles size={12} /> {enhancingIndex === `workExperience-${index}` ? 'AI Enhancing...' : 'Enhance with AI'}
                    </button>
                  </div>
                  <textarea
                    className="form-textarea"
                    rows={3}
                    value={item.description || ''}
                    onChange={(e) => handleArrayItemChange('workExperience', index, 'description', e.target.value)}
                    placeholder="Highlight responsibilities and achievements..."
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Step 7: Certifications */}
        {builderStep === 7 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 className="card-title">Step 7: Certifications</h2>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => handleAddItem('certifications', { name: '', issuer: '', issueDate: '', credentialUrl: '' })}
              >
                <Plus size={16} /> Add Certification
              </button>
            </div>

            {resumeData.certifications.map((item, index) => (
              <div key={item.id || index} className="entry-card">
                <div className="entry-card-header">
                  <strong>Certification #{index + 1}</strong>
                  {resumeData.certifications.length > 1 && (
                    <button type="button" className="btn btn-danger-outline btn-sm" onClick={() => handleRemoveItem('certifications', index)}>
                      <Trash2 size={16} /> Remove
                    </button>
                  )}
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Certification Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={item.name || ''}
                      onChange={(e) => handleArrayItemChange('certifications', index, 'name', e.target.value)}
                      placeholder="AWS Certified Developer"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Issuer</label>
                    <input
                      type="text"
                      className="form-input"
                      value={item.issuer || ''}
                      onChange={(e) => handleArrayItemChange('certifications', index, 'issuer', e.target.value)}
                      placeholder="Amazon Web Services"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Step 8: Achievements */}
        {builderStep === 8 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 className="card-title">Step 8: Achievements & Honors</h2>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => handleAddItem('achievements', { title: '', description: '', date: '' })}
              >
                <Plus size={16} /> Add Achievement
              </button>
            </div>

            {resumeData.achievements.map((item, index) => (
              <div key={item.id || index} className="entry-card">
                <div className="entry-card-header">
                  <strong>Achievement #{index + 1}</strong>
                  {resumeData.achievements.length > 1 && (
                    <button type="button" className="btn btn-danger-outline btn-sm" onClick={() => handleRemoveItem('achievements', index)}>
                      <Trash2 size={16} /> Remove
                    </button>
                  )}
                </div>
                <div className="form-row">
                  <div className="form-group" style={{ flex: 2 }}>
                    <label className="form-label">Title / Honor</label>
                    <input
                      type="text"
                      className="form-input"
                      value={item.title || ''}
                      onChange={(e) => handleArrayItemChange('achievements', index, 'title', e.target.value)}
                      placeholder="1st Place - National Hackathon 2023"
                    />
                  </div>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">Date</label>
                    <input
                      type="text"
                      className="form-input"
                      value={item.date || ''}
                      onChange={(e) => handleArrayItemChange('achievements', index, 'date', e.target.value)}
                      placeholder="Nov 2023"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-textarea"
                    rows={2}
                    value={item.description || ''}
                    onChange={(e) => handleArrayItemChange('achievements', index, 'description', e.target.value)}
                    placeholder="Awarded top honors for software design..."
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Step Navigation Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handlePrev}
            disabled={builderStep === 1}
          >
            <ArrowLeft size={18} /> Previous
          </button>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button type="button" className="btn btn-secondary" onClick={handleSave} disabled={isSaving}>
              <Save size={18} /> {isSaving ? 'Saving...' : 'Save Progress'}
            </button>

            {builderStep < 8 ? (
              <button type="button" className="btn btn-primary" onClick={handleNext}>
                Next Step <ArrowRight size={18} />
              </button>
            ) : (
              <button type="button" className="btn btn-primary" onClick={() => navigate('/preview')}>
                Finish & Preview <Eye size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
