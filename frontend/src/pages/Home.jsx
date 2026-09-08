import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, FileText, Globe, Zap, Shield, CheckCircle, ArrowRight, Star } from 'lucide-react';
import { Footer } from '../components/Footer';

export const Home = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="badge badge-primary" style={{ marginBottom: '1.25rem' }}>
            <Sparkles size={14} style={{ marginRight: '4px' }} /> Next-Gen AI Resume & Portfolio Builder
          </div>
          <h1 className="hero-title">
            Create a professional resume and portfolio with AI.
          </h1>
          <p className="hero-desc">
            Land your dream tech job with ATS-optimized resume templates and an impressive interactive portfolio webpage tailored to your skills.
          </p>
          <div className="hero-ctas">
            <Link to="/builder" className="btn btn-primary btn-lg">
              <FileText size={20} />
              Build My Resume
            </Link>
            <Link to="/portfolio" className="btn btn-secondary btn-lg">
              <Globe size={20} />
              Create Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section style={{ padding: '5rem 0', backgroundColor: '#ffffff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2>Designed for Students & Job Seekers</h2>
            <p className="subtitle">Everything you need to showcase your work and get hired faster.</p>
          </div>

          <div className="grid-3">
            <div className="card feature-card">
              <div className="feature-icon">
                <FileText size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>ATS-Friendly Resumes</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                Clean, battle-tested templates designed to pass Applicant Tracking Systems with high scores.
              </p>
            </div>

            <div className="card feature-card">
              <div className="feature-icon" style={{ backgroundColor: '#e0f2fe', color: '#0284c7' }}>
                <Globe size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Instant Web Portfolio</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                Automatically turn your resume data into a modern, responsive personal website to show recruiters.
              </p>
            </div>

            <div className="card feature-card">
              <div className="feature-icon" style={{ backgroundColor: '#fef3c7', color: '#d97706' }}>
                <Zap size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>8-Step Guided Builder</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                Structured step-by-step editor covering education, skills, projects, certifications, and achievements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--light)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2>How It Works</h2>
            <p className="subtitle">Build your professional profile in 3 simple steps</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            <div className="card" style={{ textStyle: 'center', position: 'relative' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--primary-light)', position: 'absolute', top: '1rem', right: '1.5rem' }}>01</div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.75rem' }}>Enter Your Details</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Fill out our structured 8-step builder with your education, projects, skills, and experience.
              </p>
            </div>

            <div className="card" style={{ textStyle: 'center', position: 'relative' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--primary-light)', position: 'absolute', top: '1rem', right: '1.5rem' }}>02</div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.75rem' }}>Preview & Customize</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Instant live preview of your formatted resume document and interactive portfolio layout.
              </p>
            </div>

            <div className="card" style={{ textStyle: 'center', position: 'relative' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--primary-light)', position: 'absolute', top: '1rem', right: '1.5rem' }}>03</div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.75rem' }}>Export & Share</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Download your PDF resume ready for application submissions and publish your portfolio link.
              </p>
            </div>
          </div>

          <div style={{ marginTop: '3.5rem', textAlign: 'center' }}>
            <Link to="/builder" className="btn btn-primary btn-lg">
              Start Building Now <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
