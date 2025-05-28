import type { AlgorithmModule, VizParams, Frame, Highlight } from '../types/types';
import * as d3 from 'd3';

let hsFrames: Frame[] = [];

function heapify(arr: number[], n: number, i: number) {
  let largest = i;
  const l = 2*i + 1, r = 2*i + 2;
  if (l < n && arr[l] > arr[largest]) largest = l;
  if (r < n && arr[r] > arr[largest]) largest = r;
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    hsFrames.push({ state: { arr: [...arr] }, highlights: [
      { type: 'array-cell', id: String(i) },
      { type: 'array-cell', id: String(largest) }
    ]});
    heapify(arr, n, largest);
  }
}

export const HeapSort: AlgorithmModule = {
  name: 'Heap Sort',
  defaultParams: { arraySize: 20 },
  sourceCode: `function heapSort(arr) {
  const n = arr.length;
  for (let i = Math.floor(n/2)-1; i >=0; i--) heapify(arr,n,i);
  for (let i = n-1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  return arr;
}`,
  explanation: [
    'Build a max-heap out of the array.',
    'Repeatedly swap root with last element and reduce heap size.',
    'Re-heapify the reduced heap.'
  ],

  init(params: VizParams) {
    hsFrames = [];
    const size = params.arraySize as number;
    const arr  = Array.from({ length: size }, () => Math.floor(Math.random()*100));
    const tmp  = arr.slice();
    const n = tmp.length;
    for (let i = Math.floor(n/2)-1; i >= 0; i--) heapify(tmp, n, i);
    for (let i = n-1; i > 0; i--) {
      [tmp[0], tmp[i]] = [tmp[i], tmp[0]];
      hsFrames.push({ state: { arr: [...tmp] }, highlights: [
        { type: 'array-cell', id: '0' },
        { type: 'array-cell', id: String(i) }
      ]});
      heapify(tmp, i, 0);
    }
    return { arr, frameIdx: 0 };
  },

  step(state: any): Frame | null {
    if (state.frameIdx >= hsFrames.length) return null;
    return hsFrames[state.frameIdx++];
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