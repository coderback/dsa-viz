'use client';
import React, { useState } from 'react';
import { useViz } from '../context/VizContext';
import { moduleCategories } from '../modules/modulesConfig';

export default function ModuleSelector() {
  const { selectModule, currentModule } = useViz();
  const [catIdx, setCatIdx] = useState(0);
  const [subIdx, setSubIdx] = useState(0);

  const categories = moduleCategories;
  const subcats = categories[catIdx].subcategories;
  const mods = subcats[subIdx].modules;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">Category</label>
      <select
        value={catIdx}
        onChange={(e) => { setCatIdx(Number(e.target.value)); setSubIdx(0); }}
        className="w-full border rounded p-1"
      >
        {categories.map((c, i) => (
          <option key={i} value={i}>{c.title}</option>
        ))}
      </select>

      <label className="block text-sm font-medium">Subcategory</label>
      <select
        value={subIdx}
        onChange={(e) => setSubIdx(Number(e.target.value))}
        className="w-full border rounded p-1"
      >
        {subcats.map((s, i) => (
          <option key={i} value={i}>{s.title}</option>
        ))}
      </select>

      <label className="block text-sm font-medium">Module</label>
      <select
        value={mods.findIndex(m => m.name === currentModule.name)}
        onChange={(e) => selectModule(mods[Number(e.target.value)])}
        className="w-full border rounded p-1"
      >
        {mods.map((m, i) => (
          <option key={i} value={i}>{m.name}</option>
        ))}
      </select>
    </div>
  );
}