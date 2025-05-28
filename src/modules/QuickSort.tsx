import type { AlgorithmModule, VizParams, Frame, Highlight } from '../types/types';
import * as d3 from 'd3';

let qsFrames: Frame[] = [];

function partition(arr: number[], low: number, high: number): number {
  const pivot = arr[high];
  let i = low;
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      qsFrames.push({ state: { arr: [...arr] }, highlights: [
        { type: 'array-cell', id: String(i) },
        { type: 'array-cell', id: String(j) }
      ]});
      i++;
    }
  }
  [arr[i], arr[high]] = [arr[high], arr[i]];
  qsFrames.push({ state: { arr: [...arr] }, highlights: [
    { type: 'array-cell', id: String(i) },
    { type: 'array-cell', id: String(high) }
  ]});
  return i;
}

function quickRec(arr: number[], low: number, high: number) {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickRec(arr, low, pi - 1);
    quickRec(arr, pi + 1, high);
  }
}

export const QuickSort: AlgorithmModule = {
  name: 'Quick Sort',
  defaultParams: { arraySize: 20 },
  sourceCode: `function quickSort(arr, low=0, high=arr.length-1) {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi-1);
    quickSort(arr, pi+1, high);
  }
  return arr;
}`,
  explanation: [
    'Choose last element as pivot.',
    'Partition array around pivot.',
    'Recursively sort subarrays.'
  ],

  init(params: VizParams) {
    qsFrames = [];
    const size = params.arraySize as number;
    const arr  = Array.from({ length: size }, () => Math.floor(Math.random()*100));
    quickRec(arr.slice(), 0, arr.length-1);
    return { arr, frameIdx: 0 };
  },

  step(state: any): Frame | null {
    if (state.frameIdx >= qsFrames.length) return null;
    return qsFrames[state.frameIdx++];
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