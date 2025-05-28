import type { AlgorithmModule, VizParams, Frame, Highlight } from '../types/types';
import * as d3 from 'd3';

export const SelectionSort: AlgorithmModule = {
  name: 'Selection Sort',
  defaultParams: { arraySize: 20 },
  sourceCode: `function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let minIdx = i;
    for (let j = i+1; j < arr.length; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
  return arr;
}`,
  explanation: [
    'Find the smallest element in the unsorted region.',
    'Swap it with the first unsorted position.',
    'Repeat shrinking the unsorted region.'
  ],

  init(params: VizParams) {
    const size = params.arraySize as number;
    const arr  = Array.from({ length: size }, () => Math.floor(Math.random() * 100));
    return { arr, i: 0, j: 1, minIdx: 0 };
  },

  step(state: any): Frame | null {
    const n = state.arr.length;
    if (state.i >= n) return null;

    const highlights: Highlight[] = [
      { type: 'array-cell', id: String(state.i) },
      { type: 'array-cell', id: String(state.j) }
    ];

    if (state.arr[state.j] < state.arr[state.minIdx]) {
      state.minIdx = state.j;
    }

    state.j++;
    if (state.j >= n) {
      [state.arr[state.i], state.arr[state.minIdx]] =
        [state.arr[state.minIdx], state.arr[state.i]];
      state.i++;
      state.minIdx = state.i;
      state.j = state.i + 1;
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
