import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { FileText, LayoutDashboard, User, Eye, Globe, Sparkles, LogOut, LogIn, UserPlus } from 'lucide-react';

export const Navbar = () => {
  const { isLoggedIn, logoutUser, user } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="brand-logo">
          <Sparkles size={24} className="brand-icon" style={{ color: 'var(--primary)' }} />
          <span>ResumeCraft</span> AI
        </Link>

        {/* Desktop Nav Links */}
        <div className="nav-links" style={{ display: 'flex', alignItems: 'center' }}>
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Home
          </NavLink>
          {isLoggedIn && (
            <>
              <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <LayoutDashboard size={16} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                Dashboard
              </NavLink>
              <NavLink to="/builder" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <FileText size={16} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                Builder
              </NavLink>
              <NavLink to="/preview" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <Eye size={16} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                Resume
              </NavLink>
              <NavLink to="/portfolio" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <Globe size={16} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                Portfolio
              </NavLink>
              <NavLink to="/profile" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <User size={16} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                Profile
              </NavLink>
            </>
          )}
        </div>

        {/* Right Action Buttons */}
        <div className="nav-actions">
          {isLoggedIn ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--dark)' }}>
                {user ? user.name : 'User'}
              </span>
              <button onClick={handleLogout} className="btn btn-secondary btn-sm" title="Log Out">
                <LogOut size={16} />
                Logout
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Link to="/login" className="btn btn-secondary btn-sm">
                <LogIn size={16} />
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                <UserPlus size={16} />
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
