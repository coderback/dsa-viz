import { AlgorithmModule, VizParams, Frame, Highlight } from '@/types/types';
import * as d3 from 'd3';

export const DefaultModule: AlgorithmModule = {
  name: 'Binary Search',
  defaultParams: {
    arraySize: 20,
    target: 10
  },
  sourceCode: `function binarySearch(arr, target) {
  let low = 0, high = arr.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`,
  explanation: [
    'Initialize low = 0 and high = arr.length - 1.',
    'Compute mid = floor((low + high) / 2).',
    'Compare arr[mid] with target:',
    '- If equal, return mid.',
    '- If arr[mid] < target, set low = mid + 1.',
    '- Otherwise, set high = mid - 1.',
    'Repeat until low > high.'
  ],

  init(params: VizParams) {
    const size = params.arraySize as number;
    const arr = Array.from({ length: size }, (_, i) => i + 1);
    const target = params.target as number;
    return { arr, low: 0, high: size - 1, target, found: false, index: -1 };
  },

  step(state: any): Frame | null {
    if (state.low > state.high || state.found) return null;
    const mid = Math.floor((state.low + state.high) / 2);
    const highlights: Highlight[] = [
      { type: 'array-cell', id: String(mid), cssClass: 'highlight' }
    ];
    if (state.arr[mid] === state.target) {
      state.found = true;
      state.index = mid;
    } else if (state.arr[mid] < state.target) {
      state.low = mid + 1;
    } else {
      state.high = mid - 1;
    }
    return { state: { ...state }, highlights };
  },

  render(frame: Frame, svgContainer: any) {
    const svg = (svgContainer.select
      ? svgContainer
      : d3.select<SVGSVGElement, unknown>(svgContainer)) as d3.Selection<SVGSVGElement, unknown, null, undefined>;

    const width = svg.attr('width') ? +svg.attr('width') : svg.node()?.clientWidth || 0;
    const height = svg.attr('height') ? +svg.attr('height') : svg.node()?.clientHeight || 0;
    const arr = frame.state.arr as number[];
    const cellWidth = width / arr.length;

    // Draw cells
    const cells = svg.selectAll<SVGRectElement, number>('rect').data<number>(arr);
    cells
      .enter()
      .append('rect')
      .merge(cells)
      .attr('x', (_d: number, i: number) => i * cellWidth)
      .attr('y', height / 2 - 20)
      .attr('width', cellWidth - 2)
      .attr('height', 40)
      .attr('fill', (_d: number, i: number) => {
        return frame.highlights?.some(h => h.id === String(i)) ? 'orange' : '#ddd';
      });

    // Draw labels
    const labels = svg.selectAll<SVGTextElement, number>('text').data<number>(arr);
    labels
      .enter()
      .append('text')
      .merge(labels)
      .attr('x', (_d: number, i: number) => i * cellWidth + cellWidth / 2)
      .attr('y', height / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle')
      .text((d: number) => String(d));
  },

  reset(params: VizParams) {
    return this.init(params);
  }
};
