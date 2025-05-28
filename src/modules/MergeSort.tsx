import type { AlgorithmModule, VizParams, Frame, Highlight } from '../types/types';
import * as d3 from 'd3';

let msFrames: Frame[] = [];

function captureMerge(arr: number[], l: number, m: number, r: number) {
  const left = arr.slice(l, m + 1);
  const right = arr.slice(m + 1, r + 1);
  let i = 0, j = 0, k = l;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      arr[k] = left[i++];
    } else {
      arr[k] = right[j++];
    }
    // record snapshot
    msFrames.push({
      state: { arr: [...arr] },
      highlights: [{ type: 'array-cell', id: String(k) }]
    });
    k++;
  }
  while (i < left.length) {
    arr[k++] = left[i++];
    msFrames.push({
      state: { arr: [...arr] },
      highlights: [{ type: 'array-cell', id: String(k - 1) }]
    });
  }
  while (j < right.length) {
    arr[k++] = right[j++];
    msFrames.push({
      state: { arr: [...arr] },
      highlights: [{ type: 'array-cell', id: String(k - 1) }]
    });
  }
}

function mergeSortRec(arr: number[], l: number, r: number) {
  if (l >= r) return;
  const m = Math.floor((l + r) / 2);
  mergeSortRec(arr, l, m);
  mergeSortRec(arr, m + 1, r);
  captureMerge(arr, l, m, r);
}

export const MergeSort: AlgorithmModule = {
  name: 'Merge Sort',
  defaultParams: { arraySize: 20 },
  sourceCode: `function mergeSort(arr) {
  if (arr.length < 2) return arr;
  const m = Math.floor(arr.length / 2);
  return merge(mergeSort(arr.slice(0, m)), mergeSort(arr.slice(m)));
}

function merge(left, right) {
  let res = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) res.push(left.shift());
    else res.push(right.shift());
  }
  return res.concat(left).concat(right);
}`,
  explanation: [
    'Divide the array recursively until size = 1.',
    'Merge pairs by choosing the smaller head element.',
    'Repeat merging up to the full array.'
  ],

  init(params: VizParams) {
    msFrames = [];
    const size = params.arraySize as number;
    const arr  = Array.from({ length: size }, () => Math.floor(Math.random() * 100));
    mergeSortRec(arr.slice(), 0, arr.length - 1);
    return { arr, frameIdx: 0 };
  },

  step(state: any): Frame | null {
    if (state.frameIdx >= msFrames.length) return null;
    return {
      state: { arr: msFrames[state.frameIdx].state.arr },
      highlights: msFrames[state.frameIdx++].highlights
    };
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
