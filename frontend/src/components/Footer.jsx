import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.2rem', fontWeight: 700, color: 'var(--dark)' }}>
          <Sparkles size={20} color="var(--primary)" />
          ResumeCraft AI
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/" style={{ color: 'var(--text-muted)' }}>Home</Link>
          <Link to="/builder" style={{ color: 'var(--text-muted)' }}>Resume Builder</Link>
          <Link to="/portfolio" style={{ color: 'var(--text-muted)' }}>Portfolio Showcase</Link>
          <Link to="/login" style={{ color: 'var(--text-muted)' }}>Sign In</Link>
          <Link to="/register" style={{ color: 'var(--text-muted)' }}>Register</Link>
        </div>

        <p style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>
          © {new Date().getFullYear()} ResumeCraft AI. Built for students and job seekers.
        </p>
      </div>
    </footer>
  );
};
