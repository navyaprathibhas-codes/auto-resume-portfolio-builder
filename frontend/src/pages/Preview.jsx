import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { TemplateSelector } from '../components/TemplateSelector';
import { ResumeTemplates } from '../components/ResumeTemplates';
import { Printer, Edit3, Globe, Save, CheckCircle2 } from 'lucide-react';

export const Preview = () => {
  const { resumeData, setResumeData, saveResumeToBackend } = useApp();
  const [saveToast, setSaveToast] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const currentTemplate = resumeData.template || 'modern';

  const handleTemplateChange = async (newTemplateId) => {
    const updatedResume = { ...resumeData, template: newTemplateId };
    setResumeData(updatedResume);
    try {
      setIsSaving(true);
      await saveResumeToBackend(updatedResume);
      setSaveToast(true);
      setTimeout(() => setSaveToast(false), 3000);
    } catch (err) {
      console.error('Failed to save template selection:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container" style={{ padding: '2rem 1.5rem' }}>
      {/* Top Action Bar */}
      <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem' }}>Resume Preview & Template Selector</h1>
          <p className="subtitle" style={{ fontSize: '0.9rem' }}>Choose your layout and export PDF</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link to="/builder" className="btn btn-secondary btn-sm">
            <Edit3 size={16} /> Edit Data
          </Link>
          <Link to="/portfolio" className="btn btn-secondary btn-sm">
            <Globe size={16} /> Portfolio View
          </Link>
          <button onClick={handlePrint} className="btn btn-primary btn-sm">
            <Printer size={16} /> Print / Save PDF
          </button>
        </div>
      </div>

      {saveToast && (
        <div className="alert alert-success no-print">
          <CheckCircle2 size={18} />
          <span>Template selection saved to backend storage!</span>
        </div>
      )}

      {/* Visual Template Selector (Hidden during PDF print) */}
      <div className="no-print">
        <TemplateSelector
          selectedTemplate={currentTemplate}
          onSelectTemplate={handleTemplateChange}
        />
      </div>

      {/* Render Selected Resume Template */}
      <ResumeTemplates template={currentTemplate} resumeData={resumeData} />
    </div>
  );
};
