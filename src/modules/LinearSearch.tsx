import type { AlgorithmModule, VizParams, Frame, Highlight } from '../types/types';
import * as d3 from 'd3';

export const LinearSearch: AlgorithmModule = {
  name: 'Linear Search',
  defaultParams: { arraySize: 20, target: 10 },
  sourceCode: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}`,
  explanation: [
    'Iterate over each element in the array.',
    'If current element equals target, return its index.',
    'If end is reached without finding, return -1.'
  ],

  init(params: VizParams) {
    const size = params.arraySize as number;
    const arr  = Array.from({ length: size }, (_, i) => i + 1);
    return { arr, index: 0, target: params.target as number, found: false };
  },

  step(state: any): Frame | null {
    if (state.index >= state.arr.length || state.found) return null;
    const highlights: Highlight[] = [{ type: 'array-cell', id: String(state.index) }];
    if (state.arr[state.index] === state.target) {
      state.found = true;
    } else {
      state.index++;
    }
    return { state: { ...state }, highlights };
  },

  render(frame: Frame, svgContainer: any) {
  // 1) Cast to a D3 selection (loose‐typed):
  const svg: any = svgContainer.select
    ? svgContainer
    : d3.select(svgContainer);

  // 2) Dimensions & data
  const width  = +svg.attr('width');
  const height = +svg.attr('height');
  const arr    = frame.state.arr as number[];
  const cellW  = width / arr.length;
  const cellH  = 40;
  const y      = height / 2 - cellH / 2;

  // 3) Bind & draw uniform boxes
  const cells: any = svg.selectAll('rect').data(arr);
  cells.enter().append('rect')
    .merge(cells)
    .attr('x', (_d: number, i: number) => i * cellW)
    .attr('y', y)
    .attr('width',  cellW - 2)
    .attr('height', cellH)
    .attr('fill', (_d: number, i: number) =>
      frame.highlights?.some(h => h.id === String(i)) ? 'orange' : '#ddd'
    );

  // 4) Draw the numbers inside
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
  }
};
