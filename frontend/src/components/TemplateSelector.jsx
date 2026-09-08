import React from 'react';
import { Layout, CheckCircle, Sparkles, Shield, AlignLeft } from 'lucide-react';

const templates = [
  {
    id: 'modern',
    name: 'Modern Template',
    tagline: 'Clean & ATS-Optimized',
    description: 'Indigo accent headers, balanced layout, ideal for tech & software roles.',
    icon: Sparkles,
    color: '#4f46e5'
  },
  {
    id: 'executive',
    name: 'Executive Template',
    tagline: 'Corporate & Professional',
    description: 'Dark slate headers, traditional structure, ideal for senior & management roles.',
    icon: Shield,
    color: '#0f172a'
  },
  {
    id: 'minimalist',
    name: 'Minimalist Template',
    tagline: 'Sleek & Monospaced',
    description: 'Pure black & white, compact monospaced layout, 100% focused on content readability.',
    icon: AlignLeft,
    color: '#374151'
  }
];

export const TemplateSelector = ({ selectedTemplate = 'modern', onSelectTemplate }) => {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <Layout size={20} color="var(--primary)" />
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Choose Resume Template Layout</h3>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
        {templates.map((tpl) => {
          const isSelected = selectedTemplate === tpl.id;
          const IconComp = tpl.icon;

          return (
            <div
              key={tpl.id}
              onClick={() => onSelectTemplate && onSelectTemplate(tpl.id)}
              className="card"
              style={{
                cursor: 'pointer',
                padding: '1.25rem',
                border: isSelected ? `2px solid ${tpl.color}` : '1px solid var(--border)',
                backgroundColor: isSelected ? '#f8fafc' : '#ffffff',
                boxShadow: isSelected ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                position: 'relative',
                transition: 'all 0.2s ease-in-out'
              }}
            >
              {isSelected && (
                <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', color: tpl.color }}>
                  <CheckCircle size={20} />
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '6px', backgroundColor: '#eeeffe', color: tpl.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <IconComp size={18} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>{tpl.name}</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>{tpl.tagline}</span>
                </div>
              </div>

              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', margin: 0, lineHeight: '1.4' }}>
                {tpl.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
