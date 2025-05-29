'use client';
import React from 'react';
import { useViz } from '../context/VizContext';

export default function EducationPanel() {
  const { currentModule, currentStep } = useViz();
  const explanation = currentModule.explanation || [];

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Code</h2>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl text-sm overflow-auto">
        {currentModule.sourceCode || '// no code available'}
      </pre>

      <h2 className="text-lg font-semibold">Explanation</h2>
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl text-sm">
        <p>
          {explanation.length
            ? explanation[Math.min(currentStep, explanation.length - 1)]
            : 'Step-by-step explanation will appear here.'}
        </p>
      </div>
    </div>
  );
}
