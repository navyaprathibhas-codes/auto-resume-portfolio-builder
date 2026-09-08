import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Save, CheckCircle2, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../components/Icons';

export const Profile = () => {
  const { user, setUser } = useApp();
  const [formData, setFormData] = useState({ ...user });
  const [toast, setToast] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(formData);
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  return (
    <div className="container-narrow" style={{ padding: '2.5rem 1.5rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem' }}>Profile Settings</h1>
        <p className="subtitle" style={{ fontSize: '0.95rem' }}>Manage your personal details and online profile links</p>
      </div>

      {toast && (
        <div className="alert alert-success">
          <CheckCircle2 size={18} />
          <span>Profile details updated successfully!</span>
        </div>
      )}

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                value={formData.name || ''}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Alex Morgan"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                value={formData.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
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
                value={formData.phone || ''}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+1 (555) 234-5678"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Location (City, State/Country)</label>
              <input
                type="text"
                className="form-input"
                value={formData.location || ''}
                onChange={(e) => handleChange('location', e.target.value)}
                placeholder="San Francisco, CA"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">LinkedIn Profile URL</label>
            <input
              type="text"
              className="form-input"
              value={formData.linkedin || ''}
              onChange={(e) => handleChange('linkedin', e.target.value)}
              placeholder="linkedin.com/in/alexmorgan"
            />
          </div>

          <div className="form-group">
            <label className="form-label">GitHub Username / URL</label>
            <input
              type="text"
              className="form-input"
              value={formData.github || ''}
              onChange={(e) => handleChange('github', e.target.value)}
              placeholder="github.com/alexmorgan"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Personal Website URL</label>
            <input
              type="text"
              className="form-input"
              value={formData.website || ''}
              onChange={(e) => handleChange('website', e.target.value)}
              placeholder="alexmorgan.dev"
            />
          </div>

          <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn btn-primary">
              <Save size={18} /> Save Profile Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
