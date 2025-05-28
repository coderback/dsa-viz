'use client';
import React from 'react';
import dynamic from 'next/dynamic';
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
      <div className="min-h-screen flex flex-col">
        <header className="p-4 bg-indigo-600 text-white text-2xl font-semibold">
          DS & ML Visualization Tool
        </header>
        <main className="flex flex-1 overflow-hidden">
          <aside className="w-1/4 p-4 bg-gray-100 overflow-y-auto">
            <ControlPanel />
          </aside>
          <section className="flex-1 p-4 overflow-hidden">
            <VisualizationCanvas />
          </section>
          <aside className="w-1/3 p-4 bg-gray-50 border-l overflow-y-auto">
            <EducationPanel />
          </aside>
        </main>
        <footer className="p-2 text-center text-sm text-gray-500">
          © 2025 DS & ML Viz
        </footer>
      </div>
    </VizProvider>
  );
}
