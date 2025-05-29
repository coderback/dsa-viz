'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import ModuleSelector from '../components/ModuleSelector';
import ControlPanel from '../components/ControlPanel';
import EducationPanel from '../components/EducationPanel';
import { VizProvider } from '../context/VizContext';

const VisualizationCanvas = dynamic(
  () => import('../components/VisualizationCanvas'),
  { ssr: false }
);

export default function HomePage() {
  return (
    <VizProvider>
      <div className="h-full flex">
        {/* Left */}
        <aside className="w-1/4 h-full p-4 bg-gray-100 overflow-y-auto">
          <ModuleSelector />
        </aside>

        {/* Middle */}
        <div className="w-1/2 h-full flex flex-col">
          <div className="h-2/3 p-4">
            <VisualizationCanvas />
          </div>
          <div className="h-1/3 p-4 bg-gray-100 overflow-y-auto">
            <ControlPanel />
          </div>
        </div>

        {/* Right */}
        <aside className="w-1/4 h-full p-4 bg-gray-50 border-l overflow-y-auto">
          <EducationPanel />
        </aside>
      </div>
    </VizProvider>
  );
}
