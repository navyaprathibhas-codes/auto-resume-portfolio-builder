import React from 'react';
import { Check } from 'lucide-react';

const steps = [
  { id: 1, title: 'Personal Info' },
  { id: 2, title: 'Career Info' },
  { id: 3, title: 'Education' },
  { id: 4, title: 'Skills' },
  { id: 5, title: 'Projects' },
  { id: 6, title: 'Experience' },
  { id: 7, title: 'Certifications' },
  { id: 8, title: 'Achievements' }
];

export const Stepper = ({ currentStep, onStepClick }) => {
  return (
    <div className="stepper-container">
      <div className="stepper-steps">
        {steps.map((step) => {
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;

          return (
            <button
              key={step.id}
              onClick={() => onStepClick && onStepClick(step.id)}
              className={`stepper-step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
            >
              <div className="step-bubble">
                {isCompleted ? <Check size={18} /> : step.id}
              </div>
              <span className="step-title">{step.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
