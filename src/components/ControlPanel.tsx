'use client';
import React from 'react';
import { useViz } from '../context/VizContext';

export default function ControlPanel() {
  const { currentModule, params, updateParam, play, pause, step, reset, isPlaying } = useViz();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Controls</h2>
      <div className="space-y-4">
        {Object.entries(currentModule.defaultParams).map(([key]) => (
          <div key={key}>
            <label className="block text-sm font-medium">
              {key}: {String(params[key])}
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={params[key] as number}
              onChange={(e) => updateParam(key, Number(e.target.value))}
              className="w-full"
            />
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <button
          onClick={isPlaying ? pause : play}
          className="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow"
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button
          onClick={step}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg shadow"
        >
          Step
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 bg-red-500 text-white rounded-lg shadow"
        >
          Reset
        </button>
      </div>
    </div>
  );
}