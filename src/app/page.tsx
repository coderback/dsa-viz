import React from 'react';
import dynamic from 'next/dynamic';

import ControlPanel from '../components/ControlPanel';
const VisualizationCanvas = dynamic(() => import('../components/VisualizationCanvas'), { ssr: false });
import EducationPanel from '../components/EducationPanel';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-4 bg-indigo-600 text-white text-2xl font-semibold">
        DS & ML Visualization Tool
      </header>

      {/* Main Content */}
      <main className="flex flex-1 overflow-hidden">
        {/* Left: Controls */}
        <aside className="w-1/4 p-4 bg-gray-100 overflow-y-auto">
          <ControlPanel />
        </aside>

        {/* Center: Visualization */}
        <section className="flex-1 p-4 overflow-hidden">
          <VisualizationCanvas />
        </section>

        {/* Right: Educational Mode */}
        <aside className="w-1/3 p-4 bg-gray-50 border-l overflow-y-auto">
          <EducationPanel />
        </aside>
      </main>

      {/* Footer */}
      <footer className="p-2 text-center text-sm text-gray-500">
        © 2025 DS & ML Viz
      </footer>
    </div>
  );
}