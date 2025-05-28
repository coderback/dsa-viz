'use client';
import React from 'react';
import { useViz } from '../context/VizContext';

export default function EducationPanel() {
  const { currentModule, currentStep } = useViz();
  const explanation = currentModule.explanation || [];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Education Mode</h2>
      <div>
        <h3 className="font-medium">Code</h3>
        <pre className="mt-1 p-2 bg-gray-100 rounded text-sm overflow-auto">
          {currentModule.sourceCode || '// Source code unavailable.'}
        </pre>
      </div>
      <div>
        <h3 className="font-medium">Explanation</h3>
        <div className="mt-1 text-sm">
          {explanation.length > 0 ? (
            <p>{explanation[Math.min(currentStep, explanation.length - 1)]}</p>
          ) : (
            <p>Step-by-step explanation will appear here.</p>
          )}
        </div>
      </div>
    </div>
  );
}