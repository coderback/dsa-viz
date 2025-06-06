import type { AlgorithmModule, VizParams, Frame } from '@/types/types';
import * as d3 from 'd3';

export const ArrayModule: AlgorithmModule = {
  name: 'Array (View Only)',
  defaultParams: { arraySize: 10 },
  sourceCode: `const arr = [1, 2, 3, 4, 5];`,
  explanation: ['This module simply displays an array with no algorithm steps.'],

  init(params: VizParams) {
    const size = params.arraySize as number;
    const arr = Array.from({ length: size }, (_, i) => i + 1);
    return { arr };
  },

  step(_state: any): Frame | null {
    // No algorithm steps; static only
    return null;
  },

  render(frame: Frame, svgContainer: any) {
    const svg: any = svgContainer.select ? svgContainer : d3.select(svgContainer);

    const width = +svg.attr('width');
    const height = +svg.attr('height');
    const arr = frame.state.arr as number[];
    const cellW = width / arr.length;
    const cellH = 40;
    const y = height / 2 - cellH / 2;

    const cells: any = svg.selectAll('rect').data(arr);
    cells.enter().append('rect')
      .merge(cells)
      .attr('x', (_d: number, i: number) => i * cellW)
      .attr('y', y)
      .attr('width', cellW - 2)
      .attr('height', cellH)
      .attr('fill', '#ddd');

    const labels: any = svg.selectAll('text').data(arr);
    labels.enter().append('text')
      .merge(labels)
      .attr('x', (_d: number, i: number) => i * cellW + cellW / 2)
      .attr('y', height / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle')
      .text((d: number) => String(d))
      .attr('fill', 'black');
  },

  reset(params: VizParams) {
    return this.init(params);
  },
};
