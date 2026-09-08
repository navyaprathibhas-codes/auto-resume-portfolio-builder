import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { FileText, Globe, User, PlusCircle, Eye, CheckCircle2, Clock, ArrowRight, Sparkles } from 'lucide-react';

export const Dashboard = () => {
  const { user, resumeData } = useApp();

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem' }}>
      {/* Welcome Header */}
      <div style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem' }}>Welcome back, {user.name}! 👋</h1>
          <p className="subtitle">Manage your resume profiles and web portfolio showcase.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link to="/builder" className="btn btn-primary">
            <PlusCircle size={18} />
            Create Resume
          </Link>
          <Link to="/portfolio" className="btn btn-secondary">
            <Globe size={18} />
            View Portfolio
          </Link>
        </div>
      </div>

      {/* Grid of Summary & Status Cards */}
      <div className="grid-3" style={{ marginBottom: '2.5rem' }}>
        {/* Profile Summary Card */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem' }}>Profile Overview</h3>
              <span className="badge badge-primary">Active</span>
            </div>
          </div>
          <div style={{ fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-muted)' }}>
            <div><strong>Email:</strong> {user.email || 'Not provided'}</div>
            <div><strong>Phone:</strong> {user.phone || 'Not provided'}</div>
            <div><strong>Location:</strong> {user.location || 'Not set'}</div>
          </div>
          <div style={{ marginTop: '1.5rem' }}>
            <Link to="/profile" className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
              Edit Profile Details
            </Link>
          </div>
        </div>

        {/* Resume Status Card */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileText size={22} />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '1.1rem' }}>ATS Resume</h3>
              <span className="badge badge-success">Ready</span>
            </div>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            Targeting: <strong>{resumeData.careerInfo.targetRole || 'Software Engineer'}</strong>
          </p>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Link to="/builder" className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
              <FileText size={16} /> Edit Resume
            </Link>
            <Link to="/preview" className="btn btn-primary btn-sm" style={{ flex: 1 }}>
              <Eye size={16} /> View Resume
            </Link>
          </div>
        </div>

        {/* Portfolio Status Card */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: '#ecfdf5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Globe size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem' }}>Web Portfolio</h3>
              <span className="badge badge-success">Published</span>
            </div>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            Live preview available for recruiters and hiring managers.
          </p>
          <div>
            <Link to="/portfolio" className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
              <Globe size={16} /> Create / Preview Portfolio
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Action Banner */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)', color: '#ffffff', padding: '2.5rem' }}>
        <div style={{ maxWidth: '650px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.2)', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.85rem', marginBottom: '1rem' }}>
            <Sparkles size={16} /> Instant Resume Optimization
          </div>
          <h2 style={{ color: '#ffffff', fontSize: '1.75rem', marginBottom: '0.75rem' }}>Ready to update your credentials?</h2>
          <p style={{ color: '#c7d2fe', fontSize: '1rem', marginBottom: '1.5rem' }}>
            Add new projects, skills, or certifications in our 8-step builder and keep your resume up to date.
          </p>
          <Link to="/builder" className="btn btn-secondary" style={{ backgroundColor: '#ffffff', color: 'var(--primary)', border: 'none' }}>
            Open 8-Step Resume Builder <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};
