import type { AlgorithmModule, VizParams, Frame, Highlight } from '../types/types';
import * as d3 from 'd3';

export const InsertionSort: AlgorithmModule = {
  name: 'Insertion Sort',
  defaultParams: { arraySize: 20 },
  sourceCode: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i], j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j+1] = arr[j];
      j--;
    }
    arr[j+1] = key;
  }
  return arr;
}`,
  explanation: [
    'Start from index 1 to end.',
    '“Insert” each element into sorted subarray on the left.'
  ],

  init(params: VizParams) {
    const size = params.arraySize as number;
    const arr  = Array.from({ length: size }, () => Math.floor(Math.random() * 100));
    return { arr, i: 1, j: 1, key: null };
  },

  step(state: any): Frame | null {
    if (state.i >= state.arr.length) return null;

    let highlights: Highlight[] = [];
    if (state.key === null) {
      state.key = state.arr[state.i];
      state.j   = state.i - 1;
    }

    if (state.j >= 0 && state.arr[state.j] > state.key) {
      state.arr[state.j+1] = state.arr[state.j];
      highlights = [
        { type: 'array-cell', id: String(state.j) },
        { type: 'array-cell', id: String(state.j+1) }
      ];
      state.j--;
    } else {
      state.arr[state.j+1] = state.key;
      state.i++;
      state.key = null;
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
