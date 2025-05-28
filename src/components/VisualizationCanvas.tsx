'use client';
import React, { useRef, useEffect } from 'react';
import { useViz } from '@/context/VizContext';
import * as d3 from 'd3';

export default function VisualizationCanvas() {
  const svgRef = useRef<SVGSVGElement>(null);
  const { currentModule, currentFrame, params } = useViz();

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    // Clear previous drawing
    svg.selectAll('*').remove();
    // Set dimensions
    svg.attr('width', svgRef.current.clientWidth)
       .attr('height', svgRef.current.clientHeight);
    // Invoke module's render method with current frame
    currentModule.render(currentFrame, svg);
  }, [currentFrame, currentModule, params]);

  return (
    <svg ref={svgRef} className="w-full h-full bg-white border rounded"></svg>
  );
}